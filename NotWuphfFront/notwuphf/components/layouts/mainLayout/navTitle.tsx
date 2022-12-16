import styles from "styles/shared/components/mainLayout/nav/navTitle.module.css";
import { Center, Heading } from "@chakra-ui/react";

export default function NavTitle() {
  return (
    <Center className={styles.navTitle}>
      <Heading fontSize="21px">NotWuphf</Heading>
    </Center>
  );
}
