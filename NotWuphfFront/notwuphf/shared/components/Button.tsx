import styles from "styles/shared/components/Button.module.css";
import { ReactElement, ReactFragment } from "react";

export default function Button({
  children,
  onClick,
}: {
  children?: ReactElement | string;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
