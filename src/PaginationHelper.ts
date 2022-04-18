import { toInteger } from "lodash";

function GetPaginationButtons(maxButtons: number, pageNumber: number, pageCount: number): [number, number] {
    let to_allocate: number = maxButtons - 1

    const half = to_allocate - toInteger(to_allocate / 2)
    const low_cnt = Math.min(half, pageNumber);
    const high_cnt = Math.min(to_allocate - low_cnt + 1, pageCount - low_cnt);
    const low = Math.max(1, pageNumber - low_cnt + 1)
    const high = Math.min(pageCount, pageNumber + high_cnt)

    return [low, high]
}

export default GetPaginationButtons