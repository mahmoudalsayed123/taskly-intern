import { toastFail } from "@/lib/toastFail";
import { toastSuccess } from "@/lib/toastSuccess";
import { acceptInvitation } from "../api/acceptInvitation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

const BtnAcceptInvite = ({ token }: { token: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleAcceptInvitation = async () => {
    setLoading(true);
    const { success, message } = await acceptInvitation({ p_token: token });
    if (success) {
      toastSuccess("Invitation accepted successfully");
      router.push("/project");
    } else {
      toastFail(message || "Failed to accept invitation");
    }
    setLoading(false);
  };

  return (
    <button
      className="btn-primary-mobile btn-primary-desktop lg:gap-4!"
      onClick={handleAcceptInvitation}
      disabled={loading}
    >
      {loading ? <Spinner content="Accepting" /> : "Accept Invitation"}
    </button>
  );
};

export default BtnAcceptInvite;
