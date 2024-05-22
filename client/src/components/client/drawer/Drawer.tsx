import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Category, Service } from "../../../services/index";

import { useQuery } from "@tanstack/react-query";
import apiServices from "../../../services/index";
import { useState, useEffect } from "react";
import Calendar from "../calendar/Calendar";
import CustomStepper from "../customStepper/CustomStepper";
import { FaRegCheckCircle } from "react-icons/fa";
import { WorkersRadioGroup } from "../workersRadio/WorkersRadioGroup";

import jelenaImg from "../../../assets/workers/jelena.jpg";
import jekaImg from "../../../assets/workers/jeka.jpg";
import makicaImg from "../../../assets/workers/makica.jpg";

const steps = [
  { title: "Prvi", description: "Usluga & Osoblje" },
  { title: "Drugi", description: "Datum & Vreme" },
  { title: "Treći", description: "Kontakt Info" },
];

const workerPhotos: Record<string, string> = {
  "655bdeb582e8679388fddbf7": jelenaImg,
  "65e4d478e8c68c704b489b31": jekaImg,
  "6647113cbb70fae4c701f8b3": makicaImg,
  "66471142bb70fae4c701f8b7": makicaImg,
};

const schema = yup.object({
  date: yup.number().required(),
  service_id: yup.string().required(),
  // service_duration: yup.number().required(),
  worker_id: yup.string().required(),
  customer_name: yup.string().required(),
  customer_number: yup.string().required(),
  notes: yup.string(),
});

export default function DrawerExample({
  isOpen,
  onClose,
  selectedCategory,
}: {
  isOpen: any;
  onClose: any;
  selectedCategory?: any;
}) {
  const [date, setDate] = useState<Date>(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [activeWorker, setActiveWorker] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(
    selectedCategory || ""
  );
  const [activeService, setActiveService] = useState<string>("");

  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: workers } = useQuery(["workers"], apiServices.getWorkers, {
    select: data => {
      return data.data.map(worker => ({
        ...worker,
        imgUrl: workerPhotos[worker.id] || "https://bit.ly/dan-abramov",
      }));
    },
  });

  const { data: categories } = useQuery(
    ["categories"],
    apiServices.getCategories
  );
  const { data: services } = useQuery(["services"], apiServices.getServices);

  const onClickDay = (date: Date) => {
    setDate(date);
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

  const submitForm = (data: any) => {
    if (activeStep === steps.length) {
      // Handle form submission
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

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
        <form onSubmit={handleSubmit(submitForm)}>
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
                      value={activeCategory}
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
                    <Controller
                      control={control}
                      name="service_id"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          placeholder="Izaberi uslugu"
                          cursor="pointer"
                          onChange={onChange}
                          value={value}
                        >
                          {services?.data
                            ?.filter(
                              service => service.category_id === activeCategory
                            )
                            .map((service: Service) => {
                              return (
                                <option key={service.id} value={service.id}>
                                  {service.name}
                                </option>
                              );
                            })}
                        </Select>
                      )}
                    />
                  </Box>

                  <Stack spacing={2}>
                    <Text color="blue">Izaberi radnika</Text>
                    <WorkersRadioGroup
                      control={control}
                      name="workers_id"
                      allWorkers={workers}
                    />
                  </Stack>
                </Stack>
              )}

              {activeStep === 2 && (
                <Stack spacing="20px" px={2}>
                  <Stack spacing={0}>
                    <Text color="blue">Izaberi datum</Text>
                    <Calendar onClickDay={onClickDay} value={date} />
                  </Stack>
                </Stack>
              )}
              {activeStep === 3 && (
                <Stack spacing="20px">
                  <Stack spacing={0}>
                    <FormLabel htmlFor="fullName">Ime i prezime</FormLabel>
                    <Input
                      id="fullName"
                      placeholder="Unesi ime i prezime"
                      {...register("customer_name")}
                    />
                  </Stack>
                  <Stack spacing={0}>
                    <FormLabel htmlFor="number">Broj telefona</FormLabel>
                    <Input
                      id="number"
                      placeholder="Broj telefona"
                      {...register("customer_number")}
                    />
                  </Stack>
                  <Stack spacing={0}>
                    <FormLabel htmlFor="desc">Napomena</FormLabel>
                    <Textarea id="desc" {...register("notes")} />
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
                <Button variant="blue" type="submit">
                  Potvrdi
                </Button>
              ) : (
                <Button variant="blue" onClick={handleNext}>
                  Dalje
                </Button>
              )}
            </DrawerFooter>
          </DrawerContent>
        </form>
      )}
    </Drawer>
  );
}
