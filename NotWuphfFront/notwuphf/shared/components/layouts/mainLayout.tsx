import styles from "styles/shared/components/mainLayout/mainLayout.module.css";
import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import Nav from "../../../components/layouts/mainLayout/nav";
import { NavItemData } from "../../../types/mainLayout/navTypes";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const onNavItemClick = (index: number, navItems: NavItemData[]) => {
    if (navItems.length <= index || index < 0) return;

    router.push(navItems[index].href);
  };
  let categoriesToDisplay = ["user"];

  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateColumns={"260px 1fr"}
      h="100vh"
      w="100%"
      className={styles.backgroundImage}
    >
      <GridItem area="nav">
        <Nav
          categoriesToDisplay={categoriesToDisplay}
          router={router}
          onNavItemClick={onNavItemClick}
        />
      </GridItem>
      <GridItem area="main" className={styles.main}>
        {children}
      </GridItem>
    </Grid>
  );
}
