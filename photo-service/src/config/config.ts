const config = {
  port: process.env.PORT,
  bucket: {
    name: process.env.BUCKET_NAME,
    endPoint: process.env.BUCKET_ENDPOINT,
    port: process.env.BUCKET_PORT,
    accessKey: process.env.BUCKET_KEY,
    secretKey: process.env.BUCKET_KEY,
  },
  docsEnabled: process.env.DOCS_ENABLED || true,
  docsEndpoint: process.env.DOCS_ENDPOINT
};

export default config;