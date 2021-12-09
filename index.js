const fs = require('fs');
const buffer = fs.readFileSync('real-data.txt');
let data = buffer.toString().split('\n');
data = data
  .map((item) => item.split(' -> '))
  .map((arr) => {
    return arr.map((item) => item.split(','));
  });

const track = {};

for (let i = 0; i < data.length; i++) {
  const first = data[i][0];
  const second = data[i][1];
  if (checkIsOnlyXY(first, second)) {
    incrementNums(first, second);
  } else {
    handleDiagonal(first, second);
  }
}
let sum = 0;
Object.keys(track).forEach((item) => {
  if (track[item] > 1) {
    sum += 1;
  }
});
// console.log(track);
console.log(sum);

function incrementNums(first, second) {
  let x1 = +first[0];
  let x2 = +second[0];
  let y1 = +first[1];
  let y2 = +second[1];
  if (x1 > x2) {
    // 9,4 3,4
    checkAndAdd(`${x2},${y2}`);
    const diff = x1 - x2;
    for (let i = 0; i < diff; i++) {
      x2 += 1;
      const num = `${x2},${y2}`;
      checkAndAdd(num);
    }
  }
  if (x1 < x2) {
    // 0,9 5,9
    checkAndAdd(`${x1},${y1}`);
    const diff = x2 - x1;
    for (let i = 0; i < diff; i++) {
      x1 += 1;
      const num = `${x1},${y1}`;
      checkAndAdd(num);
    }
  }
  if (y1 > y2) {
    // 2,2 2,1
    checkAndAdd(`${x2},${y2}`);
    const diff = y1 - y2;
    for (let i = 0; i < diff; i++) {
      y2 += 1;
      const num = `${x2},${y2}`;
      checkAndAdd(num);
    }
  }
  if (y1 < y2) {
    // x1,y1 -> x2,y2
    // 7,0 7,4
    checkAndAdd(`${x1},${y1}`);
    const diff = y2 - y1;
    for (let i = 0; i < diff; i++) {
      y1 += 1;
      const num = `${x1},${y1}`;
      checkAndAdd(num);
    }
  }
}

function checkIsOnlyXY(first, second) {
  const x1 = first[0];
  const x2 = second[0];
  const y1 = first[1];
  const y2 = second[1];
  return x1 === x2 || y1 === y2;
}

function checkAndAdd(num) {
  if (track[num]) {
    track[num] += 1;
  } else {
    track[num] = 1;
  }
}

function handleDiagonal(first, second) {
  let x1 = +first[0];
  let x2 = +second[0];
  let y1 = +first[1];
  let y2 = +second[1];
  if (x1 > x2 && y1 < y2) {
    checkAndAdd(`${x1},${y1}`);
    while (x1 !== x2 && y1 !== y2) {
      x1 -= 1;
      y1 += 1;
      const num = `${x1},${y1}`;
      checkAndAdd(num);
    }
  }

  if (x1 > x2 && y1 > y2) {
    checkAndAdd(`${x1},${y1}`);
    while (x1 !== x2 && y1 !== y2) {
      x1 -= 1;
      y1 -= 1;
      const num = `${x1},${y1}`;
      checkAndAdd(num);
    }
  }

  if (x1 < x2 && y1 > y2) {
    checkAndAdd(`${x1},${y1}`);
    while (x1 !== x2 && y1 !== y2) {
      x1 += 1;
      y1 -= 1;
      const num = `${x1},${y1}`;
      checkAndAdd(num);
    }
  }
  if (x1 < x2 && y1 < y2) {
    checkAndAdd(`${x1},${y1}`);
    while (x1 !== x2 && y1 !== y2) {
      x1 += 1;
      y1 += 1;
      const num = `${x1},${y1}`;
      checkAndAdd(num);
    }
  }
}
