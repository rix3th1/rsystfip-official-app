import { signIn } from "next-auth/react";

export const doSignIn = async (body: any) => {
  const response = await signIn("rsystfip-credentials", { ...body });

  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
};
