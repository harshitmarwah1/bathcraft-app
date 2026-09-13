"use client";

import { useEffect, useState } from "react";
import { getAuthProvider, type AuthUser } from "./index";

/**
 * Ensures a session exists and tracks the current user.
 * In dev (LocalAuthProvider) a guest session is created automatically so the
 * app is fully usable offline. When Supabase SSO lands (M6), the landing page
 * establishes the real session and this hook simply reads it.
 */
export function useSession() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const provider = getAuthProvider();
    let unsub = () => {};
    let active = true;

    (async () => {
      let session = await provider.getSession();
      if (!session.user) {
        // Dev convenience: auto-provision a guest. Real SSO replaces this.
        session = await provider.signIn("guest@bathcraft.local");
      }
      if (!active) return;
      setUser(session.user);
      setReady(true);
      unsub = provider.onChange((s) => setUser(s.user));
    })();

    return () => {
      active = false;
      unsub();
    };
  }, []);

  return { user, ready };
}
