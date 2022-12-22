import GroupContainer from "../../components/pages/groups/groupContainer";
import MainLayout from "../../shared/components/layouts/mainLayout";
import MainPanel from "../../shared/components/mainPanel";

export default function MyGroups() {
  return (
    <MainLayout>
      <MainPanel>
        <GroupContainer refreshData={() => {}} />
      </MainPanel>
    </MainLayout>
  );
}
