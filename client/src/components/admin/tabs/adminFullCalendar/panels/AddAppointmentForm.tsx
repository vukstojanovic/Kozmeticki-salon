import React from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

interface AddNewAppointmentFormProps {
  newEventTitle: string;
  newCustomerName: string;
  newCustomerNumber: string;
  newService: string;
  setNewEventTitle: React.Dispatch<React.SetStateAction<string>>;
  setNewCustomerName: React.Dispatch<React.SetStateAction<string>>;
  setNewCustomerNumber: React.Dispatch<React.SetStateAction<string>>;
  setNewService: React.Dispatch<React.SetStateAction<string>>;
  handleAddEvent: () => void;
}

const AddNewAppointmentForm: React.FC<AddNewAppointmentFormProps> = ({
  newEventTitle,
  newCustomerName,
  newCustomerNumber,
  newService,
  setNewEventTitle,
  setNewCustomerName,
  setNewCustomerNumber,
  setNewService,
  handleAddEvent,
}) => (
  <Box mt={4}>
    <Text fontSize="xl" fontWeight="bold">
      Dodaj novi termin
    </Text>
    <FormControl mt={2} isRequired>
      <FormLabel>Naslov</FormLabel>
      <Input
        placeholder="Unesite naslov"
        value={newEventTitle}
        onChange={e => setNewEventTitle(e.target.value)}
      />
    </FormControl>
    <FormControl mt={2} isRequired>
      <FormLabel>Ime kupca</FormLabel>
      <Input
        placeholder="Unesite ime kupca"
        value={newCustomerName}
        onChange={e => setNewCustomerName(e.target.value)}
      />
    </FormControl>
    <FormControl mt={2} isRequired>
      <FormLabel>Broj kupca</FormLabel>
      <Input
        placeholder="Unesite broj kupca"
        value={newCustomerNumber}
        onChange={e => setNewCustomerNumber(e.target.value)}
      />
    </FormControl>
    <FormControl mt={2} isRequired>
      <FormLabel>Usluga</FormLabel>
      <Input
        placeholder="Unesite uslugu"
        value={newService}
        onChange={e => setNewService(e.target.value)}
      />
    </FormControl>
    <Button mt={4} colorScheme="blue" onClick={handleAddEvent}>
      Potvrdi
    </Button>
  </Box>
);

export default AddNewAppointmentForm;
