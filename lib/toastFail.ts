import { toast } from "sonner";

export function toastFail(message: string) {
  return toast.error(message, {
    position: "top-right",
  });
}
