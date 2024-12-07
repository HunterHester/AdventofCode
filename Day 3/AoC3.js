//problem: https://adventofcode.com/2024/day/3

const file = Bun.file('input.txt');
const data = await file.text();

// const data = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
// const data = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?do()mul(8,5))";

var partOne = function(data) {
    const pattern = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;
    let res = 0;

    const matches = [...data.matchAll(pattern)];
    matches.forEach((match, index) => {
        // console.log(`Match ${index + 1}: ${match[0]}, Numbers: ${match[1]}, ${match[2]}`);
    });

    matches.forEach(match => {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        res += num1 * num2;
    });

    console.log(res);
};

var partTwo = function (data) {
    const mulPattern = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/;
    const controlPattern = /\bdo\(\)|\bdon't\(\)/g; // Matches either `do()` or `don't()`
    let doToggle = true;
    let res = 0;

    // Combine patterns to match both `mul()` and control instructions sequentially
    const instructionPattern = new RegExp(`${mulPattern.source}|${controlPattern.source}`, 'g');
    const instructions = [...data.matchAll(instructionPattern)];

    instructions.forEach(instruction => {
        const match = instruction[0]; // Full match string
        // console.log("Processing:", match);

        if (/do\(\)/.test(match)) {
            doToggle = true; 
            // console.log("do() enabled.");
        } else if (/don't\(\)/.test(match)) {
            doToggle = false; 
            // console.log("do() disabled.");
        } else if (mulPattern.test(match)) {
            // Process `mul()` only if enabled
            if (doToggle) {
                const [, num1, num2] = match.match(mulPattern);
                const product = parseInt(num1) * parseInt(num2);
                res += product;
            }
        }
    });

    console.log(res)
};

partOne(data);
partTwo(data);