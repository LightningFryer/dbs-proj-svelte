import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import {PUBLIC_GOOGLE_CLIENT_ID, PUBLIC_GOOGLE_CLIENT_SECRET} from "$env/static/public"

export const auth = betterAuth({
  database: createPool({
    host: "localhost",
    user: "root",
    password: "opensesame",
    database: "test",
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: PUBLIC_GOOGLE_CLIENT_SECRET as string,
    },
  },
});
