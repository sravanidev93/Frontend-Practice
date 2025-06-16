import { arrowFunction } from "./Practice"
import Practice from "./Practice"
import Student from "./Student"
import Wonders from "./Wonders";
import UsersData from "./SpreadOperator";
import ShowHideName from "./ConRen";

export default function App(){

  const STUDENT_INFO  ={
    name:"D Sravani",
    id:"86",
    group:"BCA"
  }

  const wonders=["Great Wall of China","Petra","Christ the Redeemer","Machu Picchu","Chichen Itza","Roman Colosseum","Taj Mahal"
  ];
  
  return(
    <>
        {/* <h1 className="w-fit h-[100px] font-semibold text-lg mx-auto p-10 shadow-lg underline text-yellow-500 ">I am inside App Component</h1> */}
        {/* {arrowFunction()}
        <Practice/>
        <Student data={STUDENT_INFO}/>
        <Wonders data={wonders}/> */}
        {/* <UsersData/> */}
        <ShowHideName/>
    </>
  )
}