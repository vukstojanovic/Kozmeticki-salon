import axiosInstance from "../config/axios";

type Services = {
  id: number;
  category_id: number;
  name: string;
  time_in_minutes: number;
  price: number;
  workers_id: number[];
};

export type ServicesData = {
  data: Services[];
};

type Categories = {
  id: number;
  name: string;
};

type Workers = {
  id: number;
  name: string;
  image: string;
};

type CategoriesData = {
  data: Categories[];
};

type WorkersData = {
  data: Workers[];
};

const apiServices = {
  getServices: () => axiosInstance.get<null, ServicesData>("/services"),
  getCategories: () => axiosInstance.get<null, CategoriesData>("/categories"),
  getWorkers: () => axiosInstance.get<null, WorkersData>("/workers"),
};

export default apiServices;
