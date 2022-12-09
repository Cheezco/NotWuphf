import { useState } from "react";
import styles from "styles/pages/login/login.module.css";
import { Input } from "@chakra-ui/react";
import Button from "../shared/components/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h1 className={styles.title}>NotWuphf</h1>
        <form className={styles.form}>
          <div>
            <label>Username:</label>
            <Input className={styles.input} />
          </div>
          <div>
            <label>Email:</label>
            <Input type="email" className={styles.input} />
          </div>
          <div>
            <label>Password:</label>
            <Input type="password" className={styles.input} />
          </div>
          <br />
          <Button>Register</Button>
        </form>
      </div>
    </div>
  );
}
