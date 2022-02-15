import { rules, isSignedIn } from "../access";
import { list } from "@keystone-next/keystone/schema";
import { text, integer, select, relationship } from "@keystone-next/fields";

export const Product = list({
  access: {
    create: isSignedIn,
    read: rules.canReadProducts,
    update: rules.canManageProducts,
    delete: rules.canManageProducts,
  },
  fields: {
    productName: text({ isRequired: true }),
    productDescription: text({
      isRequired: true,
      ui: { displayMode: "textarea" },
    }),
    productPhoto: relationship({
      ref: "ProductImage.product",
      ui: {
        displayMode: "cards",
        cardFields: ["productImage", "altText"],
        inlineCreate: { fields: ["productImage", "altText"] },
        inlineEdit: { fields: ["productImage", "altText"] },
      },
    }),
    productStatus: select({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" },
        { label: "Out of Stock", value: "OUT OF STOCK" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    productPrice: integer(),
    user: relationship({
      ref: "User.products",
      defaultValue: ({ context }) => ({
        connect: {
          id: context.session.itemId,
        },
      }),
    }),
  },
  ui: {
    listView: {
      initialColumns: [
        "productName",
        "productPhoto",
        "productStatus",
        "productPrice",
      ],
    },
  },
});
