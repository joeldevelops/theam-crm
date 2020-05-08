const config = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    connectionString: ''
  },
  rmq: {
    host: process.env.RMQ_HOST,
    port: process.env.RMQ_PORT
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    ignoreExpiration: process.env.JWT_IG_EXP === "true" ? true : false
  },
  docsEnabled: process.env.DOCS_ENABLED || true,
  docsEndpoint: process.env.DOCS_ENDPOINT
};

config.db.connectionString = `${config.db.host}:${config.db.port}/${config.db.name}`;

export default config;