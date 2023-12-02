

const data = Deno.readTextFileSync("day_1/input.txt")
const lines = data.split('\n')

let numbers = lines.map(line => {
    const forwardSearch = /\d/g
    const backSearch = /\d/g
    const first = line.match(forwardSearch)[0]
    const last = (line.split("").reverse().join("")).match(backSearch)[0].split("").reverse().join("")
    let number;
    number = parseInt(first + last)

    return number
});

console.log(numbers.reduce((last, current) => {
    return last + current
}))