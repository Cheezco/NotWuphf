import React from "react";
import styles from "styles/shared/components/mainPanel.module.css";

export default function MainPanel({ children }: { children: React.ReactNode }) {
  return <div className={styles.panel}>{children}</div>;
}
