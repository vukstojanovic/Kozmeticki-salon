import axiosInstance from "../config/axios";

type Category = {
    id: number;
    category_id: number;
    name: string;
    time_in_minutes: number;
    price: number;
    workers_id: number[];
};

export type CategoryData = {
    data: Category[];
};

const apiServices = {
    getServices: () => axiosInstance.get<null, CategoryData>("/services"),

};

export default apiServices;