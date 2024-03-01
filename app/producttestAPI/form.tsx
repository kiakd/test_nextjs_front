'use client'

import { useEffect, useState } from "react"

export default function Form({items}: any)
{
    const [productState, setProductState] = useState([])
    const [pageState, setPageState] = useState({
        page: 1
    })
    useEffect(()=>{
        setProductState(items.data)
    }, [])

    const handelOnClick = async () =>{
        const page : number = pageState.page + 1
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/producttest?page=${page}`)
        const result = await response.json()
        setProductState(result.data)
        setPageState({page})
    }
    const handelOnBack = async () =>{
        const page : number = pageState.page - 1
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/producttest?page=${page}`)
        const result = await response.json()
        setProductState(result.data)
        setPageState({page})
    }

    const searchInput = async (event) => {
        console.log(event.target.value)
    }
    return (
        <div>
            <div>
                <input type="text" onChange={searchInput} />
            </div>
            <div>
                {
                    productState.map((item:any)=>{
                        return <div key={item.id}>{item.name}</div>
                    })
                }
            </div>
           <button className="btn btn-success" onClick={handelOnBack} >Click Back</button>
           <button className="btn btn-success" onClick={handelOnClick} >Click Next</button>
        </div>
    )
}