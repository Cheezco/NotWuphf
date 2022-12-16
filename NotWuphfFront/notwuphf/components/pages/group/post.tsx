import { isAdmin } from "@lib/AuthHelpers";
import { deletePost } from "@lib/posts";
import { useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import styles from "styles/pages/group/post.module.css";
import WuphfUser from "types/WuphfUser";
import Button from "../../../shared/components/button";
import { PostData } from "../../../types/data/postInterfaces";

export default function Post({
  postData,
  router,
  groupId,
}: {
  postData?: PostData;
  router: NextRouter;
  groupId?: Number;
}) {
  const { data: session } = useSession();

  const handleDeleteClick = async () => {
    if (!session || !session.user || !postData || !groupId) return;

    const user = session.user as WuphfUser;
    await deletePost(groupId?.toString(), postData.id.toString(), user.token);
    router.reload();
  };

  return (
    <div className={styles.post}>
      <div className={styles.postTitle}>{postData?.name}</div>
      <br />
      <div>{postData?.body}</div>
      <div className={styles.buttons}>
        {isAdmin(session?.user as WuphfUser) && (
          <Button onClick={handleDeleteClick}>
            <div className={styles.commentText}>Delete</div>
          </Button>
        )}
        <Button
          onClick={() =>
            router.push("/auth/groups/" + groupId + "/posts/" + postData?.id)
          }
        >
          <div className={styles.commentText}>Comments</div>
        </Button>
      </div>
    </div>
  );
}
