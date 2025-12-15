
import React ,{ useEffect, useState }from 'react'

export default function StateManage() {
    
    const [data,setData] = useState("Default data")
  
    const [num, setNum] = useState(0)
   
    const updateCurrentData = () =>{
        setData("New data")
    }
  
    useEffect(
        ()=> {
            setData("Initial Data Change")
        },
        [] 
    )
 
    useEffect(
        () => {
            if(data =="binju"){
                setNum(1000)
            }
        },
        [data]
    )

    useEffect(
        ()=>{
            if(num < 0){
                setData("less")
            }else{
                setData("more")
            }
        },
        [num]
    )

    const handleName = (e) => setData(e.target.value)
    return(
        <div>{data}
        <button onClick={updateCurrentData}>Click me</button>
        <button onClick={
            () =>{
                setData("From callback")
            }
        }>Click Callback</button>
        <div>
            {num}
            <button onClick={() => setNum(num + 1)}>+</button>
            <button onClick={() => setNum(num - 1)}>-</button>
        </div>
        <div>
           <input onChange={(e)=> setData(e.target.value)}></input>
           <input onChange={handleName}></input>
        </div>
        </div>
    )
}

