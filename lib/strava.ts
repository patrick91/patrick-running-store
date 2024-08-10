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
      console.log(await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const activities: StravaActivity[] = await response.json();
    return activities;
  } catch (error) {
    console.error("Error fetching Strava activities:", error);
    throw error;
  }
}
