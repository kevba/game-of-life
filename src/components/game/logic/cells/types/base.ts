export interface ICell {
    type: string;
    icon: string;
}

export interface IAgingCell extends ICell {
    age: number;
    maxAge: number;
}

export interface ILivingCell extends IAgingCell {
    burnable: boolean;
}

export const instanceOfLivingCell = (object: ICell): object is ILivingCell => {
    return "burnable" in object;
};
