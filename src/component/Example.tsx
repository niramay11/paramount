import React from 'react';
import { useState } from 'react'

function App() {
  const [number, setNumber] = useState({
    first:0,
    second:0
  })
  
  const handleChange = (e:any) => {
    const {name,value} = e.target
    setNumber((prev) => ({...prev, [name]:value}) )
  }

  const handleSubmit = () => {
    console.log(number.first + number.second)
  }

  return (
    <div >
      <h1>Hello, World!</h1>
      <div>
       <input type="number" name="first" onChange={handleChange} />
       <input  type="number" name="second" onChange={handleChange} />
       <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default App
