import { useQuery } from "@tanstack/react-query";
import apiServices, { Service } from "../services";

export const useServiceName = (serviceId: string) => {
  const {
    data: servicesData,
    isLoading,
    error,
  } = useQuery(["services"], apiServices.getServices);

  const services: Service[] = servicesData?.data || [];

  // Pronalaženje naziva usluge na osnovu ID-a
  const serviceName = services.find(service => service.id === serviceId)?.name;

  return {
    serviceName,
    isLoading,
    error,
  };
};
