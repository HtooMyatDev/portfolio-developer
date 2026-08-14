"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/blogs");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Login failed");
    }

    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10 text-center">
          <p
            className="font-departure-mono text-[10px] uppercase tracking-[0.4em] mb-3"
            style={{ color: "var(--accent)" }}
          >
            [ Admin Access ]
          </p>
          <h1
            className="font-departure-mono text-4xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            CMS Login
          </h1>
          <p
            className="font-departure-mono text-xs mt-3 leading-6"
            style={{ color: "var(--muted)" }}
          >
            Enter your admin password to access the blog editor.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="border-2 p-8 shadow-[6px_6px_0_0_var(--border)]"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--card-bg)",
          }}
        >
          <div className="mb-6">
            <label
              htmlFor="admin-password"
              className="block font-departure-mono text-[10px] uppercase tracking-widest mb-2"
              style={{ color: "var(--muted)" }}
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="••••••••••••"
              className="w-full px-4 py-3 font-departure-mono text-sm border-2 outline-none focus:border-[var(--accent)] transition-colors"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
              }}
            />
          </div>

          {error && (
            <div
              className="mb-5 px-4 py-3 border-2 font-departure-mono text-xs"
              style={{
                borderColor: "#ef4444",
                backgroundColor: "rgba(239,68,68,0.08)",
                color: "#ef4444",
              }}
            >
              ✗ {error}
            </div>
          )}

          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3 font-departure-mono font-bold uppercase tracking-widest text-xs border-2 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)",
            }}
          >
            {loading ? "Authenticating..." : "→ Enter CMS"}
          </button>
        </form>

        <p
          className="text-center font-departure-mono text-[10px] mt-6 uppercase tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          htoo myat aung · portfolio cms
        </p>
      </div>
    </div>
  );
}
