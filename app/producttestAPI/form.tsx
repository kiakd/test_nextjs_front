'use client'

import { useEffect, useState } from "react"

export default function Form({items}: any)
{
    const [productState, setProductState] = useState([])
    const [pageState, setPageState] = useState({
        page: 1
    })
    const [search, SetSearch] = useState('')
    useEffect(()=>{
        setProductState(items.data)
    }, [])

    const handelOnClick = async () =>{
        const page : number = pageState.page + 1
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/producttest?search=${search}&page=${page}`)
        const result = await response.json()
        setProductState(result.data)
        setPageState({page})
    }
    const handelOnBack = async () =>{
        const page : number = pageState.page - 1
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/producttest?search=${search}&page=${page}`)
        const result = await response.json()
        setProductState(result.data)
        setPageState({page})
    }

    const searchInput = async (event) => {
        const searchstring = event.target.value
        const page : number = 1
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/producttest?search=${searchstring}&page=${page}`)
        const result = await response.json()
        setProductState(result.data)
        setPageState({page})
        SetSearch(searchstring)
    }
    console.log(items)
    return (
        <div>
            <div>
                <input type="text" onChange={searchInput} />
            </div>
            <div>
                {
                    productState.map((item:any)=>{
                        return <div key={item.id}><div>{item.name}</div><div className="border">{item.pathFileName}</div></div>
                    })
                }
            </div>
           <button className="btn btn-success" onClick={handelOnBack} >Click Back</button>
           <button className="btn btn-success" onClick={handelOnClick} >Click Next</button>
        </div>
    )
}