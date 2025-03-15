/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Apply CSP to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self'; 
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://trusted-source.com https://www.google.com https://www.gstatic.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: http://82.29.153.135:5000/uploads http://82.29.153.135:5000/uploads/  https://stripe.com https://js.stripe.com;
              font-src 'self' https://fonts.gstatic.com https://js.stripe.com;
             connect-src 'self' http://82.29.153.135:5174/ https://api.stripe.com ws://82.29.153.135:5174;

              frame-src 'self' https://js.stripe.com https://www.google.com https://www.recaptcha.net;
            `.replace(/\n/g, ""), // Remove new lines
          },
        ],
      },
    ];
  },
};

export default nextConfig;
