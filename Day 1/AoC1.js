// problem: https://adventofcode.com/2024/day/1

const file = Bun.file('input.txt');
const data = await file.text();

var sortHelper = function(data){
  const lines = data.trim().split("\n");

  const leftArray = [];
  const rightArray = [];
  
  lines.forEach(line => {
    const [left, right] = line.trim().split(/\s+/).map(Number);
    leftArray.push(left);
    rightArray.push(right);
  });

  return { leftArray, rightArray }
}

var partOne = function(data) {

  const { leftArray, rightArray } = sortHelper(data);

  leftArray.sort((a, b) => a -b)
  rightArray.sort((a, b) => a -b)
  
  let res = 0
  for(let i = 0; i < leftArray.length; i++){
      res += (Math.abs(leftArray[i] - rightArray[i]));
  }
  
  console.log(res)
}

var partTwo = function(data){
  const { leftArray, rightArray } = sortHelper(data);
  
  const map = new Map();
  for(let i = 0; i < rightArray.length; i++) {
    if(!map.has(rightArray[i])){
      map.set(rightArray[i], 1);
    } else {
      map.set(rightArray[i] ,map.get(rightArray[i]) + 1);
    }
  }

  let res = 0;

  for(let i = 0; i < leftArray.length; i++){
    if(map.has(leftArray[i])){
      res += (leftArray[i] * map.get(leftArray[i]))
    }
  }

  console.log(res)
}

partOne(data);
partTwo(data);