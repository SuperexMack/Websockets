import { useEffect, useState } from 'react'
import io from "socket.io-client"
import './App.css'

function App() {

  
  const [score , setScore ] = useState("")
  const [scores , setAllScores ] = useState([])

  const socket = io("localhost:8000")


  const handleInput = (event)=>{
    let {name , value} = event.target
    console.log({[name] : value})
    let currentObj = {[name] : value}
    setScore((prev ) => ({...prev , ...currentObj}))
  }

  console.log(score)

  const  SendScore = ()=>{
    socket.emit("score" , score)
    socket.on("playerScore" , (playerScore)=>{
      setAllScores(playerScore)
    })
  }

  
  return (
   <>
   <h1 className='Heading'>Number App</h1>
   <div className='FormData'>
    <input name='name' onChange={handleInput} placeholder='Enter your name'></input>
    <input name='score' onChange={handleInput} placeholder='Enter your score'></input>
    <button onClick={SendScore} className='Button'>Sumit</button>
   </div>

   <div>
    {scores && scores.length>0?(
    <table>
    <thead>
  <tr>
    <th>Name</th>
    <th>Scores</th>
    <th>UserId</th>
  </tr>
  </thead>
  <tbody>
  {scores.map((sco,index)=>(
   <tr key={index}>
    <td>{sco.name}</td>
    <td>{sco.score}</td>
    <td>{sco.id}</td>
  </tr>
  ))}
  
  </tbody>
</table> ): null}
   </div>
   </>
  )
}

export default App
