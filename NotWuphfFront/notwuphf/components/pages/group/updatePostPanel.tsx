import styles from "styles/pages/post/updatePostPanel.module.css";
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
import WuphfButton from "../../../shared/components/WuphfButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import WuphfUser from "../../../types/WuphfUser";
import { PostData } from "../../../types/data/postInterfaces";
import { updatePost } from "../../../lib/posts";

export default function UpdatePostPanel({
  postData,
  groupId,
}: {
  postData: PostData;
  groupId: number;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [body, setBody] = useState(postData.body);

  const handleBodyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setBody(event.target.value);
  };

  const handleButtonClick = async () => {
    if (!session || !session.user) return;

    const user = session.user as WuphfUser;
    await updatePost(
      { body: body },
      groupId.toString(),
      postData.id.toString(),
      user.token
    );
    router.reload();
  };

  return (
    <div className={styles.container}>
      <WuphfButton onClick={onOpen}>
        <div className={styles.text}>Edit</div>
      </WuphfButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label>Body</label>
              <Input value={body} onChange={handleBodyChange} />
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
