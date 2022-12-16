import WuphfUser from "../types/WuphfUser";

function isAdmin(user: WuphfUser) {
  if (typeof user === "undefined") return false;

  if (typeof user.role === "string") {
    return user.role === "Admin";
  }
  return user.role.filter((x) => x === "Admin").length !== 0;
}

export { isAdmin };
