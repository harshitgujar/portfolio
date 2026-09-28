"use client";

import React, { useState } from "react";
import { X, Plus, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { DesignToolItem } from "@/data/design-tools";

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tool: Omit<DesignToolItem, "id">) => void;
}

const CATEGORY_PRESETS = [
  "3D & WebGL",
  "Typography",
  "Color Systems",
  "Motion & UI",
  "Generative AI",
  "Design Utility",
  "Shader / Canvas",
  "Creative Code",
];

const DEFAULT_THUMBNAILS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
];

export function SubmitToolModal({
  isOpen,
  onClose,
  onSubmit,
}: SubmitToolModalProps) {
  const { isLight, currentTheme } = useTheme();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState(CATEGORY_PRESETS[0]);
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please provide a project or tool name.");
      return;
    }

    let formattedUrl = url.trim();
    if (!formattedUrl) {
      setError("Please provide a valid website link.");
      return;
    }
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const fallbackThumbnail =
      thumbnail.trim() ||
      DEFAULT_THUMBNAILS[Math.floor(Math.random() * DEFAULT_THUMBNAILS.length)];

    onSubmit({
      title: title.trim(),
      url: formattedUrl,
      category: category.trim() || "Design Tool",
      thumbnail: fallbackThumbnail,
      description: description.trim() || undefined,
      author: author.trim() || "Community",
      date: new Date().getFullYear().toString(),
    });

    // Reset state & close
    setTitle("");
    setUrl("");
    setCategory(CATEGORY_PRESETS[0]);
    setThumbnail("");
    setDescription("");
    setAuthor("");
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Translucent Frosted Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
      />

      {/* Glassmorphic Modal Dialog Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-modal-title"
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 overflow-hidden z-10 transition-all duration-300 animate-in zoom-in-95 ${
          isLight
            ? "bg-white/75 backdrop-blur-2xl backdrop-saturate-150 border border-black/10 shadow-[0_25px_60px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] text-neutral-900"
            : "bg-[#0f1115]/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_0_24px_rgba(255,255,255,0.03)] text-white"
        }`}
      >
        {/* Specular Ambient Glows inside the Glass Container */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-25 transition-colors duration-700"
          style={{ backgroundColor: currentTheme.previewColor }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-15 bg-white/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/[0.1]"
        />

        {/* Glass Close Button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full border transition-all duration-200 active:scale-95 ${
            isLight
              ? "border-black/10 bg-black/[0.04] hover:bg-black/10 text-neutral-700 shadow-sm"
              : "border-white/15 bg-white/[0.08] hover:bg-white/[0.18] text-white/80 hover:text-white backdrop-blur-md shadow-sm"
          }`}
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="relative z-10 space-y-1.5 pr-8">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: currentTheme.previewColor }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-400">
              COMMUNITY SUBMISSION
            </span>
          </div>
          <h2
            id="submit-modal-title"
            className="font-[family-name:var(--font-instrument-serif)] text-2xl sm:text-3xl font-normal tracking-tight"
          >
            Submit a tool or project
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed">
            Add a creative design tool, web experiment, or project to this curated library.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10 mt-6 space-y-4">
          {error && (
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono">
              {error}
            </div>
          )}

          {/* Project Name */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Project / Tool Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. ShaderGradient or Ray.so"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl font-sans text-sm border outline-none transition-all duration-200 backdrop-blur-md ${
                isLight
                  ? "bg-black/[0.03] hover:bg-black/[0.05] focus:bg-white border-black/15 focus:border-black text-neutral-900 placeholder:text-neutral-400 shadow-inner"
                  : "bg-white/[0.06] hover:bg-white/[0.09] focus:bg-white/[0.12] border-white/15 focus:border-white/50 text-white placeholder:text-neutral-500 shadow-inner"
              }`}
            />
          </div>

          {/* Website Link */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Website URL *
            </label>
            <input
              type="text"
              required
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl font-sans text-sm border outline-none transition-all duration-200 backdrop-blur-md ${
                isLight
                  ? "bg-black/[0.03] hover:bg-black/[0.05] focus:bg-white border-black/15 focus:border-black text-neutral-900 placeholder:text-neutral-400 shadow-inner"
                  : "bg-white/[0.06] hover:bg-white/[0.09] focus:bg-white/[0.12] border-white/15 focus:border-white/50 text-white placeholder:text-neutral-500 shadow-inner"
              }`}
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl font-sans text-sm border outline-none transition-all duration-200 backdrop-blur-md cursor-pointer ${
                isLight
                  ? "bg-black/[0.03] hover:bg-black/[0.05] focus:bg-white border-black/15 focus:border-black text-neutral-900"
                  : "bg-white/[0.06] hover:bg-white/[0.09] focus:bg-white/[0.12] border-white/15 focus:border-white/50 text-white"
              }`}
            >
              {CATEGORY_PRESETS.map((cat) => (
                <option key={cat} value={cat} className="bg-[#121316] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Thumbnail Image URL */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Photo / Thumbnail URL <span className="opacity-60">(Optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://... image url (optional)"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl font-sans text-sm border outline-none transition-all duration-200 backdrop-blur-md ${
                isLight
                  ? "bg-black/[0.03] hover:bg-black/[0.05] focus:bg-white border-black/15 focus:border-black text-neutral-900 placeholder:text-neutral-400 shadow-inner"
                  : "bg-white/[0.06] hover:bg-white/[0.09] focus:bg-white/[0.12] border-white/15 focus:border-white/50 text-white placeholder:text-neutral-500 shadow-inner"
              }`}
            />
          </div>

          {/* Submitter Name / Short Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Creator / Credit
              </label>
              <input
                type="text"
                placeholder="e.g. Studio or Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl font-sans text-sm border outline-none transition-all duration-200 backdrop-blur-md ${
                  isLight
                    ? "bg-black/[0.03] hover:bg-black/[0.05] focus:bg-white border-black/15 focus:border-black text-neutral-900 placeholder:text-neutral-400 shadow-inner"
                    : "bg-white/[0.06] hover:bg-white/[0.09] focus:bg-white/[0.12] border-white/15 focus:border-white/50 text-white placeholder:text-neutral-500 shadow-inner"
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Short Description
              </label>
              <input
                type="text"
                placeholder="One-line summary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl font-sans text-sm border outline-none transition-all duration-200 backdrop-blur-md ${
                  isLight
                    ? "bg-black/[0.03] hover:bg-black/[0.05] focus:bg-white border-black/15 focus:border-black text-neutral-900 placeholder:text-neutral-400 shadow-inner"
                    : "bg-white/[0.06] hover:bg-white/[0.09] focus:bg-white/[0.12] border-white/15 focus:border-white/50 text-white placeholder:text-neutral-500 shadow-inner"
                }`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-[family-name:var(--font-space-grotesk)] text-xs font-medium transition-colors ${
                isLight ? "text-neutral-600 hover:text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg font-[family-name:var(--font-space-grotesk)] text-xs font-medium transition-all duration-150 active:scale-[0.98] ${
                isLight
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              Submit to Library &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
