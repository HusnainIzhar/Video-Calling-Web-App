import Link from "next/link";

interface PageProps {
  params: { id: string };
}
export default function Page({ params: { id } }: PageProps) {
  return (
    <div className="flex flex-col items-center gap-3 justify-center h-screen">
      <p className="font-bold text-theme-textInactive">You left this meeting</p>
      <div className="flex gap-5 items-center ">
        <Link
          className="py-2 px-3 bg-theme-4 text-theme-textInactive border border-theme-3 rounded-lg hover:text-theme-textActive"
          href={`/meeting/${id}`}
        >
          Rejoin
        </Link>
        <Link
          className="py-2 px-3  text-theme-textInactive border border-theme-3 rounded-lg hover:text-theme-textActive"
          href={"/"}
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
