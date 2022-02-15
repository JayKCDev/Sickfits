import { isSignedIn, rules } from "../access";
import { list } from "@keystone-next/keystone/schema";
import { text, integer, select, relationship } from "@keystone-next/fields";

export const Cart = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: rules.canOrder,
    delete: rules.canOrder,
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ ref: "Product" }),
    user: relationship({ ref: "User.cart" }),
  },
  ui: {
    listView: {
      initialColumns: ["quantity", "product", "user"],
    },
  },
});
