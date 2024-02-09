import { signIn } from "next-auth/react";

export const auth = async (body: any) => {
  const response = await signIn("rsystfip-credentials", {
    ...body,
    redirect: false,
  });

  if (response?.error) {
    throw new Error(response.error);
  }
};
