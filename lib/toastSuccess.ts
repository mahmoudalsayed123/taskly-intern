import { toast } from "sonner";

export function toastSuccess(message: string) {
  return toast.success(message, {
    position: "top-right",
  });
}
