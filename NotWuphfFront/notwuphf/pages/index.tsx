import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "styles/pages/index/index.module.css";
import Button from "../shared/components/button";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (window === undefined || !session) return;

    router.push("/auth/groups");
  });

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h1 className={styles.title}>NotWuphf</h1>
        <div className={styles.buttonContainer}>
          <Button onClick={() => signIn()}>Login</Button>
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
