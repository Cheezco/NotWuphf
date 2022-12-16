import { isAdmin } from "../../../lib/AuthHelpers";
import { deleteGroup } from "../../../lib/groups";
import { useSession } from "next-auth/react";
import { NextRouter } from "next/router";
import styles from "styles/pages/groups/groupItem.module.css";
import WuphfUser from "../../../types/WuphfUser";
import WuphfButton from "../../../shared/components/WuphfButton";
import { GroupData } from "../../../types/data/groupInterfaces";
import UpdateGroupPanel from "./updateGroupPanel";

export default function GroupItem({
  groupData,
  router,
  refreshData,
}: {
  groupData?: GroupData;
  router: NextRouter;
  refreshData: () => void;
}) {
  const { data: session } = useSession();

  const handleDeleteClick = async () => {
    if (!session || !session.user || !groupData) return;

    const user = session.user as WuphfUser;
    await deleteGroup(groupData.id.toString(), user.token);

    refreshData();
    // router.reload();
  };

  return (
    <div className={styles.groupItem}>
      <div className={styles.name}>{groupData?.name}</div>
      <div className={styles.description}>{groupData?.description}</div>
      <div className={styles.buttonContainer}>
        <WuphfButton
          onClick={() => router.push("/auth/groups/" + groupData?.id)}
        >
          <div className={styles.buttonText}>View</div>
        </WuphfButton>
        {isAdmin(session?.user as WuphfUser) && groupData && (
          <>
            <WuphfButton onClick={handleDeleteClick}>
              <div className={styles.buttonText}>Delete</div>
            </WuphfButton>
            <UpdateGroupPanel groupData={groupData} refreshData={refreshData} />
          </>
        )}
      </div>
    </div>
  );
}
