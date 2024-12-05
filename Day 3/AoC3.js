//problem: https://adventofcode.com/2024/day/3

const file = Bun.file('input.txt');
const data = await file.text();
// const data = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

var partOne = function(data) {
    const pattern = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;
    let res = 0;

    const matches = [...data.matchAll(pattern)];
    matches.forEach((match, index) => {
        console.log(`Match ${index + 1}: ${match[0]}, Numbers: ${match[1]}, ${match[2]}`);
    });

    matches.forEach(match => {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        res += num1 * num2;
    });

    console.log(res);
};

partOne(data);