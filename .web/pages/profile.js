import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Avatar, Box, Button, Center, Divider, Heading, HStack, Image, Input, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, VStack } from "@chakra-ui/react"
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

  const ref_email = useRef(null); refs['ref_email'] = ref_email;
  const ref_physician = useRef(null); refs['ref_physician'] = ref_physician;
  const ref_address = useRef(null); refs['ref_address'] = ref_address;
  const ref_lName = useRef(null); refs['ref_lName'] = ref_lName;
  const ref_age = useRef(null); refs['ref_age'] = ref_age;
  const ref_fName = useRef(null); refs['ref_fName'] = ref_fName;

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
  <Box>
  <Text sx={{"backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text", "fontWeight": "bold", "fontSize": "4em", "textAlign": "center"}}>
  {`Profile`}
</Text>
  <Divider/>
  <HStack sx={{"width": "100%", "padding": "2em"}}>
  <VStack alignItems={`center`} sx={{"width": "100%"}}>
  <VStack>
  <Avatar size={`2xl`} src={`/favicon.ico`}/>
  <Heading sx={{"fontSize": "4em", "paddingBottom": "0.4em", "backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text", "fontWeight": "bold"}}>
  {`Hi, `}
  {state.home_state.form_data["fName"]}
  {`!`}
</Heading>
</VStack>
  <Center>
  <VStack>
  <Text sx={{"fontSize": "2em", "paddingBottom": "0.5em"}}>
  {`Edit Your Profile Information Below`}
</Text>
  <Box as={`form`} onSubmit={(_e0) => addEvents([Event("state.home_state.handle_submit", {form_data:{"physician": getRefValue(ref_physician), "address": getRefValue(ref_address), "lName": getRefValue(ref_lName), "email": getRefValue(ref_email), "age": getRefValue(ref_age), "fName": getRefValue(ref_fName)}})], (_e0))}>
  <VStack>
  <HStack>
  <Center sx={{"alignItems": "center", "width": "50vh"}}>
  <VStack>
  <Text sx={{"fontWeight": "bold", "fontSize": "md", "paddingBottom": "0.9em", "backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text"}}>
  {state.home_state.form_data["fName"]}
</Text>
  <Text sx={{"fontWeight": "bold", "fontSize": "md", "paddingBottom": "0.9em", "backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text"}}>
  {state.home_state.form_data["lName"]}
</Text>
  <Text sx={{"fontWeight": "bold", "fontSize": "md", "paddingBottom": "0.9em", "backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text"}}>
  {state.home_state.form_data["age"]}
</Text>
  <Text sx={{"fontWeight": "bold", "fontSize": "md", "paddingBottom": "0.9em", "backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text"}}>
  {state.home_state.form_data["email"]}
</Text>
  <Text sx={{"fontWeight": "bold", "fontSize": "md", "paddingBottom": "0.9em", "backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text"}}>
  {state.home_state.form_data["address"]}
</Text>
  <Text sx={{"fontWeight": "bold", "fontSize": "md", "paddingBottom": "0.9em", "backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "backgroundClip": "text"}}>
  {state.home_state.form_data["physician"]}
</Text>
</VStack>
</Center>
  <Center>
  <VStack alignItems={`center`} sx={{"width": "25vh"}}>
  <Input id={`fName`} placeholder={`First Name `} ref={ref_fName} type={`text`}/>
  <Input id={`lName`} placeholder={`Last Name `} ref={ref_lName} type={`text`}/>
  <Input id={`age`} placeholder={`Age `} ref={ref_age} type={`text`}/>
  <Input id={`email`} placeholder={`Email Address `} ref={ref_email} type={`text`}/>
  <Input id={`address`} placeholder={`Address `} ref={ref_address} type={`text`}/>
  <Input id={`physician`} placeholder={`Primary Physician Email `} ref={ref_physician} type={`text`}/>
</VStack>
  <Spacer/>
</Center>
</HStack>
  <Button onClick={(_e) => addEvents([Event("state.home_state.alert", {})], (_e))} sx={{"alignItems": "center", "padding": "2em", "bg": "linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", "color": "white", "_hover": {"shadow": "0 4px 60px 0 rgba(0, 0, 0, 0.3), 0 4px 16px 0 rgba(0, 0, 0, 0.3)"}}} type={`submit`}>
  {`Update Information`}
</Button>
</VStack>
</Box>
</VStack>
</Center>
</VStack>
</HStack>
</Box>
</Box>
</Box>
</HStack>
  <NextHead>
  <title>
  {`Profile`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`/profile.png`} property={`og:image`}/>
  <meta content={`width=device-width, shrink-to-fit=no, initial-scale=1`} name={`viewport`}/>
</NextHead>
</Fragment>
  )
}
