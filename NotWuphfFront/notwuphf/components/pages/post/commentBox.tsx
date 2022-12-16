import styles from "styles/pages/post/commentBox.module.css";
import { Textarea } from "@chakra-ui/react";
import Button from "../../../shared/components/button";
import { useState } from "react";
import { useRouter } from "next/router";
import { createComment } from "@lib/comments";
import { useSession } from "next-auth/react";
import WuphfUser from "types/WuphfUser";

export default function CommentBox() {
  const router = useRouter();
  const { groupId, postId } = router.query;

  const { data: session } = useSession();

  const [value, setValue] = useState("");

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    const submitData = async () => {
      if (
        !session ||
        !session.user ||
        typeof groupId !== "string" ||
        typeof postId !== "string"
      )
        return;

      const user = session.user as WuphfUser;
      await createComment({ content: value }, groupId, postId, user.token);
    };

    submitData();
  };

  const handleValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setValue(event.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Textarea
        onChange={handleValueChange}
        value={value}
        resize="vertical"
        name="content"
        className={styles.input}
      />
      <br />
      <div className={styles.button}>
        <Button>Comment</Button>
      </div>
    </form>
  );
}
