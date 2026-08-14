"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      id="admin-logout-btn"
      onClick={handleLogout}
      className="px-4 py-2.5 font-departure-mono font-bold uppercase tracking-widest text-xs border-2 hover:opacity-70 transition-opacity"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card-bg)",
        color: "var(--muted)",
      }}
    >
      Log Out
    </button>
  );
}
