import { permissions, rules } from "../access";
import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship } from "@keystone-next/fields";

export const User = list({
  access: {
    create: () => true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    delete: permissions.canManageUsers,
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    cart: relationship({
      ref: "Cart.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    orders: relationship({ ref: "Order.user", many: true }),
    role: relationship({
      ref: "Role.assignedTo",
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    products: relationship({
      ref: "Product.user",
      many: true,
    }),
  },
});
