// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useSyncState(key1,defaultValue='',{
  serialize =  JSON.stringify,
  deserialize = JSON.parse,

}={}){   //custom hook
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = React.useState(() => deserialize(window.localStorage.getItem('key1')) || defaultValue)//Lazy loading callback

  
  const prevKeyRef = React.useRef(key1)
  React.useEffect (()=>{
    const prevKey = prevKeyRef.current
    if( prevKey !==key1){
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current=key1
   window.localStorage.setItem(key1, serialize(state))},[key1, serialize, state]
  )
  return[state,setState]
}

function Greeting({initialName = ''}) {
 const [name,setName]= useSyncState('name3',initialName)
  //const[name,setName]= React.useState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName='default' />
}

export default App
