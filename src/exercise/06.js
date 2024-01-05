// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm,PokemonInfoFallback,PokemonDataView,fetchPokemon} from '../pokemon'

class ErrorBoundary extends React.Component{
  state ={error:null}
  static getDerivedStateFromError(error){
    
    return {error}
  }
  render(){
    const {error} =this.state
    if(error){
      return (
        <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
       </div>

      )
      

    }
    return this.props.children

  }
  

}

function PokemonInfo({pokemonName}) {
  const [pokemon,setPokemon] =React.useState('')
  const[error,setError] =React.useState()
  const[status,setStatus]=React.useState('idle')
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  
  
  React.useEffect(()=>{
    if(!pokemonName){
      return
    }
    setPokemon(null)
    setStatus('pending')
    fetchPokemon(pokemonName).then(
      pokemonData => {setPokemon(pokemonData)
      setStatus('resolved')},
      error =>{
        setError(error)
        setStatus('rejected')} ,
      
    
    /*other way to fetch API 
    async function OtherWayToDoThis(){
      const pokemonData = await fetchPokemon(pokemonName)
      setPokemon(pokemonData)
    }
    

    OtherWayToDoThis();
    */
    
  )},[pokemonName])
   
   
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
   if(status==='idle'){
    return 'Submit a pokeman'
   }
   else if(status==='pending'){
    return <PokemonInfoFallback name={pokemonName} />
   }
   else if (status==='rejected'){
    throw error
    }
   else if (status==='resolved'){
    return <PokemonDataView pokemon={pokemon} />
   }
   
   else{
    throw new Error('This is not posiible')
   }
  // 💣 remove this
  
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName}>
           <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
        
      </div>
    </div>
  )
}

export default App
