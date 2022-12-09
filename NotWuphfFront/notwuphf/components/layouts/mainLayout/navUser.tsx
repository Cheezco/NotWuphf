import styles from "styles/shared/components/mainLayout/nav/navUser.module.css";
import { Icon } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

export default function NavUser() {
  return (
    <div className={styles.navUserOuter}>
      <div className={styles.navUser}>
        <text>Username</text>
      </div>
      <button className={styles.navLogout}>
        <Icon fontSize="22px" as={FiLogOut} />
      </button>
    </div>
  );
}
