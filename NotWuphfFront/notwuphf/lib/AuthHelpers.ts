import WuphfUser from "../types/WuphfUser";

function isAdmin(user: WuphfUser) {
  if (typeof user === "undefined") return false;

  if (typeof user.role === "string") {
    return user.role === "Admin";
  }
  return user.role.filter((x) => x === "Admin").length !== 0;
}

function getRoles(user: WuphfUser): string[] {
  if (typeof user === "undefined" || typeof user.role === "undefined")
    return [];

  if (typeof user.role === "string") {
    return [user.role];
  }

  return user.role;
}

export { isAdmin };
