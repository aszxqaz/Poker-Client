import { extendTheme } from '@chakra-ui/react'
import { Button, Input, FormErrorMessage, Link, Tab, Text } from './components'

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        fontFamily: 'Poppins',
        fontSize: 'clamp(0.6rem, 1vw + 0.4rem, 1rem)',
        overflow: 'hidden'
      },
    },
  },
  components: {
    Button,
    Input,
    FormErrorMessage,
    Link,
    Tab,
    Text,
    TabPanel: {
      baseStyle: {
        padding: 0
      }
    }
  }
})

export default theme

