import { useState } from "react";
import { Flex, Stack } from "@chakra-ui/react";
import AdminFullCalendar from "./components/admin/tabs/adminFullCalendar/adminFullCalendar";
import WorkersAdmin from "./components/admin/tabs/workersAdmin/WorkersAdmin";
import CategoriesAdmin from "./components/admin/tabs/categoriesAdmin/CategoriesAdmin";
import Sidebar from "./components/admin/sidebar/Sidebar";

import { FaRegCalendarAlt } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";

const items = [
  { name: "Kalendar", icon: FaRegCalendarAlt },
  { name: "Usluge", icon: IoGridOutline },
  { name: "Zaposleni", icon: MdSupervisorAccount },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState<string>(items[0].name);
  const [navSize, changeNavSize] = useState<"small" | "large">("large");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Kalendar":
        return <AdminFullCalendar />;
      case "Usluge":
        return <CategoriesAdmin />;
      case "Zaposleni":
        return <WorkersAdmin />;
      default:
        return null;
    }
  };

  return (
    <Flex>
      <Sidebar
        setActiveTab={setActiveTab}
        navSize={navSize}
        changeNavSize={changeNavSize}
        items={items}
      />
      <Stack
        my="2.5vh"
        mx="5vh"
        flex="1"
        marginLeft={navSize === "small" ? "120px" : "300px"}
      >
        {renderTabContent()}
      </Stack>
    </Flex>
  );
};

export default Admin;
