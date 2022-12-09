import styles from "styles/pages/post/[postId].module.css";
import BackButton from "../../../../../shared/components/BackButton";
import MainLayout from "../../../../../shared/components/layouts/mainLayout";
import MainPanel from "../../../../../shared/components/mainPanel";
import { useState } from "react";
import { PostData } from "../../../../../types/data/postInterfaces";
import { CommentData } from "../../../../../types/data/commentInterfaces";
import {
  CommentBox,
  CommentContainer,
} from "../../../../../components/pages/post/postExports";
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const { groupId } = router.query;
  const [post, setPost] = useState<PostData>();
  const [comments, setComments] = useState<CommentData[]>([]);

  return (
    <MainLayout>
      <BackButton onClick={() => router.push("/auth/groups/" + groupId)} />
      <br />
      <MainPanel>
        <div className={styles.post}>
          <div className={styles.title}>{post?.name}</div>
          <br />
          <div>{post?.body}</div>
        </div>
        <br />
        <CommentContainer />
      </MainPanel>
      <br />
      <MainPanel>
        <CommentBox />
      </MainPanel>
    </MainLayout>
  );
}
