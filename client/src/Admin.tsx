import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  forwardRef,
  useTab,
  useMultiStyleConfig,
  Button,
  Box,
  Icon,
  Stack,
  Img,
} from "@chakra-ui/react";
import CategoryAdmin from "./CategoryAdmin";
import AdminFullCalendar from "./components/custom/adminFullCalendar/adminFullCalendar";

import WorkersAdmin from "./WorkersAdmin";
import logo from "./assets/logo.png";

import { FaRegCalendarAlt } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";

const CustomTab = forwardRef((props, ref) => {
  const tabProps = useTab({ ...props, ref });
  const styles = useMultiStyleConfig("Tabs", tabProps);

  return (
    <Button
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize="17px"
      fontWeight="bold"
      gap={3}
      color="#e2e8f0"
      height="50px"
      borderRadius="lg"
      __css={styles.tab}
      _selected={{
        color: "#343A59",
        backgroundColor: "#F0EFED",
      }}
      {...tabProps}
    >
      <Box display="flex" as="span">
        {props.icon}
      </Box>
      {tabProps.children}
    </Button>
  );
});

const Admin = () => {
  return (
    <Tabs
      size="md"
      variant="enclosed"
      display="flex"
      minHeight="100vh"
      bgColor="#F8F8F8"
    >
      <TabList
        display="flex"
        flexDirection="column"
        bgColor="#343A59"
        w={320}
        position="fixed"
        top={0}
        bottom={0}
        zIndex={1}
        p={5}
      >
        <Img src={logo} alt="logo" h={107} w={150} alignSelf="center" mb={10} />
        <Stack spacing={3}>
          <CustomTab icon={<Icon as={FaRegCalendarAlt} boxSize={6} />}>
            Kalendar
          </CustomTab>
          <CustomTab icon={<Icon as={IoGridOutline} boxSize={6} />}>
            Usluge
          </CustomTab>
          <CustomTab icon={<Icon as={MdSupervisorAccount} boxSize={6} />}>
            Zaposleni
          </CustomTab>
        </Stack>
      </TabList>
      <TabPanels ml={320}>
        <TabPanel>
          <AdminFullCalendar />
        </TabPanel>
        <TabPanel>
          <CategoryAdmin />
        </TabPanel>
        <TabPanel>
          <WorkersAdmin />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Admin;
