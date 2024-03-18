import type { IUser } from "@/interfaces";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: IUser["id"];
      first_name: IUser["first_name"];
      last_name: IUser["last_name"];
      gender: IUser["gender"];
      email: IUser["email"];
      role_name: IUser["role_name"];
      permissions: IUser["permissions"];
    };
  }
}
