'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import { DeleteCustomerById } from "./api/customerAPI"

export default function RemoveBtn({ id }) {
  const router = useRouter()
  const csrf = async () => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`)
  const removeData = async () => {
      await csrf()
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/${id}`).then(response=>{
          router.refresh()
      })
  }

  return (
    <Button className="w-full text-center" onClick={removeData}>Delete</Button>
  )
}
