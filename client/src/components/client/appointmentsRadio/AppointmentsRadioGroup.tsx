import { forwardRef } from "react";
import {
  Box,
  useRadio,
  useRadioGroup,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { useController } from "react-hook-form";

const AppointmentRadio: React.FC<any> = forwardRef((props, ref) => {
  const { slotName, slotValue } = props;
  const { state, getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps({ ref });
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        key={slotValue}
        py={2}
        px={2}
        width="70px"
        border={0.5}
        borderColor="black"
        borderStyle="solid"
        backgroundColor={state.isChecked ? "black" : "white"}
        textColor={state.isChecked ? "white" : "black"}
        borderRadius={8}
        mr={1}
        mb={1}
        cursor="pointer"
        textAlign="center"
      >
        {slotName}
      </Box>
    </Box>
  );
});

export const AppointmentsRadioGroup: React.FC<any> = ({
  control,
  name,
  slots,
}) => {
  const { field } = useController({
    name,
    control,
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    ...field,
  });

  return (
    <SimpleGrid columns={4} gap="2px" {...getRootProps()}>
      {slots?.map((slot: { name: string; value: number }) => {
        return (
          <AppointmentRadio
            key={slot.value}
            slotName={slot.name}
            id={slot.value}
            slotValue={slot.value}
            {...getRadioProps({ value: slot.value })}
          />
        );
      })}
    </SimpleGrid>
  );
};
