import { isAdmin } from "@lib/AuthHelpers";
import { deleteGroup } from "@lib/groups";
import { useSession } from "next-auth/react";
import { NextRouter } from "next/router";
import styles from "styles/pages/groups/groupItem.module.css";
import WuphfUser from "types/WuphfUser";
import WuphfButton from "../../../shared/components/WuphfButton";
import { GroupData } from "../../../types/data/groupInterfaces";

export default function GroupItem({
  groupData,
  router,
}: {
  groupData?: GroupData;
  router: NextRouter;
}) {
  const { data: session } = useSession();

  const handleDeleteClick = () => {
    const deleteRequest = async () => {
      if (!session || !session.user || !groupData) return;

      const user = session.user as WuphfUser;
      await deleteGroup(groupData.id.toString(), user.token);
    };

    deleteRequest();
    router.reload();
  };

  return (
    <div className={styles.groupItem}>
      <div className={styles.name}>{groupData?.name}</div>
      <div className={styles.description}>{groupData?.description}</div>
      <div>
        <WuphfButton
          onClick={() => router.push("/auth/groups/" + groupData?.id)}
        >
          <div className={styles.buttonText}>View</div>
        </WuphfButton>
        &nbsp;
        {isAdmin(session?.user as WuphfUser) && (
          <WuphfButton onClick={handleDeleteClick}>
            <div className={styles.buttonText}>Delete</div>
          </WuphfButton>
        )}
      </div>
    </div>
  );
}
