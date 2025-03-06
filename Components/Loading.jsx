import { Spinner } from "@material-tailwind/react/components/Spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md z-50">
      <Spinner className="h-16 w-16 text-blue-600 animate-spin" />
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading ProlanceHub...</p>
    </div>
  );
}
