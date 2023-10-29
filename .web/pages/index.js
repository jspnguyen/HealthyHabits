import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Heading, Input, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextLink from "next/link"
import NextHead from "next/head"



export default function Component() {
  const state = useContext(StateContext)
  const router = useRouter()
  const [ colorMode, toggleColorMode ] = useContext(ColorModeContext)
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents())
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <Box sx={{"h": "100vh", "pt": 16, "background": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"}}>
  <Box sx={{"width": "100vh", "maxWidth": "100vh", "bg": "white", "h": "100%", "px": [4, 12], "margin": "0 auto", "position": "relative", "borderTopRadius": "lg", "boxShadow": "0 4px 60px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08)", "display": "flex", "flexDirection": "column", "alignItems": "center", "py": 12, "gap": 4}}>
  <Heading sx={{"display": "flex", "flexDirection": "column", "alignItems": "center", "textAlign": "center"}}>
  <Text sx={{"backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text", "fontWeight": "bold", "fontSize": "3.5em"}}>
  {`Healthy Habits`}
</Text>
  <Text as={`span`}>
  {`The Help You Always Needed`}
</Text>
</Heading>
  <Text sx={{"color": "gray.500", "fontWeight": "medium"}}>
  {`Sign in or sign up to get started`}
</Text>
  <Box sx={{"display": "flex", "flexDirection": "column", "alignItems": "center", "bg": "white", "border": "1px solid #eaeaea", "p": 4, "width": "500px", "borderRadius": "lg"}}>
  <Input onBlur={(_e0) => addEvents([Event("state.auth_state.set_username", {value:_e0.target.value})], (_e0))} placeholder={`Username`} sx={{"mb": 4}} type={`text`}/>
  <Input onBlur={(_e0) => addEvents([Event("state.auth_state.set_password", {value:_e0.target.value})], (_e0))} placeholder={`Password`} sx={{"mb": 4}} type={`password`}/>
  <Button onClick={(_e) => addEvents([Event("state.auth_state.login", {})], (_e))} sx={{"bg": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "color": "white", "_hover": {"shadow": "0 4px 60px 0 rgba(0, 0, 0, 0.3), 0 4px 16px 0 rgba(0, 0, 0, 0.3)"}}}>
  {`Log in`}
</Button>
</Box>
  <Text sx={{"color": "gray.600"}}>
  {`Don't have an account yet? `}
  <Link as={NextLink} href={`/signup`} sx={{"color": "blue.500"}}>
  {`Sign up here.`}
</Link>
</Text>
</Box>
</Box>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
