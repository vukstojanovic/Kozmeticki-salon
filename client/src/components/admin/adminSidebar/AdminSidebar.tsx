import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Img,
  Stack,
  DrawerHeader,
  Box,
  Text,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import logo from "../../../assets/logo.png";
import "./adminSidebar.scss";

import { FaRegCalendarAlt } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";

const items = [
  { name: "Kalendar", icon: FaRegCalendarAlt },
  { name: "Usluge", icon: IoGridOutline },
  { name: "Zaposleni", icon: MdSupervisorAccount },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function AdminSidebar({
  isOpen,
  onClose,
  selectedIndex,
  setSelectedIndex,
}: AdminSidebarProps) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Drawer
      placement="left"
      onClose={onClose}
      isOpen={isOpen}
      variant="secondary"
      closeOnOverlayClick={!isLargerThan768 && true}
      blockScrollOnMount={false}
      closeOnEsc={false}
    >
      {!isLargerThan768 && <DrawerOverlay />}
      <DrawerContent backgroundColor="darkBlue">
        <DrawerHeader alignSelf="center">
          <Img src={logo} alt="logo" h={107} w={150} />
        </DrawerHeader>
        {!isLargerThan768 && <DrawerCloseButton color="lightGray" />}
        <DrawerBody mt={10}>
          <Stack spacing={2} color="lightGray">
            {items.map((item, index) => (
              <Box
                key={index}
                display="flex"
                gap={3}
                alignItems="center"
                justifyContent="center"
                bg={selectedIndex === index ? "whiteAlpha.500" : "transparent"}
                p={3}
                borderRadius="md"
                onClick={() => setSelectedIndex(index)}
                cursor="pointer"
              >
                <Icon as={item.icon} boxSize={6} />
                <Text fontSize="xl">{item.name}</Text>
              </Box>
            ))}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
