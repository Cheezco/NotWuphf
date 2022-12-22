import { useRouter } from "next/router";
import styles from "styles/pages/groups/groupContainer.module.css";
import { GroupData } from "../../../types/data/groupInterfaces";
import GroupItem from "./groupItem";

export default function GroupContainer({
  groups,
  refreshData,
}: {
  groups?: GroupData[];
  refreshData: () => void;
}) {
  const router = useRouter();

  return (
    <div className={styles.groupContainer}>
      {groups &&
        groups.map((x, index) => {
          return (
            <GroupItem
              key={index}
              groupData={x}
              router={router}
              refreshData={refreshData}
            />
          );
        })}
    </div>
  );
}
