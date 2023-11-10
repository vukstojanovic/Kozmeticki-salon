import axiosInstance from "../config/axios";

type Service = {
    id: number;
    category_id: number;
    name: string;
    time_in_minutes: number;
    price: number;
    workers_id: number[];
};

type Category = {
    id: number;
    category_name: string;
    category_services: Service[];
};

export type SalonData = {
    data: Category[];
};

const apiServices = {
    getServices: () => axiosInstance.get<null, SalonData>("/services"),

};

export default apiServices;