// problem: https://adventofcode.com/2024/day/2

const file = Bun.file('input.txt');
const data = await file.text();

const processStr = (data) => {
    return data.split('\n').map(row => 
        row.split(' ').map(num => parseInt(num, 10))
    )
}

const matrix = processStr(data);

// console.log(matrix)

const partOne = function (data) {
    let res = 0;

    for (let i = 0; i < data.length; i++) {
        let level = data[i];
        let isIncrement;
        let isConsistent = true;

        for (let j = 0; j < level.length - 1; j++) {
            if (j === 0) {
                isIncrement = level[j] < level[j + 1];
            }

            const difference = Math.abs(level[j] - level[j + 1]);

            if (difference < 1 || difference > 3) {
                isConsistent = false;
                break;
            }

            if ((level[j] < level[j + 1] && isIncrement) || 
                (level[j] > level[j + 1] && !isIncrement)) {
                continue;
            } else {
                isConsistent = false;
                break;
            }
        }

        if (isConsistent) {
            res += 1; 
        }
    }

    console.log(res);
};

var partTwo = function (data) {
    let res = 0; 

    //helper function for determining validity
    const isValid = (arr) => {

        let isIncrement = arr[1] > arr[0];
        for (let i = 1; i < arr.length; i++) {
            const difference = Math.abs(arr[i] - arr[i - 1]);

            if (difference < 1 || difference > 3) {
                return false;
            }

            // Check if the trend breaks
            if ((arr[i] > arr[i - 1]) !== isIncrement) {
                return false;
            }
        }
        return true;
    };

    for (let i = 0; i < data.length; i++) {
        const level = data[i];

        if (isValid(level)) {
            res += 1;
            continue;
        }

        // Check if removing one element makes it valid
        let isSafe = false;
        for (let j = 0; j < level.length; j++) {

            const newLevel = [...level.slice(0, j), ...level.slice(j + 1)];
            if (isValid(newLevel)) {
                isSafe = true;
                break;
            }
        }

        if (isSafe) {
            res += 1;
        }
    }

    console.log(res);
};

partOne(matrix)
partTwo(matrix)

