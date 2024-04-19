import axiosInstance from "../config/axios";

type LoginData = {
  username: string;
  password: string;
};

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

export type Categories = {
  id: number;
  name: string;
};

type CategoriesData = {
  data: Categories[];
};

export type CategoryType = {
  name: string;
};

export type ServiceType = {
  id: number;
  category_id: number;
  name: string;
  time_in_minutes: number;
  price: number;
  workers_id: number[];
};

type WorkersData = {
  data: WorkersType[];
};

export type WorkersType = {
  name: string;
  image?: string;
  id: number;
};

export type Workers = {
  name: string;
  image?: string;
};

const apiServices = {
  getCategories: () => axiosInstance.get<null, CategoriesData>("/categories"),
  addCategory: (categoryData: Categories) =>
    axiosInstance.post<Categories, null>("/categories", categoryData),
  deleteCategory: (id: number) =>
    axiosInstance.delete<number, null>(`/categories/${id}`),
  updateCategory: ({ data, id }: any) =>
    axiosInstance.put<CategoryType, null>(`/categories/${id}`, data),
  getServices: () => axiosInstance.get<null, ServicesData>("/services"),
  addService: (serviceData: ServiceType) =>
    axiosInstance.post<ServiceType, null>("/services", serviceData),
  deleteService: (id: number) =>
    axiosInstance.delete<null, number>(`/services/${id}`),
  updateService: ({ data, id }: any) =>
    axiosInstance.put<ServiceType>(`/services/${id}`, data),
  getWorkers: () => axiosInstance.get<null, WorkersData>("/workers"),
  addWorker: (workersData: WorkersType) =>
    axiosInstance.post<WorkersType, null>("/workers", workersData),
  deleteWorker: (id: number) =>
    axiosInstance.delete<null, number>(`/workers/${id}`),
  updateWorker: ({ data, id }: any) =>
    axiosInstance.put<Workers, null>(`/workers/${id}`, data),
  loginAdmin: (data: LoginData) =>
    axiosInstance.post<LoginData, string>("/auth/login", data),
};

export default apiServices;
