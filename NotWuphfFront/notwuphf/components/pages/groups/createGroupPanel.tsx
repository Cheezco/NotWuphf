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
import { createGroup } from "@lib/groups";
import Button from "@shared/components/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "styles/pages/groups/createGroupPanel.module.css";
import WuphfUser from "types/WuphfUser";

export default function CreateGroupPanel() {
  const { data: session } = useSession();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
    await createGroup(
      { name: name, description: description, visibility: 0 },
      user.token
    );
    router.reload();
  };

  return (
    <div className={styles.container}>
      <Button onClick={onOpen}>Create group</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create group</ModalHeader>
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
            <Button onClick={handleButtonClick}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
