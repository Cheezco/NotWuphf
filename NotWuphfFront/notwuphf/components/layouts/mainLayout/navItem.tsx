import styles from "styles/shared/components/mainLayout/nav/navItem.module.css";
import { Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

export default function NavItem({
  text,
  icon,
  active,
  onClick,
  index,
  categoryIndex,
}: {
  text: string;
  icon?: IconType;
  active?: boolean;
  onClick: (categoryIndex: number, itemIndex: number) => void;
  index: number;
  categoryIndex: number;
}) {
  return (
    <div className={styles.navItemOuter}>
      <button
        onClick={() => onClick(categoryIndex, index)}
        className={active ? styles.navItemActive : styles.navItemInactive}
      >
        {icon && <Icon as={icon} />}
        <p>{text}</p>
      </button>
    </div>
  );
}
