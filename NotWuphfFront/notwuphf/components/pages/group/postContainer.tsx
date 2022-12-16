import { useRouter } from "next/router";
import styles from "styles/pages/group/postContainer.module.css";
import { PostData } from "../../../types/data/postInterfaces";
import Post from "./post";

export default function PostContainer({
  posts,
  groupId,
}: {
  posts?: PostData[];
  groupId?: number;
}) {
  const router = useRouter();

  return (
    <div className={styles.postContainer}>
      {posts &&
        posts.map((x, index) => {
          return (
            <Post key={index} postData={x} router={router} groupId={groupId} />
          );
        })}
    </div>
  );
}
