import Link from "next/link";

export default function InterviewNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-lg font-semibold text-black">Session not found</h2>
      <p className="text-sm text-gray-600 text-center">
        This interview session does not exist or may have been deleted.
      </p>
      <Link href="/dashboard" className="btn-primary">
        Back to dashboard
      </Link>
    </div>
  );
}
