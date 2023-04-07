import { Habilities } from "./habilities";

interface Champion {
    id: number;
    name: string;
    age: string;
    localization: string;
    class: string;
    gender: string;
    habilities: Habilities[];
}

export { Champion }