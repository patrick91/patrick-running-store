interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  start_date: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchActivities(
  accessToken: string,
  days: number = 7,
): Promise<StravaActivity[]> {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const before = Math.floor(now.getTime() / 1000); // Current time in seconds
  const after = Math.floor(oneWeekAgo.getTime() / 1000); // One week ago in seconds

  const url = `https://www.strava.com/api/v3/athlete/activities?before=${before}&after=${after}&per_page=200`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new ApiError(text, response.status);
    }

    const activities: StravaActivity[] = await response.json();
    return activities;
  } catch (error) {
    console.error("Error fetching Strava activities:", error);
    throw error;
  }
}

export async function refreshToken(refreshToken: string): Promise<string> {
  const url = "https://www.strava.com/api/v3/oauth/token";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.AUTH_STRAVA_ID,
      client_secret: process.env.AUTH_STRAVA_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(text, response.status);
  }

  const data = await response.json();

  return data;
}
