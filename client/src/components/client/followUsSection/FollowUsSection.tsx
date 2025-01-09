import {
  Stack,
  Text,
  Divider,
  Box,
  Center,
  Icon,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import manicureSection from "../../../assets/section14.jpg";

const FollowUsSection = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      padding={{ base: "5%", md: 0 }}
      height={{ base: "350px", md: "250px" }}
      alignItems="center"
      justifyContent="center"
      width="full"
      backgroundColor="darkBlue"
      backgroundImage={manicureSection}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center 64%"
      position="relative"
      zIndex={1}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="rgba(7, 23, 32, 0.85)"
        zIndex={0}
      />
      <Stack
        direction="column"
        gap={{ base: 3, md: 4 }}
        zIndex={1}
        px={{ base: "5%", md: 0 }}
      >
        <Stack direction="column" gap={0} alignItems="center">
          <Text
            fontSize={{ base: "18px", md: "22px" }}
            color="white"
            textAlign="center"
          >
            Pratite nas za najnovije promocije.
          </Text>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <Link
            to="https://www.instagram.com/beauty_corner__marija/"
            color="white"
          >
            <IconButton
              border="1px solid white"
              borderRadius="full"
              isRound={true}
              aria-label="Instagram"
              color="#EFEEED"
              icon={<FaInstagram size={20} />}
              variant="none"
              h="38px"
              minW="38px"
            />
          </Link>
          <Link
            to="https://m.facebook.com/p/Kozmeti%C4%8Dki-salon-Beauty-Corner-100064815321266/"
            color="white"
          >
            <IconButton
              border="1px solid white"
              borderRadius="full"
              isRound={true}
              aria-label="Facebook"
              color="#EFEEED"
              icon={<FaFacebookF size={18} />}
              variant="none"
              h="38px"
              minW="38px"
            />
          </Link>
        </Stack>
      </Stack>
      {isLargerThan768 ? (
        <Center height="150px" px={20}>
          <Divider
            orientation="vertical"
            borderColor="white"
            borderWidth="1px"
          />
        </Center>
      ) : (
        <Divider orientation="horizontal" mb={4} mt={4} />
      )}
      <Stack
        direction="column"
        gap={{ base: 3, md: 4 }}
        zIndex={1}
        px={{ base: "5%", md: 0 }}
      >
        <Stack direction="column" gap={0} alignItems="center">
          <Text
            fontSize={{ base: "18px", md: "22px" }}
            color="white"
            textAlign="center"
          >
            Za više informacije pozovite naš broj telefona.
          </Text>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Icon as={MdLocalPhone} boxSize={{ base: "28px", md: "32px" }} />
          <Text
            as="a"
            href="tel:+381613931281"
            fontSize={{ base: "18px", md: "22px" }}
            color="white"
            lineHeight="28px"
            cursor="pointer"
          >
            +381 61 3931 281
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FollowUsSection;
