import { NextRouter } from "next/router";
import styles from "styles/pages/groups/groupItem.module.css";
import Button from "../../../shared/components/Button";
import { GroupData } from "../../../types/data/groupInterfaces";

export default function GroupItem({
  groupData,
  router,
}: {
  groupData?: GroupData;
  router: NextRouter;
}) {
  return (
    <div className={styles.groupItem}>
      <div>Group name</div>
      <div className={styles.description}>Group description</div>
      <Button onClick={() => router.push("/auth/groups/" + groupData?.id)}>
        Join
      </Button>
    </div>
  );
}
