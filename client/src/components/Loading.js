import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

function Loading() {
  return (
    <Flex align="center" justify="center">
      <Spinner size="xl" speed="0.8s" color="gray.500" />
    </Flex>
  )
}

export default Loading
