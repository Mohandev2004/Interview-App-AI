"use client";

import { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";

/** Always light — readable in dark app UI */
const INLINE_CODE_CLASS =
  "rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-slate-800";
const CODE_BLOCK_SURFACE_CLASS =
  "relative my-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-50";
const CODE_BLOCK_HEADER_CLASS =
  "flex items-center justify-between border-b border-slate-200 bg-slate-100 px-2 py-2";

interface AIResponsePreviewProps {
  content?: string;
}

export default function AIResponsePreview({ content }: AIResponsePreviewProps) {
  if (!content) return null;

  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const isInline = !className;

      return !isInline ? (
        <CodeBlock
          code={String(children).replace(/\n$/, "")}
          language={language}
        />
      ) : (
        <code className={INLINE_CODE_CLASS} {...props}>
          {children}
        </code>
      );
    },
    p({ children }) {
      return <p className="mb-4 leading-5">{children}</p>;
    },
    strong({ children }) {
      return <strong>{children}</strong>;
    },
    em({ children }) {
      return <em>{children}</em>;
    },
    ul({ children }) {
      return <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="list-disc pl-6 space-y-2 my-4">{children}</ol>;
    },
    li({ children }) {
      return <li className="mb-1">{children}</li>;
    },
    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4">
          {children}
        </blockquote>
      );
    },
    h1({ children }) {
      return <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>;
    },
    h3({ children }) {
      return <h3 className="text-lg font-bold mt-5 mb-2">{children}</h3>;
    },
    h4({ children }) {
      return <h4 className="text-base font-bold mt-4 mb-2">{children}</h4>;
    },
    a({ href, children }) {
      return (
        <a href={href} className="text-blue-600 hover:underline">
          {children}
        </a>
      );
    },
    table({ children }) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
            {children}
          </table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className="bg-gray-50"> {children}</thead>;
    },
    tbody({ children }) {
      return <tbody className="divide-y divide-gray-200">{children}</tbody>;
    },
    tr({ children }) {
      return <tr>{children}</tr>;
    },
    th({ children }) {
      return (
        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {children}
        </th>
      );
    },
    td({ children }) {
      return (
        <td className="px-3 py-2 whitespace-nowrap text-sm">{children}</td>
      );
    },
    hr() {
      return <hr className="my-6 border-gray-200" />;
    },
    img({ src, alt }) {
      return (
        <img src={src} alt={alt} className="my-4 max-w-full rounded" />
      );
    },
  };

  return (
    <>
        <div className="max-w-4xl mx-auto">
        <div className="prose prose-slate dark:prose-invert max-w-none text-[14px] [&_code]:text-slate-800">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={CODE_BLOCK_SURFACE_CLASS}>
      <div className={CODE_BLOCK_HEADER_CLASS}>
        <div className="flex items-center space-x-2">
          <LuCode size={16} className="text-slate-500" />
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            {language || "Code"}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="relative text-slate-500 hover:text-slate-700 focus:outline-none group"
          aria-label="Copy Code"
        >
          {copied ? (
            <LuCheck size={16} className="text-green-600" />
          ) : (
            <LuCopy size={16} />
          )}
          {copied && (
            <span className="absolute -top-8 right-0 rounded-md bg-black px-2 py-1 text-xs text-white opacity-80 transition group-hover:opacity-100">
              Copied!
            </span>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          fontSize: 12.5,
          margin: 0,
          padding: "1rem",
          background: "#f8fafc",
          color: "#0f172a",
        }}
        codeTagProps={{
          style: { color: "#0f172a" },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
