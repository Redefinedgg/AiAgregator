import Link from "next/link";

type Props = {
  uuid: string;
  name: string | null;
}

export default function ChatItem({ uuid, name }: Props) {
  return (
    <Link key={uuid} href={`chat/${uuid}`} className="block p-2 rounded text-[20px] hover:opacity-90 hover:bg-[#11141C] p-[8px] rounded-[12px]">
      {name || "Untitled"}
    </Link>
  );
}
