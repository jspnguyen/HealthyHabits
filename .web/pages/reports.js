import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Center, Divider, HStack, Image, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, VStack } from "@chakra-ui/react"
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
  <HStack>
  <Box sx={{"display": ["none", "none", "block"], "minWidth": "20em", "height": "100%", "position": "sticky", "top": "0px", "borderRight": "1px solid #F4F3F6"}}>
  <VStack sx={{"height": "100dvh"}}>
  <HStack sx={{"width": "100%", "borderBottom": "1px solid #F4F3F6", "padding": "1em"}}>
  <Text sx={{"backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text", "fontWeight": "bold", "fontSize": "2em"}}>
  {`Healthy Habits`}
</Text>
  <Spacer/>
  <Link as={NextLink} href={`/home`}>
  <Center sx={{"boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "bg": "transparent", "borderRadius": "0.375rem", "_hover": {"bg": "#F5EFFE"}}}>
  <Image src={`/logo.png`} sx={{"height": "3em", "padding": "0.5em"}}/>
</Center>
</Link>
</HStack>
  <VStack alignItems={`flex-start`} sx={{"width": "100%", "overflowY": "auto", "padding": "1em"}}>
  <Link as={NextLink} href={`/home`} sx={{"width": "100%"}}>
  <HStack sx={{"bg": isTrue((state.router.page.path === "/home") || (((state.router.page.path === "/") && "Home") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/home") || (((state.router.page.path === "/") && "Home") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/home.png`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`Home`}
</Text>
</HStack>
</Link>
  <Link as={NextLink} href={`/profile`} sx={{"width": "100%"}}>
  <HStack sx={{"bg": isTrue((state.router.page.path === "/profile") || (((state.router.page.path === "/") && "Profile") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/profile") || (((state.router.page.path === "/") && "Profile") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/profile.png`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`Profile`}
</Text>
</HStack>
</Link>
  <Link as={NextLink} href={`/reports`} sx={{"width": "100%"}}>
  <HStack sx={{"bg": isTrue((state.router.page.path === "/reports") || (((state.router.page.path === "/") && "Reports") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/reports") || (((state.router.page.path === "/") && "Reports") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/reports.png`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`Reports`}
</Text>
</HStack>
</Link>
</VStack>
  <Button onClick={toggleColorMode} sx={{"bg": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "color": "white", "_hover": {"shadow": "0 4px 60px 0 rgba(0, 0, 0, 0.3), 0 4px 16px 0 rgba(0, 0, 0, 0.3)"}}}>
  {`Toggle Dark/Light Mode`}
</Button>
  <Button onClick={(_e) => addEvents([Event("state.logout", {})], (_e))} sx={{"bg": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "color": "white", "_hover": {"shadow": "0 4px 60px 0 rgba(0, 0, 0, 0.3), 0 4px 16px 0 rgba(0, 0, 0, 0.3)"}}}>
  {`Sign out`}
</Button>
  <Spacer/>
</VStack>
</Box>
  <Box sx={{"paddingTop": "3em", "paddingRight": "2em", "paddingLeft": "2em", "width": "75%"}}>
  <Box sx={{"width": "107%", "height": "100vh", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "borderRadius": "0.375rem", "padding": "2em", "marginBottom": "2em"}}>
  <VStack>
  <Text sx={{"backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text", "fontWeight": "bold", "fontSize": "4em", "textAlign": "center"}}>
  {`Reports`}
</Text>
  <Divider/>
  {state.home_state.sessions.map((zmvfkfdk, i) => (
  <Box key={i}>
  <HStack>
  <Text sx={{"fontSize": "0.8em", "backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text", "textAlign": "center", "fontWeight": "bold", "width": "20vh"}}>
  {`Most Common Emotion: ${zmvfkfdk["max_emotion"]}`}
</Text>
  <Text sx={{"fontSize": "0.8em", "backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text", "textAlign": "center", "fontWeight": "bold", "width": "20vh"}}>
  {`Start of Session: ${zmvfkfdk["start_time"]}`}
</Text>
  <Text sx={{"fontSize": "0.8em", "backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text", "textAlign": "center", "fontWeight": "bold", "width": "20vh"}}>
  {`End of Session: ${zmvfkfdk["end_time"]}`}
</Text>
  <Button onClick={(_e) => addEvents([Event("state.home_state.email", {Temail:state.home_state.form_data["email"],bodyText:zmvfkfdk})], (_e))} sx={{"bg": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "color": "white", "_hover": {"shadow": "0 4px 60px 0 rgba(0, 0, 0, 0.3), 0 4px 16px 0 rgba(0, 0, 0, 0.3)"}, "width": "25vh"}}>
  {`Email Raw Data to Self`}
</Button>
  <Button onClick={(_e) => addEvents([Event("state.home_state.emailFull", {Temail:state.home_state.form_data["email"],bodyText:zmvfkfdk})], (_e))} sx={{"bg": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "color": "white", "_hover": {"shadow": "0 4px 60px 0 rgba(0, 0, 0, 0.3), 0 4px 16px 0 rgba(0, 0, 0, 0.3)"}, "width": "25vh"}}>
  {`Email Report to Self`}
</Button>
</HStack>
</Box>
))}
</VStack>
</Box>
</Box>
</HStack>
  <NextHead>
  <title>
  {`Reports`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`/reports.png`} property={`og:image`}/>
  <meta content={`width=device-width, shrink-to-fit=no, initial-scale=1`} name={`viewport`}/>
</NextHead>
</Fragment>
  )
}
