import SpinnerLoader from "@/components/shared/spinner-loader";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <SpinnerLoader />
    </div>
  );
}
