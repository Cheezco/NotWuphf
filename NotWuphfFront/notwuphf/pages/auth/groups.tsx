import styles from "styles/pages/groups/groups.module.css";
import GroupContainer from "../../components/pages/groups/groupContainer";
import MainLayout from "../../shared/components/layouts/mainLayout";
import MainPanel from "../../shared/components/mainPanel";
import { useSession } from "next-auth/react";
import WuphfUser from "../../types/WuphfUser";
import { GroupData } from "../../types/data/groupInterfaces";
import { useEffect, useState } from "react";
import { getGroups } from "../../lib/groups";
import Pagination from "../../shared/components/pagination";
import CreateGroupPanel from "../../components/pages/groups/createGroupPanel";
import { GetServerSideProps } from "next";

export default function Groups() {
  const { data: session } = useSession();
  const [groups, setGroups] = useState<GroupData[]>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!session || !session.user) return;

      const user = session.user as WuphfUser;
      const data = await getGroups(user.token, 1);

      setGroups(data.groups);
      setPageCount(Math.ceil(data.count / 5));
    };

    fetchData();
  }, [session, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout>
      <MainPanel>
        <CreateGroupPanel />
        <GroupContainer groups={groups} />
        <div className={styles.paginationContainer}>
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      </MainPanel>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} };
};
