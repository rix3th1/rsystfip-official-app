import { toast, type ToastOptions } from "react-toastify";

export const notify = (content: string, options: ToastOptions) =>
  toast(content, options);
