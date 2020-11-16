export interface ICell {
    type: string;
    icon: string;
}

export interface IAgingCell extends ICell {
    age: number;
    maxAge: number;
}

export const instanceOfAgingCell = (object: ICell): object is IAgingCell => {
    return "age" in object && "maxAge" in object;
};

export interface ILivingCell extends IAgingCell {
    burnable: boolean;
}

export const instanceOfLivingCell = (object: ICell): object is ILivingCell => {
    return instanceOfAgingCell(object) && "burnable" in object;
};
