import { isAdmin } from "../../../lib/AuthHelpers";
import { deleteComment } from "../../../lib/comments";
import WuphfButton from "../../../shared/components/WuphfButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "styles/pages/post/comment.module.css";
import WuphfUser from "../../../types/WuphfUser";

export default function Comment({
  id,
  author,
  date,
  comment,
}: {
  id: string;
  author?: string;
  date?: string;
  comment?: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { groupId, postId } = router.query;

  const handleDeleteClick = async () => {
    if (
      !session ||
      !session.user ||
      typeof groupId !== "string" ||
      typeof postId !== "string"
    )
      return;

    const user = session.user as WuphfUser;
    await deleteComment(groupId, postId, id, user.token);
    router.reload();
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentMetadata}>
        <div>{author}</div>
        <div>{date}</div>
      </div>
      <br />
      <div>{comment}</div>
      {isAdmin(session?.user as WuphfUser) && (
        <div className={styles.button}>
          <WuphfButton onClick={handleDeleteClick}>
            <div className={styles.buttonText}>Delete</div>
          </WuphfButton>
        </div>
      )}
    </div>
  );
}
