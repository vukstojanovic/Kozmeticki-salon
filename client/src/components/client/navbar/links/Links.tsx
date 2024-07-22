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

const items = ["O Nama", "Usluge", "Kontakt"];

interface LinksProps {
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleLinkClick: (index: number, path: string) => void; // Dodajemo handleLinkClick kao prop
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
              return (
                <Text
                  as="button"
                  key={item}
                  style={{
                    fontSize: "20px",
                    marginLeft: "20px",
                  }}
                  onClick={() =>
                    handleLinkClick(
                      index,
                      `#${item.toLowerCase().replace(/\s+/g, "-")}`
                    )
                  } // Korišćenje handleLinkClick funkcije pri kliku
                >
                  {item}
                </Text>
              );
            })}
          </HStack>
          <HStack mr={2}>
            <Center height="35px">
              <Divider orientation="vertical" borderColor="blue" />
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
        <Divider orientation="horizontal" borderColor="blue" />
      </Box>
    </HStack>
  );
};

export default Links;
