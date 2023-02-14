// useEffect: HTTP requests
// http://localhost:3000/isolated/final/06.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setPokemon(null)
    fetchPokemon(pokemonName)
      // .then(pokemon => setPokemon(pokemon))  두가지 방법으로 에러를 처리할 수 있다.
      .then(pokemon => setPokemon(pokemon), error => console.log(error))
      .catch(error => console.log(error))
  }, [pokemonName])

  // 이들은 기능적으로는 우리의 목적과 동일하지만 일반적으로 의미상 다르다.

  //.catch를 사용하면 fetchPokemon Promise의 오류를 처리하지만
  // setPokemon(pokemon) 호출의 오류도 처리하게 됩니다. 이는 Promise가 작동하는 방식의 의미 때문.

  // .then에 두 번째 인수를 사용하면 fetchPokemon에서만 발생하는 오류를 잡을 수 있다.
  // 이 경우 setPokemon을 호출해도 오류가 발생하지 않는다는 것을 알았기 때문에(React는 오류를 처리하고 나중에 사용할 오류를 포착하는 API가 있습니다) 
  // 두 번째 인수 옵션을 사용하기로 결정했다.
  // 그러나 이 상황에서는 실제로 큰 차이가 없다. 안전한 옵션을 사용하려면.catch를 선택하십시오.

  if (!pokemonName) {
    return 'Submit a pokemon'
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={pokemon} />
  }
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
