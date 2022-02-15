import { list } from "@keystone-next/keystone/schema";
import { text, integer, select, relationship } from "@keystone-next/fields";
import { isSignedIn, rules } from "../access";

export const Order = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: () => false,
    delete: () => false,
  },
  fields: {
    total: integer(),
    charge: text(),
    products: relationship({ ref: "OrderItem.order", many: true }),
    user: relationship({ ref: "User.orders" }),
  },
  ui: {
    listView: {
      initialColumns: ["total", "products", "user"],
    },
  },
});
