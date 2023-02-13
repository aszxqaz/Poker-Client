import { Button, ChakraProvider, ColorModeScript, Fade, Portal } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import theme from './chakra/theme'
import { SocketContextProvider, TablesProvider, TabsContextProvider, UserContextProvider } from './contexts'
import { ModalOverlayProvider } from './contexts/ModalOverlay/ModalOverlay'
import { SignInRedirect } from './routing/SignInRedirect'
import { SignIn, SignUp } from './scenes'
import { TableHistory } from './scenes/History/History'
import { Main } from './scenes/Home/Main'
import { NewTable } from './scenes/NewTable/NewTable'
import { TourneyInfo } from './scenes/TourneyInfo/TourneyInfo'

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

function App() {
  const [isInstallShowed, setIsInstallShowed] = useState(false)
  const eventRef = useRef<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    window.addEventListener<'beforeinstallprompt'>('beforeinstallprompt', event => {
      event.preventDefault()
      eventRef.current = event
      setIsInstallShowed(true)
    })
  }, [])

  const installClickHandler = async () => {
    if (!eventRef.current) return
    eventRef.current.prompt()
    const result = await eventRef.current.userChoice
    eventRef.current = null
    setIsInstallShowed(false)
  }

  return (
    <ComposedProviders>
      {false ? <Button onClick={installClickHandler}>Install App</Button> : null}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <TabsContextProvider>
                <UserContextProvider>
                  <TablesProvider>
                    <ModalOverlayProvider>
                      <Outlet />
                    </ModalOverlayProvider>
                  </TablesProvider>
                </UserContextProvider>
              </TabsContextProvider>
            }
          >
            <Route
              path="/history"
              element={
                <SignInRedirect when="out" to="/signin">
                  <TableHistory />
                </SignInRedirect>
              }
            />
            <Route
              path="/newtable"
              element={
                <SignInRedirect when="out" to="/signin">
                  {/* <NewTable /> */}
                  <></>
                </SignInRedirect>
              }
            />
            <Route
              path="/tournament"
              element={
                <SignInRedirect when="out" to="/signin">
                  <SocketContextProvider>{/* <TourneyInfo /> */}</SocketContextProvider>
                </SignInRedirect>
              }
            />
            <Route
              index
              element={
                <SignInRedirect when="out" to="/signin">
                  <SocketContextProvider>
                    <Main />
                  </SocketContextProvider>
                </SignInRedirect>
              }
            />
            <Route
              path="/signup"
              element={
                <SignInRedirect when="in" to="/">
                  <SignUp />
                </SignInRedirect>
              }
            />
            <Route
              path="/signin"
              element={
                <SignInRedirect when="in" to="/">
                  <SignIn />
                </SignInRedirect>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ComposedProviders>
  )
}

const ComposedProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
