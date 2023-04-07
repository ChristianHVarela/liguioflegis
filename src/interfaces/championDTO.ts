
interface habilitiesDTO {
    name: string;
    description: string;
}

interface championDTO {
    name: string;
    age: number;
    localization: string;
    class: string;
    gender: string;
    habilities: habilitiesDTO[];
}

export { championDTO }