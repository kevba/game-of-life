export interface ICell {
    type: string;
    icon: string;
}

export interface ILivingCell extends ICell {
    age: number;
    maxAge: number;
}
