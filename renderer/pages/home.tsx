import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Select, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { EResource } from '../typing/resource'
import { useResource } from '../store/hooks/resource'

export default function HomePage() {
const router = useRouter()
  const [state, setState] = useState(0)
  const [error, setError] = useState('')
  const { setResource, data } = useResource()

  function handleWork(ev){
    const resourceName = ev.target.value
    
    router.push(`/resource/${resourceName}`)
  }

  useEffect(() => {
    const _fetch = async () => {
      return fetch('/api/loadlinks')
    }

    _fetch().then(
      async (res) => {
        const links = await res.json()
        setResource(links)
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
      <Select onInput={handleWork} defaultValue={'DEFAULT'}>
        <option value="DEFAULT" disabled>Recursos</option>
      {
        Object.entries(data).map(([key, value]) => {
          return (
            <option key={key} value={key}>
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
