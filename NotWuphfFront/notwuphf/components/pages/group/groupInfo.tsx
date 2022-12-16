import styles from "styles/pages/group/groupInfo.module.css";
import { GroupData } from "../../../types/data/groupInterfaces";

export default function GroupInfo({ groupData }: { groupData?: GroupData }) {
  return (
    <div className={styles.groupDataContainer}>
      <div className={styles.title}>{groupData?.name}</div>
      <div>{groupData?.description}</div>
    </div>
  );
}
