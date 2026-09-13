import type { AuthProvider, AuthSession, AuthUser } from "./index";

const STORAGE_KEY = "bathcraft.auth.user";

/**
 * Dev/offline auth. Persists a single mock user in localStorage so the whole
 * app (projects, membership, saving) is exercisable before real SSO lands.
 * Mirrors the shape a Supabase provider will return.
 */
export class LocalAuthProvider implements AuthProvider {
  private listeners = new Set<(s: AuthSession) => void>();

  private read(): AuthUser | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }

  private write(user: AuthUser | null) {
    if (typeof window === "undefined") return;
    try {
      if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* private mode / disabled storage — session simply won't persist */
    }
    const session = { user };
    this.listeners.forEach((cb) => cb(session));
  }

  async getSession(): Promise<AuthSession> {
    return { user: this.read() };
  }

  async signIn(email: string): Promise<AuthSession> {
    const user: AuthUser = {
      id: `local-${email.toLowerCase()}`,
      email,
      name: email.split("@")[0],
    };
    this.write(user);
    return { user };
  }

  async signOut(): Promise<void> {
    this.write(null);
  }

  onChange(cb: (s: AuthSession) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }
}
