import { NextRouter } from "next/router";
import { NavItemCategory } from "../../../types/mainLayout/navTypes";
import NavItem from "./navItem";

export default function SingleCategoryNav({
  navItemCategories,
  router,
  onClickWrapper,
}: {
  navItemCategories: NavItemCategory[];
  router: NextRouter;
  onClickWrapper: (categoryIndex: number, itemIndex: number) => void;
}) {
  return (
    <>
      {navItemCategories[0].items.map((x, index) => {
        return (
          <NavItem
            key={index}
            text={x.text}
            icon={x.icon}
            active={isActive(router, x.href)}
            onClick={onClickWrapper}
            index={index}
            categoryIndex={0}
          />
        );
      })}
    </>
  );
}

function isActive(router: NextRouter, href: string): boolean {
  return router.pathname.indexOf(href) !== -1;
}
