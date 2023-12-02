
const gamesRaw = Deno.readTextFileSync("day_2/input.txt").split('\n')

const bag = {
    "red": 12,
    "green": 13,
    "blue": 14
}

const games = gamesRaw.map(parse_game)
const valid_games = games.filter(game => game.isValid(bag))
const id_sum = valid_games.reduce((last, current) => last + current.id, 0)
console.log(id_sum)

function parse_game(game) {
    let [id, sets] = game.split(':')
    id = parseInt(id.substring(4))
    sets = sets.split(";")
    sets = sets.map(s => s.trim())
    const cubes = sets.map((set) => {
        const pulls = set.split(", ")
        const objects = pulls.map((pair) => {
            const [n, color] = pair.split(" ")
            return {[color]: parseInt(n)}
        })
        return Object.assign({}, ...objects)
    })
    return {
        id: id,
        sets: cubes,
        isValid(trueState) {
            return cubes.every((cube) => {
                const keys = Object.keys(cube)
                return keys.every((key) => trueState[key] >= cube[key])
            })
        }
    }
}