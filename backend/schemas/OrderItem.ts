import { isSignedIn, rules } from "../access";
import { list } from "@keystone-next/keystone/schema";
import { text, integer, select, relationship } from "@keystone-next/fields";

export const OrderItem = list({
  access: {
    create: isSignedIn,
    read: rules.canManageOrderItems,
    update: () => false,
    delete: () => false,
  },
  fields: {
    productName: text({ isRequired: true }),
    productDescription: text({
      isRequired: true,
      ui: { displayMode: "textarea" },
    }),
    productPhoto: relationship({
      ref: "ProductImage",
      ui: {
        displayMode: "cards",
        cardFields: ["productImage", "altText"],
        inlineCreate: { fields: ["productImage", "altText"] },
        inlineEdit: { fields: ["productImage", "altText"] },
      },
    }),
    productPrice: integer(),
    quantity: integer(),
    order: relationship({ ref: "Order.products" }),
  },
  ui: {
    listView: {
      initialColumns: [
        "productName",
        "productPhoto",
        "productPrice",
        "quantity",
        "order",
      ],
    },
  },
});
