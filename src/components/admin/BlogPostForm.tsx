"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TipTapEditor from "@/components/admin/TipTapEditor";
import type { BlogPostRow } from "@/lib/supabase";

type Props = {
  initialData?: Partial<BlogPostRow>;
  postId?: string; // UUID, present in edit mode
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-_]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type FieldProps = {
  label: string;
  id: string;
  children: React.ReactNode;
};

function Field({ label, id, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-departure-mono text-[10px] uppercase tracking-widest mb-1.5"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2.5 font-departure-mono text-sm border-2 outline-none focus:border-[var(--accent)] transition-colors";
const inputStyle = {
  borderColor: "var(--border)",
  backgroundColor: "var(--background)",
  color: "var(--foreground)",
};

export default function BlogPostForm({ initialData, postId }: Props) {
  const router = useRouter();
  const isEditing = !!postId;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [date, setDate] = useState(
    initialData?.date ?? new Date().toISOString().split("T")[0]
  );
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [readTime, setReadTime] = useState(initialData?.read_time ?? "");
  const [status, setStatus] = useState<"draft" | "published">(
    initialData?.status ?? "draft"
  );

  // Language tab
  const [activeTab, setActiveTab] = useState<"english" | "burmese">("english");

  // English
  const [englishSummary, setEnglishSummary] = useState(
    initialData?.english_summary ?? ""
  );
  const [englishContent, setEnglishContent] = useState(
    initialData?.english_content ?? ""
  );

  // Burmese
  const [burmeseSummary, setBurmeseSummary] = useState(
    initialData?.burmese_summary ?? ""
  );
  const [burmeseContent, setBurmeseContent] = useState(
    initialData?.burmese_content ?? ""
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from title (only if slug is empty or in create mode)
  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEditing || !slug) {
      setSlug(slugify(value));
    }
  }

  async function handleSave(saveStatus: "draft" | "published") {
    setSaving(true);
    setError("");

    const payload = {
      slug,
      title,
      date,
      category: category || null,
      read_time: readTime || null,
      english_summary: englishSummary || null,
      burmese_summary: burmeseSummary || null,
      english_content: englishContent || null,
      burmese_content: burmeseContent || null,
      status: saveStatus,
    };

    const url = isEditing ? `/api/blogs/${postId}` : "/api/blogs";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/blogs");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Failed to save post");
      setSaving(false);
    }
  }

  return (
    <div
      className="min-h-screen p-6 lg:p-10"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Page header */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <button
          onClick={() => router.push("/admin/blogs")}
          className="font-departure-mono text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted)" }}
        >
          ← Back
        </button>
        <div className="h-4 w-px" style={{ backgroundColor: "var(--border)" }} />
        <div>
          <p
            className="font-departure-mono text-[10px] uppercase tracking-[0.4em]"
            style={{ color: "var(--accent)" }}
          >
            [ Admin CMS ]
          </p>
          <h1
            className="font-departure-mono text-2xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            {isEditing ? "Edit Post" : "New Post"}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">
        {/* Main editor area */}
        <div className="space-y-6">
          {/* Title */}
          <Field label="Title" id="post-title">
            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="My Blog Post Title"
              className={inputClass}
              style={inputStyle}
            />
          </Field>

          {/* Language Tabs */}
          <div
            className="border-2 shadow-[4px_4px_0_0_var(--border)]"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Tab bar */}
            <div
              className="flex border-b-2"
              style={{ borderColor: "var(--border)" }}
            >
              {(["english", "burmese"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  id={`tab-${lang}`}
                  onClick={() => setActiveTab(lang)}
                  className={`flex-1 py-3 font-departure-mono text-[10px] uppercase tracking-widest font-bold transition-all ${
                    activeTab === lang
                      ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                      : "hover:bg-[var(--card-bg)]"
                  }`}
                  style={activeTab !== lang ? { color: "var(--muted)" } : {}}
                >
                  {lang === "english" ? "🇬🇧 English" : "🇲🇲 Burmese"}
                </button>
              ))}
            </div>

            <div className="p-5 space-y-5" style={{ backgroundColor: "var(--card-bg)" }}>
              {activeTab === "english" ? (
                <>
                  <Field label="English Summary" id="en-summary">
                    <textarea
                      id="en-summary"
                      rows={3}
                      value={englishSummary}
                      onChange={(e) => setEnglishSummary(e.target.value)}
                      placeholder="A short summary of this post in English..."
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                    />
                  </Field>
                  <div>
                    <label
                      className="block font-departure-mono text-[10px] uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--muted)" }}
                    >
                      English Content
                    </label>
                    <TipTapEditor
                      content={englishContent}
                      onChange={setEnglishContent}
                      language="english"
                    />
                  </div>
                </>
              ) : (
                <>
                  <Field label="Burmese Summary (မြန်မာ အကျဉ်းချုပ်)" id="my-summary">
                    <textarea
                      id="my-summary"
                      rows={3}
                      value={burmeseSummary}
                      onChange={(e) => setBurmeseSummary(e.target.value)}
                      placeholder="ဤဆောင်းပါး၏ အကျဉ်းချုပ်ကို မြန်မာဘာသာဖြင့် ရေးပါ..."
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                    />
                  </Field>
                  <div>
                    <label
                      className="block font-departure-mono text-[10px] uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--muted)" }}
                    >
                      Burmese Content (မြန်မာ အကြောင်းအရာ)
                    </label>
                    <TipTapEditor
                      content={burmeseContent}
                      onChange={setBurmeseContent}
                      language="burmese"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish card */}
          <div
            className="border-2 p-5 shadow-[4px_4px_0_0_var(--border)] space-y-4"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
          >
            <p
              className="font-departure-mono text-[10px] uppercase tracking-widest font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Publish
            </p>

            {error && (
              <div
                className="px-3 py-2 border font-departure-mono text-[10px]"
                style={{
                  borderColor: "#ef4444",
                  color: "#ef4444",
                  backgroundColor: "rgba(239,68,68,0.08)",
                }}
              >
                ✗ {error}
              </div>
            )}

            <button
              id="btn-save-draft"
              type="button"
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="w-full py-2.5 font-departure-mono font-bold uppercase tracking-widest text-xs border-2 hover:opacity-80 transition-all disabled:opacity-40"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
              }}
            >
              {saving ? "Saving..." : "Save Draft"}
            </button>

            <button
              id="btn-publish"
              type="button"
              onClick={() => handleSave("published")}
              disabled={saving || !title || !slug}
              className="w-full py-2.5 font-departure-mono font-bold uppercase tracking-widest text-xs border-2 border-black dark:border-white shadow-[3px_3px_0_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_0_rgba(255,255,255,1)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)",
              }}
            >
              {saving ? "Publishing..." : "→ Publish"}
            </button>

            {status === "published" && isEditing && (
              <button
                id="btn-unpublish"
                type="button"
                onClick={() => handleSave("draft")}
                disabled={saving}
                className="w-full py-2 font-departure-mono text-[10px] uppercase tracking-widest border hover:opacity-70 transition-opacity"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                Unpublish
              </button>
            )}
          </div>

          {/* Metadata card */}
          <div
            className="border-2 p-5 shadow-[4px_4px_0_0_var(--border)] space-y-4"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
          >
            <p
              className="font-departure-mono text-[10px] uppercase tracking-widest font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Metadata
            </p>

            <Field label="Slug" id="post-slug">
              <input
                id="post-slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="my-post-slug"
                className={inputClass}
                style={inputStyle}
              />
              <p
                className="font-departure-mono text-[9px] mt-1"
                style={{ color: "var(--muted)" }}
              >
                /blogs/{slug || "..."}
              </p>
            </Field>

            <Field label="Date" id="post-date">
              <input
                id="post-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
                style={inputStyle}
              />
            </Field>

            <Field label="Category" id="post-category">
              <input
                id="post-category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Engineering"
                className={inputClass}
                style={inputStyle}
              />
            </Field>

            <Field label="Read Time" id="post-read-time">
              <input
                id="post-read-time"
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 4 min read"
                className={inputClass}
                style={inputStyle}
              />
            </Field>
          </div>

          {/* Status indicator */}
          <div
            className="border-2 p-4"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full inline-block ${
                  status === "published" ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              <span
                className="font-departure-mono text-[10px] uppercase tracking-widest"
                style={{ color: "var(--muted)" }}
              >
                {status === "published" ? "Published" : "Draft"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
