
const gamesRaw = Deno.readTextFileSync("day_2/input.txt").split('\n')

const games = gamesRaw.map(parse_game)
const power_sum = games.reduce((last, current) => last + current.cubePower(), 0)
console.log(power_sum)

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
        },
        cubePower() {
            const max = cubes.reduce((last, current) => {
                return {
                        red: last.red < current.red ? current.red : last.red,
                        blue: last.blue < current.blue ? current.blue : last.blue,
                        green: last.green < current.green ? current.green : last.green,
                    }
                }, {red: 0, green: 0, blue: 0})
            return (max.red ?? 1) * (max.green ?? 1) * (max.blue ?? 1);
        }
    }
}