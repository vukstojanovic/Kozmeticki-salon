import { useEffect, useState } from "react";
import { Icon, useMediaQuery, useDisclosure, Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import AdminSidebar from "./components/admin/adminSidebar/AdminSidebar";
import AdminFullCalendar from "./components/admin/tabs/adminFullCalendar/adminFullCalendar";
import WorkersAdmin from "./components/admin/tabs/workersAdmin/WorkersAdmin";
import CategoriesAdmin from "./components/admin/tabs/categoriesAdmin/CategoriesAdmin";

const Admin = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isLargerThan768) {
      onOpen();
    } else {
      onClose();
    }
  }, [isLargerThan768, onOpen, onClose]);

  return (
    <Box position="relative" w="100vw" h="100vh">
      {!isLargerThan768 && (
        <Icon
          position="absolute"
          top={2}
          left={2}
          as={HamburgerIcon}
          boxSize={6}
          onClick={onOpen}
          color="darkBlue"
        />
      )}
      <Box
        ml={{ base: 0, md: "375px" }}
        py={{ base: "10%", md: "1%" }}
        px={{ base: "3%", md: "1%" }}
      >
        {selectedIndex === 0 && <AdminFullCalendar />}
        {selectedIndex === 1 && <CategoriesAdmin />}
        {selectedIndex === 2 && <WorkersAdmin />}
      </Box>
      <AdminSidebar
        isOpen={isOpen}
        onClose={onClose}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </Box>
  );
};

export default Admin;
