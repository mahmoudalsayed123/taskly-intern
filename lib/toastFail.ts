import { toast } from "sonner";

export async function toastFail(message: string) {
  return toast.error(message, {
    position: "top-right",
  });
}
