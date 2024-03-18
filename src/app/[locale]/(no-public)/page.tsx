import authOptions from "@/libs/authOptions";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";

async function IndexPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/ITFIP-Rectory/home");
  }
}

export default IndexPage;
