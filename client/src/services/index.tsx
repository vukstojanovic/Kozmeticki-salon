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
    name: string
}

type CategoriesData = {
    data: Categories[]
}

const apiServices = {
    getServices: () => axiosInstance.get<null, ServicesData>("/services"),
    getCategories: () => axiosInstance.get<null, CategoriesData>("/categories")

};

export default apiServices;