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

const items = ["Usluge", "O Nama", "Edukacije", "Kontakt"];

interface LinksProps {
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const Links = ({ selectedIndex, setSelectedIndex }: LinksProps) => {
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
              const isSelected = selectedIndex === index;
              return (
                <Link
                  to={`/${item}`}
                  key={item}
                  style={{
                    fontSize: "20px",
                    marginLeft: "20px",
                    color: isSelected ? "#E6888A" : "#343A59",
                  }}
                  onClick={() => setSelectedIndex(index)}
                >
                  <Text display="block" fontSize="xl" color="currentColor">
                    {item}
                  </Text>
                </Link>
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
