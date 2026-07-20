import { toast } from "sonner";

export async function toastSuccess(message: string) {
  return toast.success(message, {
    position: "top-right",
  });
}
