import { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Icon,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Category, Service } from "../../../services/index";

import ChoseStaff from "../choseStaff/ChoseStaff";
import { useQuery } from "@tanstack/react-query";
import apiServices from "../../../services/index";
import { useState } from "react";
import Calendar from "../calendar/Calendar";
import CustomStepper from "../customStepper/CustomStepper";
import { FaRegCheckCircle } from "react-icons/fa";

const steps = [
  { title: "Prvi", description: "Usluga & Osoblje" },
  { title: "Drugi", description: "Datum & Vreme" },
  { title: "Treći", description: "Kontakt Info" },
];

export default function DrawerExample({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) {
  const [day, setDay] = useState<Date>(new Date());

  const [activeWorker, setActiveWorker] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeService, setActiveService] = useState<string>("");

  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: workers } = useQuery(["workers"], apiServices.getWorkers);
  const { data: categories } = useQuery(
    ["categories"],
    apiServices.getCategories
  );
  const { data: services } = useQuery(["services"], apiServices.getServices);

  const onClickDay = (day: Date) => {
    setDay(day);
  };

  const firstField = useRef<HTMLInputElement>(null);

  const handleButtonClick = (id: string) => {
    if (activeWorker === id) {
      setActiveWorker(null);
    } else {
      setActiveWorker(id);
    }
  };

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActiveCategory(event.target.value);
  };

  const handleChangeService = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveService(event.target.value);
  };

  const isWorkerActive = (id: string): boolean => {
    return activeWorker === id;
  };
  const handleNext = () => {
    setActiveStep(prevStep => Math.min(prevStep + 1, steps.length));
  };

  const handlePrev = () => {
    setActiveStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    console.log(services);
  }, [services]);

  console.log(activeWorker);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
      variant="secondary"
    >
      <DrawerOverlay />
      {isSubmitted ? (
        <DrawerContent justifyContent="space-between">
          <DrawerCloseButton />
          <DrawerBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
            py={4}
            px={8}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Icon as={FaRegCheckCircle} boxSize={24} />
              <Text fontSize="xl" mt={4}>
                Uspešno ste rezervisali!
              </Text>
            </Flex>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="blue" onClick={onClose}>
              Izadji
            </Button>
          </DrawerFooter>
        </DrawerContent>
      ) : (
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Zakaži termin</DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" p={4}>
            <CustomStepper activeStep={activeStep} steps={steps} />
            <Divider mt={2} mb={5} orientation="horizontal" />

            {activeStep === 1 && (
              <Stack spacing="20px" px={2}>
                <Box>
                  <Select
                    cursor="pointer"
                    placeholder="Izaberi kategoriju"
                    onChange={handleChangeCategory}
                  >
                    {categories?.data?.map((category: Category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </Select>
                </Box>
                <Box>
                  <Select
                    placeholder="Izaberi uslugu"
                    cursor="pointer"
                    onChange={handleChangeService}
                  >
                    {services?.data
                      ?.filter(
                        service => service.category_id === activeCategory
                      )
                      .map((service: Service) => {
                        return (
                          <option key={service.id} value={service.name}>
                            {service.name}
                          </option>
                        );
                      })}
                  </Select>
                </Box>

                <Stack spacing={2}>
                  <Text color="blue">Izaberi radnika</Text>
                  <ChoseStaff
                    //  data={workers.filter(worker => activeService === worker)}
                    data={workers}
                    isWorkerActive={isWorkerActive}
                    handleButtonClick={handleButtonClick}
                  />
                </Stack>
              </Stack>
            )}

            {activeStep === 2 && (
              <Stack spacing="20px" px={2}>
                <Stack spacing={0}>
                  <Text color="blue">Izaberi datum</Text>
                  <Calendar onClickDay={onClickDay} value={day} />
                </Stack>

                <VStack align="start" spacing={0}>
                  <FormLabel>Izaberi termin</FormLabel>
                  <SimpleGrid gap={3} columns={4} spacing="10px">
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
                      isDisabled={true}
                    >
                      13:00
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
                      15:00
                    </Button>
                  </SimpleGrid>
                </VStack>
              </Stack>
            )}
            {activeStep === 3 && (
              <Stack spacing="20px">
                <Stack spacing={0}>
                  <FormLabel htmlFor="fullName">Ime i prezime</FormLabel>
                  <Input
                    ref={firstField}
                    id="fullName"
                    placeholder="Unesi ime i prezime"
                  />
                </Stack>
                <Stack spacing={0}>
                  <FormLabel htmlFor="number">Broj telefona</FormLabel>
                  <Input id="number" placeholder="Broj telefona" />
                </Stack>
                <Stack spacing={0}>
                  <FormLabel htmlFor="desc">Napomena</FormLabel>
                  <Textarea id="desc" />
                </Stack>
              </Stack>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            {activeStep === 1 ? (
              <Button
                variant="outline"
                mr={3}
                onClick={onClose}
                disabled={activeStep === 1}
              >
                Izadji
              </Button>
            ) : (
              <Button
                variant="outline"
                mr={3}
                onClick={handlePrev}
                disabled={activeStep === 1}
              >
                Nazad
              </Button>
            )}

            {activeStep === steps.length ? (
              <Button variant="blue" onClick={handleSubmit}>
                Potvrdi
              </Button>
            ) : (
              <Button variant="blue" onClick={handleNext}>
                Dalje
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      )}
    </Drawer>
  );
}
