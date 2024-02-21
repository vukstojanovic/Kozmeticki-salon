import { Flex } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <Flex align="center" justify="center" minHeight="100vh" bgColor="#F0EFED">
      <motion.img
        src={logo}
        alt="logo"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />
    </Flex>
  );
};

export default Loader;
