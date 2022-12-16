import styles from "styles/pages/login/login.module.css";
import { Input } from "@chakra-ui/react";
import Button from "../shared/components/Button";
import { getCsrfToken } from "next-auth/react";

export default function Login({ csrfToken }) {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h1 className={styles.title}>NotWuphf</h1>
        <form
          className={styles.form}
          method="post"
          action="/api/auth/callback/credentials"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div>
            <label>Username:</label>
            <Input name="username" className={styles.input} />
          </div>
          <div>
            <label>Password:</label>
            <Input name="password" type="password" className={styles.input} />
          </div>
          <br />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
