import { useRouter } from "next/router";
import styles from "styles/pages/index/index.module.css";
import Button from "../shared/components/Button";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h1 className={styles.title}>NotWuphf</h1>
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => {
              router.push("login");
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              router.push("register");
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
