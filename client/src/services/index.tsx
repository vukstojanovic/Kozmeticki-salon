import axiosInstance from "../config/axios";

type LoginData = {
  username: string;
  password: string;
};

export type Service = {
  id: string;
  category_id: string;
  name: string;
  time_in_minutes: number;
  price: number;
  workers_id: string[];
};

export type ServicesData = {
  data: Service[];
};

export type Category = {
  id: string;
  name: string;
};

type CategoriesData = {
  data: Category[];
};

export type CategoryType = {
  name: string;
};

export type ServiceType = {
  id: string;
  category_id: string;
  name: string;
  time_in_minutes: number;
  price: number;
  workers_id: string[];
};

type WorkersData = {
  data: WorkersType[];
};

export type WorkersType = {
  name: string;
  image?: string;
  id: string;
};

export type Workers = {
  name: string;
  image?: string;
};

const apiServices = {
  getCategories: () => axiosInstance.get<null, CategoriesData>("/categories"),

  addCategory: (categoryData: Category) =>
    axiosInstance.post<Category, null>("/categories", categoryData),

  deleteCategory: (id: string) =>
    axiosInstance.delete<string, null>(`/categories/${id}`),

  updateCategory: ({ data, id }: any) =>
    axiosInstance.put<CategoryType, null>(`/categories/${id}`, data),

  getServices: () => axiosInstance.get<null, ServicesData>("/services"),

  addService: (serviceData: Service) =>
    axiosInstance.post<Service, null>("/services", serviceData),

  deleteService: (id: string) =>
    axiosInstance.delete<null, string>(`/services/${id}`),

  updateService: ({ data, id }: any) =>
    axiosInstance.put<ServiceType>(`/services/${id}`, data),

  getWorkers: () => axiosInstance.get<null, WorkersData>("/workers"),

  addWorker: (workersData: WorkersType) =>
    axiosInstance.post<WorkersType, null>("/workers", workersData),

  deleteWorker: (id: string) =>
    axiosInstance.delete<null, string>(`/workers/${id}`),

  updateWorker: ({ data, id }: any) =>
    axiosInstance.put<Workers, null>(`/workers/${id}`, data),

  loginAdmin: (data: LoginData) =>
    axiosInstance.post<LoginData, string>("/auth/login", data),
};

export default apiServices;
