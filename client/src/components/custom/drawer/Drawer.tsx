import { useRef } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
} from "@chakra-ui/react";

import ChoseStaff from "../choseStaff/ChoseStaff";
import { useQuery } from "@tanstack/react-query";
import apiServices from "../../../services/index";
import { useState } from "react";
import Calendar from "../calendar/Calendar";

export default function DrawerExample({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: any;
  onOpen: any;
  onClose: any;
}) {
  const [activeWorker, setActiveWorker] = useState<number | null>();
  const [day, setDay] = useState<Date>(new Date());
  const { data: workers } = useQuery(["workers"], apiServices.getWorkers);

  const onClickDay = (day: Date) => {
    setDay(day);
  };

  const firstField = useRef<HTMLInputElement>(null);

  const handleButtonClick = (id: number) => {
    setActiveWorker(prevActiveWorker => (prevActiveWorker === id ? null : id));
  };

  const isWorkerActive = (id: number) => activeWorker === id;

  console.log(day);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
      variant="secondary"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Zakaži termin</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="fullName">Ime i prezime</FormLabel>
              <Input
                ref={firstField}
                id="fullName"
                placeholder="Unesi ime i prezime"
              />
            </Box>

            <Calendar onClickDay={onClickDay} value={day} />

            <SimpleGrid columns={4} spacing="10px">
              <Button
                colorScheme="#2D3748"
                variant="outline"
                _hover={{ bg: "#ebedf0" }}
              >
                12:00
              </Button>
              <Button
                colorScheme="#2D3748"
                variant="outline"
                _hover={{ bg: "#ebedf0" }}
              >
                12:30
              </Button>
              <Button
                colorScheme="#2D3748"
                variant="outline"
                _hover={{ bg: "#ebedf0" }}
              >
                13:00
              </Button>
              <Button
                colorScheme="#2D3748"
                variant="outline"
                _hover={{ bg: "#ebedf0" }}
                isDisabled={true}
              >
                13:30
              </Button>
              <Button
                colorScheme="#2D3748"
                variant="outline"
                _hover={{ bg: "#ebedf0" }}
              >
                14:00
              </Button>
              <Button
                colorScheme="#2D3748"
                variant="outline"
                _hover={{ bg: "#ebedf0" }}
              >
                14:30
              </Button>
            </SimpleGrid>

            <Box>
              <FormLabel htmlFor="owner">Izaberi osoblje</FormLabel>
              <Select id="owner" defaultValue="segun">
                <option value="makica">Makica</option>
                <option value="jeka">Jeka</option>
              </Select>
            </Box>

            <ChoseStaff
              data={workers}
              isWorkerActive={isWorkerActive}
              handleButtonClick={handleButtonClick}
            />

            <Box>
              <FormLabel htmlFor="desc">Napomena</FormLabel>
              <Textarea id="desc" />
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
