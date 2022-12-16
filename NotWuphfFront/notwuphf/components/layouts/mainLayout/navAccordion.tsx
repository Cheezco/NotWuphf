import styles from "styles/shared/components/mainLayout/nav/navAccordion.module.css";
import {
  Accordion,
  ExpandedIndex,
  AccordionItem,
  AccordionButton,
  Icon,
  AccordionPanel,
} from "@chakra-ui/react";
import { NextRouter } from "next/router";
import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { NavItemCategory } from "../../../types/mainLayout/navTypes";
import NavItem from "./navItem";

export default function NavAccordion({
  navItemCategories,
  router,
  onClickWrapper,
}: {
  navItemCategories: NavItemCategory[];
  router: NextRouter;
  onClickWrapper: (categoryIndex: number, itemIndex: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Accordion
      onChange={(expandedIndex: ExpandedIndex) => {
        setCurrentIndex(+expandedIndex.valueOf());
      }}
      defaultIndex={0}
      className={styles.navItemAccordion}
    >
      {navItemCategories.map((category, categoryIndex) => {
        return (
          <AccordionItem
            key={categoryIndex}
            className={styles.navItemAccordionItem}
          >
            <AccordionButton>
              <div className={styles.navItemAccordionButton}>
                <div>{category.text}</div>
                <Icon
                  as={
                    currentIndex === categoryIndex ? FiChevronUp : FiChevronDown
                  }
                  fontSize="xl"
                />
              </div>
            </AccordionButton>
            <AccordionPanel>
              {category.items.map((navItem, navItemIndex) => {
                return (
                  <NavItem
                    key={navItemIndex}
                    text={navItem.text}
                    icon={navItem.icon}
                    active={isActive(router, navItem.href)}
                    onClick={onClickWrapper}
                    index={navItemIndex}
                    categoryIndex={categoryIndex}
                  />
                );
              })}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function isActive(router: NextRouter, href: string): boolean {
  return router.pathname.indexOf(href) !== -1;
}
