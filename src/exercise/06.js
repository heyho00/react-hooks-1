// useEffect: HTTP requests
// 💯 use a status
// http://localhost:3000/isolated/final/06.extra-2.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({ pokemonName }) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const { status, pokemon, error } = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setStatus('pending')
    fetchPokemon(pokemonName).then(
      pokemon => {
        setStatus({ status: 'resolved', pokemon })
      },
      error => {
        setStatus({ status: 'rejected', error })
      },
    )
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    return (
      <div>
        There was an error:{' '}
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    )
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
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


// 여러 상태 업데이터를 연속으로 호출하고 있음.

// 이는 일반적으로 문제가 되지 않지만 상태 업데이트 프로그램을 호출할 때마다 구성 요소가 다시 렌더링될 수 있다.

// React는 일반적으로 이러한 호출을 일괄 처리하므로 단일 재렌더링만 얻을 수 있지만 비동기 콜백(Promise 성공 및 오류 핸들러)에서는 이를 수행할 수 없다.

// 그래서 원래는 

// setStatus('resolved')

// setPokemon(pokemon)

// 이런식으로 작성하게 되면 에러났었음.

// React 18에서는 비동기 콜백에 대한 자동 일괄 처리도 지원하므로 더 이상 그렇지 않다.

// 그래도 개별 useState 후크를 사용하여 상태를 유지하는 것보다 밀접하게 관련된 상태를 객체로 유지하는 것이 좋다.

