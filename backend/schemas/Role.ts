import { permissions } from "../access";
import { permissionFields } from "./fields";
import { list } from "@keystone-next/keystone/schema";
import { text, integer, select, relationship } from "@keystone-next/fields";

export const Role = list({
  access: {
    create: permissions.canManageRoles,
    read: permissions.canManageRoles,
    update: permissions.canManageRoles,
    delete: permissions.canManageRoles,
  },
  ui: {
    isHidden: (args) => !permissions.canManageRoles(args),
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
  },
  fields: {
    name: text({ isRequired: true }),
    ...permissionFields,
    assignedTo: relationship({
      ref: "User.role",
      many: true,
      ui: {
        itemView: { fieldMode: "read" },
      },
    }),
  },
});
