import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export const config = {
  s4: {
    url: process.env.S4_URL,
    username: process.env.S4_USERNAME,
    password: process.env.S4_PASSWORD,
  },
};
