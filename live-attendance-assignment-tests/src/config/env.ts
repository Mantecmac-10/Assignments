const _config = {
  mongo_url: process.env.MONGO_URL!,
  jwt_secret: process.env.JWT_KEY!,
};

export const config = Object.freeze(_config);
