import styles from "styles/pages/groups/updateGroupPanel.module.css";
import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { createGroup, updateGroup } from "../../../lib/groups";
import WuphfButton from "../../../shared/components/WuphfButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import WuphfUser from "../../../types/WuphfUser";
import { GroupData } from "../../../types/data/groupInterfaces";

export default function UpdateGroupPanel({
  groupData,
}: {
  groupData: GroupData;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(groupData.name);
  const [description, setDescription] = useState(groupData.description);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDescription(event.target.value);
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value);
  };

  const handleButtonClick = async () => {
    if (!session || !session.user) return;

    const user = session.user as WuphfUser;
    await updateGroup(
      { name: name, description: description, visibility: 0 },
      groupData.id.toString(),
      user.token
    );
    router.reload();
  };

  return (
    <div className={styles.container}>
      <WuphfButton onClick={onOpen}>Edit</WuphfButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label>Name</label>
              <Input value={name} onChange={handleNameChange} />
              <label>Description</label>
              <Input value={description} onChange={handleDescriptionChange} />
            </div>
          </ModalBody>
          <ModalFooter>
            <WuphfButton onClick={handleButtonClick}>Update</WuphfButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
