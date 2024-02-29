'use server'
import { redirect } from "next/navigation"
export async function RedirectCustomer(path:string){
    redirect(path)
}