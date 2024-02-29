'use client'

import { useState } from 'react'

export default function page() {

    const [file, setFile] = useState<File>()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault()
        if(!File){
            return
        }

        const dataFile: File | null = file as unknown as File

        if (!dataFile)
        {
            return console.log(false)
        }

        const bytes= await dataFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        console.log(buffer)
        const respone = await fetch('http://localhost:8000/api/images', {
            method: "POST",
            body: JSON.stringify({
                "filename": file?.name,
                "bufferImage": buffer
            })
        })
        console.log(respone)
    } 

  return (
    <div className="flex justify-center">
        <form onSubmit={onSubmit}>
        <input type="file" onChange={(e)=> setFile(e.target.files?.[0])} />
        <button type="submit">Submit</button>    
        </form>
    </div>
  )
}
