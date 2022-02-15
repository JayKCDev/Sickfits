import "dotenv/config";
import { Role } from "./schemas/Role";
import { User } from "./schemas/User";
import { Cart } from "./schemas/Cart";
import { Order } from "./schemas/Order";
import { Product } from "./schemas/Product";
import { OrderItem } from "./schemas/OrderItem";
import { createAuth } from "@keystone-next/auth";
import { permissionsList } from "./schemas/fields";
import { ProductImage } from "./schemas/ProductImage";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import { insertSeedData } from "./seed-data";
import extendGraphqlSchema from "./mutations/index";
import { sendPasswordResetEmail } from "./lib/mailConfig";
import { config, createSchema } from "@keystone-next/keystone/schema";

const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost/sudo-shopper-keystone";

const sessionConfiguration = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },

    db: {
      adapter: "mongoose",
      url: DATABASE_URL,
      async onConnect(ks) {
        console.log("Connected to the database!");
        if (process.argv.includes("--seed-data")) await insertSeedData(ks);
      },
    },

    lists: createSchema({
      User,
      Role,
      Cart,
      Order,
      Product,
      OrderItem,
      ProductImage,
    }),

    extendGraphqlSchema: extendGraphqlSchema,

    ui: {
      isAccessAllowed: ({ session }) => {
        return !!session?.data;
      },
    },

    session: withItemData(statelessSessions(sessionConfiguration), {
      User: `id name email role{${permissionsList.join(" ")}}`,
    }),
  })
);
