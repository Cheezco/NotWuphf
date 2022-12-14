import { NextRouter } from "next/router";
import styles from "styles/pages/post/commentContainer.module.css";
import { CommentData } from "../../../types/data/commentInterfaces";
import Comment from "./comment";

export default function CommentContainer({
  comments,
}: {
  comments?: CommentData[];
}) {
  return (
    <div className={styles.commentContainer}>
      {comments &&
        comments.map((x, index) => {
          return (
            <Comment
              key={index}
              id={x.id.toString()}
              author={x.author}
              date={new Date(x.creationDate).toLocaleDateString()}
              comment={x.content}
            />
          );
        })}
    </div>
  );
}
