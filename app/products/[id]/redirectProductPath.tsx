'use server'
import { redirect } from "next/navigation"
export async function RedirectProductPath(path: string) {
  redirect(path)
}
