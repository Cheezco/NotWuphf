import styles from "styles/shared/components/mainLayout/nav/navUser.module.css";
import { Icon } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import WuphfUser from "../../../types/WuphfUser";

export default function NavUser() {
  const { data: session } = useSession();

  return (
    <div className={styles.navUserOuter}>
      <div className={styles.navUser}>
        {session && session.user && (
          <div>{(session?.user as WuphfUser).username}</div>
        )}
      </div>
      <button className={styles.navLogout} onClick={() => signOut()}>
        <Icon fontSize="22px" as={FiLogOut} />
      </button>
    </div>
  );
}
