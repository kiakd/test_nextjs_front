'use client'

import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react"
import * as XLSX from 'xlsx';
import ReactPDF from '@react-pdf/renderer';
import { MyDocument } from './pdf/report1'


export default function Form({ items }: any) {
    const [productState, setProductState] = useState([])
    const [pageState, setPageState] = useState({
        page: 1
    })
    const [search, SetSearch] = useState('')
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setProductState(items.data)
        setIsClient(true)
    }, [])

    const handelOnClick = async () => {
        const page: number = pageState.page + 1
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/producttest?search=${search}&page=${page}`)
        const result = await response.json()
        setProductState(result.data)
        setPageState({ page })
    }
    const handelOnBack = async () => {
        const page: number = pageState.page - 1
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/producttest?search=${search}&page=${page}`)
        const result = await response.json()
        setProductState(result.data)
        setPageState({ page })
    }

    const searchInput = async (event) => {
        const searchstring = event.target.value
        const page: number = 1
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/producttest?search=${searchstring}&page=${page}`)
        const result = await response.json()
        setProductState(result.data)
        setPageState({ page })
        SetSearch(searchstring)
    }
    //export data csv
    const exportCsv = () => {
        const worksheet = XLSX.utils.json_to_sheet(productState);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    }

    return (
        <div>
            <div>
                <input type="text" onChange={searchInput} />
            </div>
            <div>
                {
                    productState.map((item: any) => {
                        return <div key={item.id}><div>{item.name}</div><div className="border">{item.pathFileName}</div></div>
                    })
                }
            </div>
            <button className="btn btn-success" onClick={handelOnBack} >Click Back</button>
            <button className="btn btn-success" onClick={handelOnClick} >Click Next</button>
            <div>
                <button className="btn btn-warning" onClick={exportCsv} >Export CSV</button>
                {
                    isClient ?
                
                    <PDFDownloadLink document={<MyDocument data={productState} />} fileName="somename.pdf" className="btn btn-secondary">
                        Download now!
                    </PDFDownloadLink>
                    : null
                }
            </div>
        </div>
    )
}