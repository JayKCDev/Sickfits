import { ListAccessArgs } from "./types";
import { permissionsList } from "./schemas/fields";

//This function will always have access to the current context and from that context we would destructure the "session" to validate if user is currently signed in or not
export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data?.role?.[permission];
    },
  ])
);

//Permission checks if a "User" meets a certain criteria, returns yes-or-no
export const permissions = {
  ...generatedPermissions,
};

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { user: { id: session.itemId } };
  },

  //canReadProducts will return a sub-set of "AVAILABLE" products only if not requested from an Admin role user otherwise.
  canReadProducts({ session }: ListAccessArgs) {
    // if (!isSignedIn({ session })) {
    //   return false;
    // }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { productStatus: "AVAILABLE" };
  },

  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { user: { id: session.itemId } };
  },

  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { order: { user: { id: session.itemId } } };
  },

  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    return { id: session.itemId };
  },
};
