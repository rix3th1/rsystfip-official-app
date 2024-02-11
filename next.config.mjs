/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Initial redirect to signin page
      {
        source: "/",
        destination: "/signin",
        permanent: true,
      },
      {
        source: "/ITFIP-Rectory",
        destination: "/ITFIP-Rectory/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
