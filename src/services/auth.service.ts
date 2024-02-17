import { signIn, signOut } from "next-auth/react";

export const doSignIn = async (body: any) => {
  const response = await signIn("rsystfip-credentials", {
    ...body,
    redirect: false,
  });

  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
};

export const doSignOut = async () => await signOut({ redirect: false });
