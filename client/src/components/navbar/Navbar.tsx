import { Box, Img } from "@chakra-ui/react";
import Logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <Box h={"150px"} px={{ base: "10px", md: "10px", lg: "200px" }}>
      <Img src={Logo} alt="logo" h={"full"} />
    </Box>
  );
}
