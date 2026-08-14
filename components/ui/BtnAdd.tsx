import Image from "next/image";
import Link from "next/link";

const BtnAdd = ({ path }: { path: string }) => {
  return (
    <Link href={path} className="block lg:hidden fixed bottom-25 right-6">
      <button
        className="h-14 w-14 flex items-center justify-center gap-2 shadow-[0px 4px 6px -4px #0000001A] shadow-[0px 10px 15px -3px #0000001A] rounded-xl cursor-pointer
 "
        style={{
          background: "linear-gradient(99.3deg, #003D9B 0%, #0052CC 100%)",
        }}
      >
        {/* <Image
          src="/assets/icons/plus.svg"
          alt="add"
          width={10.5}
          height={10.5}
        /> */}
      </button>
    </Link>
  );
};

export default BtnAdd;
