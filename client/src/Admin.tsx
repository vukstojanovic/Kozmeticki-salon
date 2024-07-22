import { useState } from "react";
import { Flex, Stack } from "@chakra-ui/react";
import AdminFullCalendar from "./components/admin/tabs/adminFullCalendar/adminFullCalendar";
import WorkersAdmin from "./components/admin/tabs/workersAdmin/WorkersAdmin";
import CategoriesAdmin from "./components/admin/tabs/categoriesAdmin/CategoriesAdmin";
import Sidebar from "./components/admin/sidebar/Sidebar";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const items = [
  { name: "Kalendar", icon: FaRegCalendarAlt },
  { name: "Usluge", icon: IoGridOutline },
  { name: "Zaposleni", icon: MdSupervisorAccount },
];

interface AdminProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Admin: React.FC<AdminProps> = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState<string>(items[0].name);
  const [navSize, changeNavSize] = useState<"small" | "large">("large");
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Flex>
      <Sidebar
        setActiveTab={setActiveTab}
        navSize={navSize}
        changeNavSize={changeNavSize}
        items={items}
        onLogout={handleLogout}
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
