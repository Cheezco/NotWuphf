import { NextRouter } from "next/router";
import styles from "styles/pages/group/post.module.css";
import Button from "../../../shared/components/Button";
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
  return (
    <div className={styles.post}>
      <div className={styles.postTitle}>{postData?.name}</div>
      <br />
      <div>{postData?.body}</div>
      <div className={styles.commentButton}>
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
