import { IconType } from "react-icons";

export interface NavItemData {
  text: string;
  href: string;
  icon?: IconType;
}

export interface NavItemCategory {
  name: string;
  text: string;
  items: NavItemData[];
}
