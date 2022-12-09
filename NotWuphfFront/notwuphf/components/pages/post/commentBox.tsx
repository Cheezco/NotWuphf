import styles from "styles/pages/post/commentBox.module.css";
import { Textarea } from "@chakra-ui/react";
import Button from "../../../shared/components/Button";

export default function CommentBox() {
  return (
    <form className={styles.form}>
      <Textarea resize="vertical" className={styles.input} />
      <br />
      <div className={styles.button}>
        <Button>Comment</Button>
      </div>
    </form>
  );
}
