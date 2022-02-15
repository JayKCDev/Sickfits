import "dotenv/config";
import { isSignedIn, permissions } from "../access";
import { list } from "@keystone-next/keystone/schema";
import { relationship, text } from "@keystone-next/fields";
import { cloudinaryImage } from "@keystone-next/cloudinary";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
};

export const ProductImage = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: permissions.canManageProducts,
    delete: permissions.canManageProducts,
  },
  fields: {
    productImage: cloudinaryImage({
      cloudinary,
      label: "Source",
    }),

    altText: text(),

    product: relationship({ ref: "Product.productPhoto" }),
  },
  ui: {
    listView: {
      initialColumns: ["product", "productImage", "altText"],
    },
  },
});
