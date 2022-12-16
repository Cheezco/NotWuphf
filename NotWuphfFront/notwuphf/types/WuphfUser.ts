import { User } from "next-auth/core/types";

export default interface WuphfUser extends User {
  token: string;
  role: string[];
  username: string;
}
