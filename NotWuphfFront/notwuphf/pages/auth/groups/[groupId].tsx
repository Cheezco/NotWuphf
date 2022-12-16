import styles from "styles/pages/group/[groupId].module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GroupInfo, PostContainer } from "@components/pages/group/groupExports";
import { getGroup } from "@lib/groups";
import { getPosts } from "@lib/posts";
import BackButton from "@shared/components/backButton";
import ContentPanel from "@shared/components/contentPanel";
import MainLayout from "@shared/components/layouts/mainLayout";
import MainPanel from "@shared/components/mainPanel";
import { GroupData } from "../../../types/data/groupInterfaces";
import { PostData } from "../../../types/data/postInterfaces";
import WuphfUser from "../../../types/WuphfUser";
import Pagination from "@shared/components/pagination";
import CreatePostPanel from "@components/pages/group/createPostPanel";

export default function Group() {
  const router = useRouter();
  const { groupId } = router.query;
  const { data: session } = useSession();

  const [group, setGroup] = useState<GroupData>();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!session || !session.user || typeof groupId !== "string") return;

      const user = session.user as WuphfUser;
      if (typeof group === "undefined") {
        const groupData = await getGroup(groupId, user.token);
        setGroup(groupData);
      }
      const postData = await getPosts(groupId, user.token, currentPage + 1);
      setPosts(postData.posts);
      setPageCount(Math.ceil(postData.count / 5));
    };

    fetchData();
  }, [group, session, groupId, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout>
      <div className={styles.backButton}>
        <BackButton onClick={() => router.push("/auth/groups")} />
      </div>
      <br />
      <MainPanel>
        <GroupInfo groupData={group} />
        <CreatePostPanel />
      </MainPanel>
      <br />
      {posts.length === 0 ? (
        <></>
      ) : (
        <ContentPanel>
          <PostContainer posts={posts} groupId={group?.id} />
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </ContentPanel>
      )}
    </MainLayout>
  );
}
