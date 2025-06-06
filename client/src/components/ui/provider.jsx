// removed defaultSystem from @chakra-ui.react
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

export function Provider(props) {
  return (
    // value={defaultSystem} removed from inside chakraprovider
    <ChakraProvider>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}