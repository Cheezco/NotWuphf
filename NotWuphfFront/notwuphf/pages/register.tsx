import styles from "styles/pages/register/register.module.css";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import Button from "../shared/components/Button";

export default function Register() {
  const [username, setUsername] = useState("");
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
            <label>Password:</label>
            <Input type="password" className={styles.input} />
          </div>
          <br />
          <Button>Login</Button>
        </form>
      </div>
    </div>
  );
}
