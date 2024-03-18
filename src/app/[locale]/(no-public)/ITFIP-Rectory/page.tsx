import { redirect } from "next/navigation";

export default function PreventNotFound() {
  redirect("/ITFIP-Rectory/home");
}
