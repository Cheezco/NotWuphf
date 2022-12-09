import GroupContainer from "../../components/pages/groups/groupContainer";
import MainLayout from "../../shared/components/layouts/mainLayout";
import MainPanel from "../../shared/components/mainPanel";

export default function Groups() {
  return (
    <MainLayout>
      <MainPanel>
        <GroupContainer />
      </MainPanel>
    </MainLayout>
  );
}
