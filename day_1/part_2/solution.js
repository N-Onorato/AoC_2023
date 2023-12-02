

const data = Deno.readTextFileSync("day_1/input.txt")
const lines = data.split('\n')

const digitMap = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
}

function normalizeDigit(digit) {
    if(digit.length > 1) {
        return digitMap[digit]
    } else {
        return digit
    }
}

let numbers = lines.map(line => {
    const forwardSearch = /\d|(one|two|three|four|five|six|seven|eight|nine)/g
    const backSearch = /\d|(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g
    const first = line.match(forwardSearch)[0]
    const last = (line.split("").reverse().join("")).match(backSearch)[0].split("").reverse().join("")
    let number;
    number = parseInt(normalizeDigit(first) + normalizeDigit(last))

    return number
});

console.log(numbers.reduce((last, current, _n) => {
    return last + current
}, 0))