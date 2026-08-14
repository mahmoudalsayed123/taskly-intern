import Image from "next/image";

interface ShowPasswordProps {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

const ShowPassword = ({ showPassword, setShowPassword }: ShowPasswordProps) => {
  return (
    <button
      type="button"
      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
    >
      {/* {showPassword ? (
        <Image
          src={"/assets/icons/eye-open.svg"}
          alt="eye-open"
          width={22}
          height={15}
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <Image
          src="/assets/icons/eye-close.svg"
          alt="eye-close"
          width={22}
          height={15}
          onClick={() => setShowPassword(true)}
        />
      )} */}
    </button>
  );
};

export default ShowPassword;
