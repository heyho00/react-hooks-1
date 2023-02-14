// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import { useEffect } from 'react'

function Greeting({ initialName = '' }) {

  const [name, setName] = React.useState(() =>
    window.localStorage.getItem('name') ?? initialName
  )

  // const [name, setName] = useState(()=> initialData())
  //const [name, setName] = useState(initialData) 동일

  // function initialData(){
  //   return window.localStorage.getItem('name') ?? initialName
  // }
  // 이런 함수 만들어서 넣어도 됨.
  // useState에 값대신 콜백함수를 줬다. 
  // local storage에서 데이터 가져오는게 느릴 수 있어 병목을 방지하기 위해,
  // 렌더시마다 초기값 반환하는 함수가 불필요하게 계속 실행되는걸 막는다.
  // 리렌더가 되더라도 초기 useState에 전달된 함수는 재실행되지 않는다.

  // 하나의 handler에서 setState를 두 번 호출할때의 문제.
  // 마지막 setState만 동작하는데 콜백으로 넣어주면 순서대로 실행됨.
  // https://velog.io/@hinyc/React-useState-Callback


  useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])


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
  return <Greeting />
}

export default App
