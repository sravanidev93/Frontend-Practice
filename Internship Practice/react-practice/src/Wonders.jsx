
export default function Wonders({data}){
    return (
        <div className="p-10 my-5 mx-auto h-fit shadow-lg w-fit border font-bold text-lg  ">
            <h1>7 WONDERS of the WORLD</h1>
            <ul className="list-decimal">
            {data.map((item,ind)=>{
               return (
                    <li key={ind}>{item}</li>
                )
            })}
            </ul>
        </div>
    )
}