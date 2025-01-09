import {
  Divider,
  HStack,
  Text,
  Box,
  Icon,
  Stack,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const items = ["O Nama", "Usluge", "Kontakt"];

interface LinksProps {
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleLinkClick: (index: number, elementId: string) => void;
}

const Links = ({
  selectedIndex,
  setSelectedIndex,
  handleLinkClick,
}: LinksProps) => {
  return (
    <HStack className="links" spacing="50px" width="100%" pl={5}>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Text
          as="a"
          href="tel:+381613931281"
          fontSize="18px"
          color="black"
          alignSelf="end"
          mr={5}
          textColor="blue"
        >
          +381 61 3931 281
        </Text>
        <Stack direction="row" p={2} justifyContent="space-between">
          <HStack>
            {items.map((item, index) => {
              const elementId = item.toLowerCase().replace(/\s+/g, "-");
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.5,
                  }}
                >
                  <Text
                    as="button"
                    style={{
                      fontSize: "20px",
                      marginLeft: "20px",
                    }}
                    onClick={() => handleLinkClick(index, elementId)}
                  >
                    {item}
                  </Text>
                </motion.div>
              );
            })}
          </HStack>
          <HStack mr={2}>
            <Center height="35px">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              >
                <Divider orientation="vertical" borderColor="blue" />
              </motion.div>
            </Center>

            <Link
              to="https://www.instagram.com/beauty_corner__marija/"
              style={{ display: "flex", color: "#343A59" }}
            >
              <Icon as={FaInstagram} boxSize="28px" />
            </Link>
            <Link
              to="https://m.facebook.com/p/Kozmeti%C4%8Dki-salon-Beauty-Corner-100064815321266/"
              style={{ display: "flex", color: "#343A59" }}
            >
              <Icon as={FaFacebookF} boxSize="25px" />
            </Link>
          </HStack>
        </Stack>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
        >
          <Divider orientation="horizontal" borderColor="blue" />
        </motion.div>
      </Box>
    </HStack>
  );
};

export default Links;
