
import { useEffect, useState } from 'react';
export default function ShowHideName() {

    const NAME = 'SRAVANI';
    const [show, setShow] = useState(true);


    return (
        <div className='mx-auto my-16 w-[300px] h-[250px] border-2 rounded-md  p-14 bg-[rgb(233,123,222)]  text-lg font-serif font-bold 
        shadow-[#cf12a4] shadow-lg'>
            {show ? (<div className='flex flex-col items-center justify-center gap-4 text-[#ac12c4]'><h1>{NAME}</h1>
                <button className='px-4 py-2 bg-[#23edcb] border rounded-md' onClick={()=>setShow(!show)}>Hide Name</button>
            </div>
            ) : (
                <div className='flex flex-col items-center justify-center gap-4 text-[#ac12c4]'>
                    <h1 >Name was hidden</h1>
                    <button className='px-4 py-2 bg-[#23edcb] border rounded-md' onClick={()=>setShow(!show)}>Show Name</button>

                </div>
            )}


        </div>



    )
}