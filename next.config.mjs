/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/cdn.fourthwall.com/**",
      },
    ],
  },
};

export default nextConfig;
