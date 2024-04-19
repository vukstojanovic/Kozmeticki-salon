import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Img,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const items = ["Usluge", "O Nama", "Edukacije", "Kontakt"];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Sidebar({
  isOpen,
  onClose,
  selectedIndex,
  setSelectedIndex,
}: SidebarProps) {
  return (
    <Drawer
      placement="left"
      onClose={onClose}
      isOpen={isOpen}
      variant="secondary"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <Stack
            direction="column"
            pt={10}
            justifyContent="space-between"
            alignItems="center"
            height="100%"
          >
            <VStack spacing={3}>
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
            </VStack>
          </Stack>
        </DrawerBody>
        <DrawerFooter justifyContent="center" pb={5}>
          <Img
            src={logo}
            alt="logo"
            h={{ base: "112px", md: "112px" }}
            cursor="pointer"
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
