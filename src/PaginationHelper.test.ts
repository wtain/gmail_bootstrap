import GetPaginationButtons from "./PaginationHelper"

describe ('PaginationHelper', () => {
    test("Basic test - beginning", () => {
        const [low, high] = GetPaginationButtons(5, 1, 10)

        expect([low, high] === [1, 5])
    })

    test("Basic test - end", () => {
        const [low, high] = GetPaginationButtons(5, 10, 10)

        expect([low, high] === [6, 10])
    })

    test("Basic test - middle", () => {
        const [low, high] = GetPaginationButtons(5, 5, 10)

        expect([low, high] === [3, 7])
    })
})