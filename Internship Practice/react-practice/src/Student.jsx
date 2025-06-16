import React from "react"
export default function Student({data}){
    return(
        <div className="m-auto p-10 w-fit h-fit border gap-6 bg-slate-500 text-white  text-lg font-bold rounded-lg" >
        <h3>Student Information</h3>
         <p>{data.name}</p> 
        <p>{data.id}</p>
        <p>{data.group}</p> 

        </div>

    )


}