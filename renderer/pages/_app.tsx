import { ChakraProvider } from '@chakra-ui/react'

import theme from '../lib/theme'
import { AppProps } from 'next/app'
import { Container } from '../components/Container'
import { ResourceProvider } from '../store/contexts/resource'
import { setupDatabase } from '../services/database/local'

function MyApp({ Component, pageProps }: AppProps) {
 
  return (
    <ChakraProvider theme={theme}>
      <Container>
        <ResourceProvider>
          <Component {...pageProps} />
        </ResourceProvider>
      </Container>
    </ChakraProvider>
  )
}

export default MyApp
