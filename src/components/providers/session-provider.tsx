import { backendInstance } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

type Props = {
  children: JSX.Element;
};

export default function SessionTokenProvider({ children }: Props) {
  const { data: session, status } = useSession();
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };

    getFingerprint();
  }, []);

  useEffect(() => {
    if (session?.user.token) {
      backendInstance.defaults.headers.common["Authorization"] =
        `Bearer ${session.user.token}`;
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`token: ${session?.user.token}`);
    }

    if (fingerprint) {
      backendInstance.defaults.headers.common["Fingerprint"] = fingerprint;
    }
  }, [session, fingerprint]);

  return children;
}
