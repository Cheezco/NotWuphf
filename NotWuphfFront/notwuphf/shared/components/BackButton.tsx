import styles from "styles/shared/components/BackButton.module.css";
import { FiChevronLeft } from "react-icons/fi";
import { Icon } from "@chakra-ui/react";

export default function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className={styles.button}>
      <Icon w={7} h={7} as={FiChevronLeft} />
    </button>
  );
}
