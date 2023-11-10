import { Box, Img } from "@chakra-ui/react"
import Logo from '../src/assets/logo.png'


export default function Navbar() {
    return (
        <Box bgColor={'#B83280'} h={'150px'} px={{ base: "10px", md: '10px', lg: "200px" }} bgGradient='linear(to-b, #b83280, #fed7e2)'>
            <Img src={Logo} alt='logo' h={'full'} bgGradient='linear(to-b, #b83280, #fed7e2)' />
        </Box>
    )
}
