"use server";
import { cookies } from "next/headers";

const getrole = async () => {
  const cookieStore = await cookies(); // Await cookies() properly
  const userRoleCookie = await cookieStore.get("userRole"); // Await the cookie get operation
  return userRoleCookie?.value || "freelancer"; // Return the value or fallback to "freelancer"
};

export default getrole;
