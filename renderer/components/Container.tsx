import { Flex, FlexProps } from '@chakra-ui/react'

export const Container = (props: FlexProps) => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="start"
    bg="#a7a7a7ba"
    color="#000"
    padding='5rem 2rem'
    gap={'4rem'}
    _dark={{
      bg: '#181818',
      color: '#fff',
    }}
    height='100vh'
    transition="all 0.15s ease-out"
    {...props}
  />
)
