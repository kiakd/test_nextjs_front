import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import RemoveBtn from "./removeBtn"
import axios from "axios"

export default async function Page() {
  let result: any
  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`).then(res => {
    result = res.data.data
  })
  return (
    <div>
      <div className="flex justify-center">
        <button className="btn btn-success">
        <Link href={`/products/add`}>
          Clik Me Add
        </Link>
        </button>
        
      </div>
      <table className="table m-auto w-96 border border-separate mt-2">
        <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Image</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {
            result.map((item, index) => (
              < tr key = { item.id } >
                <td className="text-center">{item.name}</td>
                <td className="text-center">
                  <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.pathFileName}`} alt="img" width={100} height={100} />
                </td>
                <td>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded-xl">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-10 bg-base-100">
                      <DropdownMenuLabel className="text-center bg-warning text-black">Action</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link href={`/products/${item.id}/view`} className="w-full text-center">View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/products/${item.id}`} className="w-full text-center">Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RemoveBtn id={item.id} />
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
        ))
          }
      </tbody>
      <tfoot>

      </tfoot>
    </table>
    </div >
  )
}
