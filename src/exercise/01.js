// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({name}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [state,setState] = React.useState(name)

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setState(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input  onChange={handleChange} id="name" />
      </form>
      {{state} ? <strong>Hello {state}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting name='Viiiii'/>
}

export default App
