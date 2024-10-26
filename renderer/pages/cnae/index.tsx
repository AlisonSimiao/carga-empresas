import { Button, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useResource } from '../../store/hooks/resource';
import { EResource } from '../../typing/resource';

// import { Container } from './styles';

const Cnae: React.FC = () => {
  const { getResource } = useResource()
  const [state, setState] = useState<number>(0)

  const cnae = getResource(EResource.CNAES)

  const download = ()=> {
    
  }

  return (
  <VStack
    bg='blue'
    spacing={5}
  >
    <Heading size={'4xl'}>Cnaes</Heading>

    {
      state === 0 && (
        <Button>iniciar carga</Button>
      )
    } 
  </VStack>
  );
}

export default Cnae;