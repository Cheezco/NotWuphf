import styles from "styles/pages/post/comment.module.css";

export default function Comment({
  author,
  date,
  comment,
}: {
  author?: string;
  date?: string;
  comment?: string;
}) {
  return (
    <div className={styles.comment}>
      <div className={styles.commentMetadata}>
        <div>{author}</div>
        <div>{date}</div>
      </div>
      <br />
      <div>{comment}</div>
    </div>
  );
}
