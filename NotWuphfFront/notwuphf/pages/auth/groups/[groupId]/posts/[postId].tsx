import styles from "styles/pages/post/[postId].module.css";
import BackButton from "../../../../../shared/components/backButton";
import MainLayout from "../../../../../shared/components/layouts/mainLayout";
import MainPanel from "../../../../../shared/components/mainPanel";
import { useEffect, useState } from "react";
import { PostData } from "../../../../../types/data/postInterfaces";
import { CommentData } from "../../../../../types/data/commentInterfaces";
import {
  CommentBox,
  CommentContainer,
} from "../../../../../components/pages/post/postExports";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import WuphfUser from "../../../../../types/WuphfUser";
import { getPost } from "../../../../../lib/posts";
import { getComments } from "../../../../../lib/comments";
import Pagination from "../../../../../shared/components/pagination";

export default function Post() {
  const router = useRouter();
  const { groupId, postId } = router.query;

  const { data: session } = useSession();

  const [post, setPost] = useState<PostData>();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (
        !session ||
        !session.user ||
        typeof groupId !== "string" ||
        typeof postId !== "string"
      )
        return;

      const user = session.user as WuphfUser;

      const commentData = await getComments(
        groupId,
        postId,
        user.token,
        currentPage + 1
      );
      setComments(commentData.comments);
      setPageCount(Math.ceil(commentData.count / 5));

      if (typeof post === "undefined") {
        const postData = await getPost(groupId, postId, user.token);
        setPost(postData);
      }
    };

    fetchData();
  }, [post, session, groupId, currentPage, postId]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout>
      <div className={styles.backButton}>
        <BackButton onClick={() => router.push("/auth/groups/" + groupId)} />
      </div>
      <br />
      <MainPanel>
        <div className={styles.post}>
          <div className={styles.title}>{post?.name}</div>
          <br />
          <div>{post?.body}</div>
        </div>
        <br />
        <CommentContainer comments={comments} />
        {pageCount > 0 && (
          <div className={styles.paginationContainer}>
            <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
          </div>
        )}
      </MainPanel>
      <br />
      <MainPanel>
        <CommentBox />
      </MainPanel>
    </MainLayout>
  );
}
