const CheckMatch = (row1, row2, row3) => {
  let k = [...row1];
  let l = [...row2];
  let m = [...row3];
  let table = [k, l, m];

  /* check rows*/
  for (let i = 0; i < table.length; i++) {
    let satir = table[i];
    for (let j = 0; j < satir.length; j++) {
      if (
        satir[j] === satir[j + 1] &&
        satir[j + 1] === satir[j + 2] &&
        satir[j] !== ''
      ) {
        // console.log(i + 1 + '. satirda oyun biter');
        return {
          coords: [
            [i, j],
            [i, j + 1],
            [i, j + 2],
          ],
          name: satir[j],
        };
      }
    }
  }

  /*check columns*/
  for (let i = 0; i < table.length; i++) {
    let cell = table[0][i];
    if (cell === table[1][i] && cell === table[2][i] && cell !== '') {
      // console.log(i + 1 + '. sutundaki oyun biter');
      return {
        coords: [
          [0, i],
          [1, i],
          [2, i],
        ],
        name: cell,
      };
    }
  }

  /* check left diagonal algorithms */
  for (let i = 0; i < 3; i++) {
    if (
      k[0] === l[1] &&
      l[1] === m[2] &&
      (k[0] !== '' || l[1] !== '' || m[2] !== '')
    ) {
      // console.log('1. soldan capraz kosegen oyun biter');
      return {
        coords: [
          [0, 0],
          [1, 1],
          [2, 2],
        ],
        name: k[0],
      };
    }
  } /* check right diagonal algorithms */
  for (let i = 0; i < 3; i++) {
    if (
      m[0] === l[1] &&
      l[1] === k[2] &&
      (k[2] !== '' || l[1] !== '' || m[0] !== '')
    ) {
      // console.log('2. sagdan capraz kosegen oyun biter');
      return {
        coords: [
          [2, 0],
          [1, 1],
          [0, 2],
        ],
        name: m[0],
      };
    }
  }

  return { coords: [], name: '' };
};

export default CheckMatch;
