export interface IngredientsProps {
    id?: number;
    name: string;
    unit: number;
}
export interface ListOfIngredientsProps {
    id: number;
    name: string;
    unit: {
        id: number;
        name: string;
        abbreviation: string;
    };
}