import styles from "styles/shared/components/mainLayout/mainLayout.module.css";
import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import Nav from "../../../components/layouts/mainLayout/nav";
import { NavItemData } from "../../../types/mainLayout/navTypes";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSession } from "next-auth/react";

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
  const [isMobile] = useMediaQuery("(max-width:786px", {
    ssr: true,
    fallback: false,
  });

  const { data: session } = useSession();

  useEffect(() => {
    if (typeof window === "undefined" || session) return;

    router.push("/");
  }, [session, router]);

  return (
    // <DesktopLayout
    //   router={router}
    //   categoriesToDisplay={categoriesToDisplay}
    //   onNavItemClick={onNavItemClick}
    // >
    //   {children}
    // </DesktopLayout>
    // <MobileLayout
    //   router={router}
    //   categoriesToDisplay={categoriesToDisplay}
    //   onNavItemClick={onNavItemClick}
    // >
    //   {children}
    // </MobileLayout>
    <>
      {!isMobile ? (
        <DesktopLayout
          router={router}
          categoriesToDisplay={categoriesToDisplay}
          onNavItemClick={onNavItemClick}
        >
          {children}
        </DesktopLayout>
      ) : (
        <MobileLayout
          router={router}
          categoriesToDisplay={categoriesToDisplay}
          onNavItemClick={onNavItemClick}
        >
          {children}
        </MobileLayout>
      )}
    </>
  );
}

function DesktopLayout({
  children,
  router,
  categoriesToDisplay,
  onNavItemClick,
}: {
  children: React.ReactNode;
  router: NextRouter;
  categoriesToDisplay: string[];
  onNavItemClick: (index: number, navItems: NavItemData[]) => void;
}) {
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

function MobileLayout({
  children,
  router,
  categoriesToDisplay,
  onNavItemClick,
}: {
  children: React.ReactNode;
  router: NextRouter;
  categoriesToDisplay: string[];
  onNavItemClick: (index: number, navItems: NavItemData[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOverlayClick = () => {
    setIsOpen(false);
    console.log("test");
  };

  const handleButtonClick = () => {
    setIsOpen(true);
    console.log("test");
  };

  return (
    <div>
      {isOpen && (
        <Nav
          categoriesToDisplay={categoriesToDisplay}
          router={router}
          onNavItemClick={onNavItemClick}
          onOverlayClick={handleOverlayClick}
        />
      )}
      <div className={styles.main}>
        {!isOpen && (
          <div className={styles.burgerContainer}>
            <button className={styles.burger} onClick={handleButtonClick}>
              <RxHamburgerMenu />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
