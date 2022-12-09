import styles from "styles/shared/components/contentPanel.module.css";
import React from "react";

export default function ContentPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>{children}</div>
    </div>
  );
}
