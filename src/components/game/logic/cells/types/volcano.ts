import { ICell } from "./base";
import { Cell } from "..";

import { random } from "../../helpers";

const erupting = String.fromCodePoint(0x1f30b);
const inactice = String.fromCodePoint(0x26f0);

export interface IVolcanoCell extends ICell {
    type: "volcano";
    isErupting: boolean;
}

export const CreateVolcanoCell = (): IVolcanoCell => {
    return {
        type: "volcano",
        icon: inactice,
        isErupting: false,
    };
};

const setErupting = (c: IVolcanoCell): IVolcanoCell => {
    return {
        ...c,
        isErupting: true,
        icon: erupting,
    };
};

const setPassive = (c: IVolcanoCell): IVolcanoCell => {
    return {
        ...c,
        isErupting: false,
        icon: inactice,
    };
};

// ERUPTION_CHANGE is the change a volcano will erupt in percents.
const ERUPTION_CHANGE = 1;

// Same as above, but for when an eruption should stop
const ERUPTION_DURATION_CHANGE = 50;

export const simulateVolcano = (
    board: Cell[],
    cell: IVolcanoCell,
    boardWidth: number,
    cellNumber: number
): Cell => {
    if (!cell.isErupting && random(ERUPTION_CHANGE)) {
        return setErupting(cell);
    }

    if (cell.isErupting && random(ERUPTION_DURATION_CHANGE)) {
        return setPassive(cell);
    }

    return cell;
};
