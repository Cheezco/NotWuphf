import styles from "styles/pages/group/createPostPanel.module.css";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import WuphfUser from "types/WuphfUser";
import { createPost } from "@lib/posts";
import Button from "@shared/components/button";

export default function CreatePostPanel() {
  const { data: session } = useSession();

  const router = useRouter();
  const { groupId } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const handleBodyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setBody(event.target.value);
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value);
  };

  const handleButtonClick = async () => {
    if (!session || !session.user || typeof groupId !== "string") return;

    const user = session.user as WuphfUser;
    await createPost({ name: name, body: body }, groupId, user.token);
    router.reload();
  };

  return (
    <div className={styles.container}>
      <Button onClick={onOpen}>Create post</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label>Name</label>
              <Input value={name} onChange={handleNameChange} />
              <label>Body</label>
              <Input value={body} onChange={handleBodyChange} />
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
