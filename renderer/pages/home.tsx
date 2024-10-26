import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Select, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { EResource } from '../typing/resource'

export default function HomePage() {
const router = useRouter()
  const [state, setState] = useState(0)
  const [data, setData] = useState({})
  const [error, setError] = useState('')

  function handleWork(ev){
    const value = ev.target.value

    const path = {
      [EResource.CNAES]: '/cnae'
    }[value] || '/not-found-resource'

    path && router.push(path)
  }

  useEffect(() =>{
    const _fetch = async () => {
      return fetch('/api/loadlinks')
    }

    _fetch().then(
      async (res) => {
        const links = await res.json()
        setData(links)
        setError(null)
        setState(1)
      } 
    )
    .catch((e) => (console.log(e), setState(0), setError(e.message)))
  }, [])

  if(state === 0) 
    return <div>Carregando.</div>

  return (
    <React.Fragment>
      <Head>
        <title>Carga de Dados</title>
      </Head>

    <div>escolha um recurso</div>

    <Text>{error}</Text>

    {
      !error && 
      <Select onInput={handleWork}>
        <option value="" disabled selected>Recursos</option>
      {
        Object.entries(data).map(([key, value]) => {
          return (
            <option value={key}>
              {key}
            </option>
          )
        })
      }
    </Select>
    }
    </React.Fragment>
  )
}
