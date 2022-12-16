import styles from "styles/shared/components/mainLayout/nav/nav.module.css";
import React from "react";
import { NextRouter } from "next/router";
import {
  NavItemCategory,
  NavItemData,
} from "../../../types/mainLayout/navTypes";
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
  onOverlayClick,
}: {
  router: NextRouter;
  onNavItemClick: (index: number, navItems: NavItemData[]) => void;
  categoriesToDisplay?: string[];
  onOverlayClick?: () => void;
}) {
  let categories = getNavItemCategories(categoriesToDisplay);
  const onClickWrapper = (categoryIndex: number, itemIndex: number) => {
    onNavItemClick(itemIndex, categories[categoryIndex].items);
  };
  return (
    <>
      <div className={styles.navOverlay} onClick={onOverlayClick}></div>
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
    </>
  );
}

function getNavItemCategories(
  categoriesToInclude?: string[]
): NavItemCategory[] {
  const authPrefix = "/auth/";

  let allCategories = [
    {
      name: "GroupUser",
      text: "Vartotojo puslapiai",
      items: [
        {
          text: "Groups",
          href: authPrefix + "groups",
          icon: AiOutlineUsergroupAdd,
        },
      ],
    },
    {
      name: "admin",
      text: "Administratoriaus puslapiai",
      items: [],
    },
  ];

  return allCategories.filter(
    (x) => categoriesToInclude?.indexOf(x.name) !== -1
  );
}
