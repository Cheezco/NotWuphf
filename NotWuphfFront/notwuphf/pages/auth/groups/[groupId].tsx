import { useRouter } from "next/router";
import { useState } from "react";
import {
  GroupInfo,
  PostContainer,
} from "../../../components/pages/group/groupExports";
import BackButton from "../../../shared/components/BackButton";
import ContentPanel from "../../../shared/components/contentPanel";
import MainLayout from "../../../shared/components/layouts/mainLayout";
import MainPanel from "../../../shared/components/mainPanel";
import { GroupData } from "../../../types/data/groupInterfaces";
import { PostData } from "../../../types/data/postInterfaces";

export default function Group() {
  const router = useRouter();

  const [group, setGroup] = useState<GroupData>();
  const [posts, setPosts] = useState<PostData[]>([
    { body: "saaaas", creationDate: new Date(0), id: 0, name: "adawdaaw" },
  ]);

  return (
    <MainLayout>
      <BackButton onClick={() => router.push("/auth/groups")} />
      <br />
      <MainPanel>
        <GroupInfo />
      </MainPanel>
      <br />
      {posts.length === 0 ? (
        <></>
      ) : (
        <ContentPanel>
          <PostContainer posts={posts} groupId={group?.id} />
        </ContentPanel>
      )}
    </MainLayout>
  );
}
