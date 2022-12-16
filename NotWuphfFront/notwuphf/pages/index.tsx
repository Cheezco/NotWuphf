import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "styles/pages/index/index.module.css";
import WuphfButton from "../shared/components/WuphfButton";
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
          <WuphfButton onClick={() => signIn()}>Login</WuphfButton>
          <WuphfButton
            onClick={() => {
              router.push("register");
            }}
          >
            Register
          </WuphfButton>
        </div>
      </div>
    </div>
  );
}
