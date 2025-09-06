import Link from "next/link";

type Props = {
  uuid: string;
  name: string;
}

export default function ChatItem({ uuid, name }: Props) {
  return (
    <Link href={`chat/${uuid}`} className="block p-2 rounded text-[20px] hover:opacity-90">
      {name || "Untitled"}
    </Link>
  );
}
