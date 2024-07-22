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
import logo from "../../../assets/logo.png";

const items = ["O Nama", "Usluge", "Kontakt"];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleLinkClick: (index: number, elementId: string) => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  selectedIndex,
  setSelectedIndex,
  handleLinkClick,
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
                const elementId = item.toLowerCase().replace(/\s+/g, "-");
                const isSelected = selectedIndex === index;
                return (
                  <Text
                    as="button"
                    key={item}
                    style={{
                      fontSize: "20px",
                      marginLeft: "20px",
                      color: isSelected ? "#E6888A" : "#343A59",
                    }}
                    onClick={() => handleLinkClick(index, elementId)}
                  >
                    {item}
                  </Text>
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
