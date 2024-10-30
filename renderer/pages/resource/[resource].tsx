import { Button, CircularProgress, CircularProgressLabel, Heading, HStack, Input, Progress, ProgressLabel, Select, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useResource } from '../../store/hooks/resource';
import { EProcessState, EResource } from '../../typing/resource';
import axios, { AxiosProgressEvent, AxiosResponse } from 'axios';
import { calculateSize, getColorDownload } from '../../utils/fn';
import { useRouter } from 'next/router';

const createSignal = () => new AbortController()


const resourceLinks: React.FC = () => {
  const { getResource } = useResource()
  const [state, setState] = useState<number>(EProcessState.INITIAL)
  const [progress, setProgress] = useState<number>(0)
  const [fileSize, setFileSize] = useState<number>(0)
  const [resolving, setResolving] = useState<string>("")
  const [error, setError] = useState<string>("")
  let currentUrl
  const controllerDownload =  createSignal()
  const router = useRouter()
  const { resource } = router.query as { resource: EResource.CNAES }

  const resourceLinks = getResource(resource)

  function onEventData(){
    selectUrl()
  }

  function handleUrl(evt){
    currentUrl = evt.target.value
  }

  function selectUrl() { 
    setState(EProcessState.SELECTING_URL)
    if(resourceLinks?.length === 1){
      currentUrl = resourceLinks[0]
      download()
    }
  }

  async function extract(response: AxiosResponse<any, any>) {
    
    await window.electron.doThing(response.data, resource)
    
  }

  const download = async () => {
     
    if(!currentUrl){
      setState(EProcessState.SELECTING_URL)
      setError('selecione um dos rescursos corretamente')
      setResolving("")
      return
    }

    setState(EProcessState.DOWNLOADING)
    setResolving('Downloading')

    try{
      const response = await axios({
          url: '/api/download?url='+currentUrl,
          method: 'GET',
          responseType: 'arraybuffer',
          onDownloadProgress: (evt: AxiosProgressEvent)=>{
            const progress = Math.round((evt.loaded * 100) / evt.total);

            setFileSize(evt.total)
            setProgress(+progress.toPrecision(3))
          },
          signal: controllerDownload.signal
        }
      );
      
      await extract(response)
    }
    catch(e){
      console.log(e)
      setState(0)
      setError(e.message)
      setResolving("")
    };

  }
  
  return (
  <VStack
    spacing={5}
    alignContent={'center'}
  >
    <Heading size={'2xl'}>{resource}</Heading>

    {
      state === 0 && (
        <Button onClick={onEventData}>iniciar carga</Button>
      )
    } 
    
    <Text>{resolving}</Text>

    {
      state === EProcessState.SELECTING_URL && (
        <VStack>
          <Select onInput={handleUrl} defaultValue={'DEFAULT'}>
        <option value='DEFAULT' disabled>selecione qual dado baixar</option>
      {
        resourceLinks?.map((url, index) => {
          return (
            <option key={resource + index} value={url}>
              {resource + index}
            </option>
          )
        })
      }
    </Select>
    <Button
    colorScheme='green'
    onClick={download}
    >Download</Button>
        </VStack>
      )
    }

    {
      state === EProcessState.DOWNLOADING && (
        <VStack>
          <CircularProgress value={progress} size={200} color={getColorDownload(progress)}>
             <CircularProgressLabel >{progress.toPrecision(3)}%</CircularProgressLabel>
          </CircularProgress>
          
          <Text>{calculateSize(fileSize)}</Text>
        </VStack>
      )
    }

    {
      error && <HStack
      justifySelf={'end'}
      boxShadow={'dark-lg'}
      paddingInline={'1.5'}
    >
      <Text
        fontSize={'2xl'}
        color={'red.600'}
      >{error}</Text>
    </HStack>
    }

    <Button
      pos={'absolute'}
      top={'5'}
      left={'5'}

      onClick={()=>{
        controllerDownload.abort()
        router.back()
      }}
    >Undo</Button>
  </VStack>
  );
}

export default resourceLinks;
