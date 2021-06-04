export interface IField {
    filterName: string;
    filterValue: string;
    type: "string" | "boolean" | "number" | "enum";
    name: string;
    required: boolean;
    default: string;
    valid: string[];
    all?:boolean
}
