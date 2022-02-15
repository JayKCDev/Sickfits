import { checkbox } from "@keystone-next/fields";

//Will display a list of individual checkboxes under "Role" schema to set appropriate permissions for each role.
export const permissionFields = {
  canManageProducts: checkbox({
    defaultValue: false,
    label: "User can Update and delete any product",
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: "User can query other users",
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: "User can Edit other users",
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: "User can CRUD roles",
  }),
  canManageCart: checkbox({
    defaultValue: false,
    label: "User can see and manage cart and cart items",
  }),
  canManageOrders: checkbox({
    defaultValue: false,
    label: "User can see and manage orders",
  }),
};

//Generating custom type.
export type Permission = keyof typeof permissionFields;

//Below is an array of type of "Permission" we created in the above line of code and it simply returns the key of each permission into an array.
export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
