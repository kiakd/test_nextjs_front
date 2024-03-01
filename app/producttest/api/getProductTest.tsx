import React from 'react'

export default async function GetProductTest() {
  try
  {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`)
    const result = await response.json()
    console.log(result)
    return { data: result, stauts: 200}
  } catch (error)
  {
    return error
  }
}
