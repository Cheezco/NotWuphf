import styles from "styles/shared/components/Button.module.css";
import { ReactElement, ReactFragment } from "react";

export default function Button({
  children,
  onClick,
  type,
}: {
  children?: ReactElement | string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
