import Link from "next/link";

const HeaderLeftBlock = () => {
  return (
    <h1
      className="ml-[30px] font-bold bg-gradient-to-r from-[#8B07FF] to-[#FF00DD] text-center bg-clip-text text-transparent text-[40px] max-[768px]:text-[24px]"
      suppressHydrationWarning={true}
    >
      <Link href="/">Ai Aggregator</Link>
    </h1>
  );
};

export default HeaderLeftBlock;
