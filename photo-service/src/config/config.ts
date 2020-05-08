const config = {
  port: process.env.PORT,
  bucket: {
    name: process.env.BUCKET_NAME,
    endPoint: process.env.BUCKET_ENDPOINT,
    port: process.env.BUCKET_PORT,
    accessKey: process.env.BUCKET_KEY,
    secretKey: process.env.BUCKET_KEY,
  },
  gateway: {
    host: process.env.GATEWAY_HOST,
    port: process.env.GATEWAY_PORT,
    security: process.env.GATEWAY_SECURITY
  },
  rmq: {
    host: process.env.RMQ_HOST,
    port: process.env.RMQ_PORT
  },
  docsEnabled: process.env.DOCS_ENABLED || true,
  docsEndpoint: process.env.DOCS_ENDPOINT
};

export default config;