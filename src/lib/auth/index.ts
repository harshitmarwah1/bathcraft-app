/**
 * Provider-agnostic auth seam.
 *
 * The rest of the app depends ONLY on the `AuthProvider` interface below, never
 * on a concrete backend. Today we ship `LocalAuthProvider` (dev/offline). When
 * the teammate's Supabase auth is ready (see plan M6), a `SupabaseAuthProvider`
 * implementing the same interface is added and selected via env — no consumer
 * code changes.
 */

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface AuthSession {
  user: AuthUser | null;
}

export interface AuthProvider {
  getSession(): Promise<AuthSession>;
  /** Sign in (local: instant; Supabase: email OTP / SSO handoff from landing). */
  signIn(email: string): Promise<AuthSession>;
  signOut(): Promise<void>;
  /** Subscribe to session changes; returns an unsubscribe fn. */
  onChange(cb: (session: AuthSession) => void): () => void;
}

import { LocalAuthProvider } from "./local-provider";

let provider: AuthProvider | null = null;

export function getAuthProvider(): AuthProvider {
  if (provider) return provider;
  // Selection point for M6: when NEXT_PUBLIC_SUPABASE_URL is present, return a
  // SupabaseAuthProvider here instead. Kept behind this single factory so the
  // swap is one file.
  provider = new LocalAuthProvider();
  return provider;
}
