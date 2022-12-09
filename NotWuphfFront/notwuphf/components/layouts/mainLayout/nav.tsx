import styles from "styles/shared/components/mainLayout/nav/nav.module.css";
import React from "react";
import { FiHome, FiTrello, FiBookOpen } from "react-icons/fi";
import { NextRouter } from "next/router";
import {
  NavItemCategory,
  NavItemData,
} from "../../../types/mainLayout/navTypes";
import { RiGroupLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {
  NavUser,
  NavTitle,
  NavAccordion,
  SingleCategoryNav,
} from "./navExport";

export default function Nav({
  router,
  onNavItemClick,
  categoriesToDisplay,
}: {
  router: NextRouter;
  onNavItemClick: (index: number, navItems: NavItemData[]) => void;
  categoriesToDisplay?: string[];
}) {
  let categories = getNavItemCategories(categoriesToDisplay);
  const onClickWrapper = (categoryIndex: number, itemIndex: number) => {
    onNavItemClick(itemIndex, categories[categoryIndex].items);
  };
  return (
    <div className={styles.nav}>
      <div className={styles.navItemContainer}>
        <NavTitle />
        <br />
        {categories.length > 1 ? (
          <NavAccordion
            navItemCategories={categories}
            router={router}
            onClickWrapper={onClickWrapper}
          />
        ) : (
          <SingleCategoryNav
            navItemCategories={categories}
            router={router}
            onClickWrapper={onClickWrapper}
          />
        )}
      </div>
      <NavUser />
    </div>
  );
}

function getNavItemCategories(
  categoriesToInclude?: string[]
): NavItemCategory[] {
  const authPrefix = "/auth/";
  const adminPrefix = authPrefix + "admin/";

  let allCategories = [
    {
      name: "user",
      text: "Vartotojo puslapiai",
      items: [
        {
          text: "Groups",
          href: authPrefix + "groups",
          icon: AiOutlineUsergroupAdd,
        },
        {
          text: "My Groups",
          href: authPrefix + "my-groups",
          icon: RiGroupLine,
        },
      ],
    },
    {
      name: "admin",
      text: "Administratoriaus puslapiai",
      items: [
        {
          text: "Vartotojai",
          category: "admin",
          categoryText: "Administratoriaus puslapiai",
          href: adminPrefix + "users",
          icon: FiHome,
        },
        {
          text: "Statistika",
          category: "admin",
          categoryText: "Administratoriaus puslapiai",
          href: adminPrefix + "users",
          icon: FiTrello,
        },
        {
          text: "Vartojojų Pranešimai",
          category: "admin",
          categoryText: "Administratoriaus puslapiai",
          href: adminPrefix + "users",
          icon: FiBookOpen,
        },
      ],
    },
  ];

  return allCategories.filter(
    (x) => categoriesToInclude?.indexOf(x.name) !== -1
  );
}
