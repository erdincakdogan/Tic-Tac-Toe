import React, { useEffect, useState } from 'react';
import CheckMatch from '../utils/CheckMatch';


const GameContainer = () => {
  const [table, setTable] = useState([]);
  const [winner, setWinner] = useState({ coords: [], name: '' });

  useEffect(() => {
    /* create an empty table on page load*/
    setTable([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
  }, []);

  /* styling for mouse moments */
  const onMouseEnterHandler = (event) => {
    if (event.target.innerText === '') {
      event.target.className = 'cell mouse-over-empty';
    } else if (event.target.innerText === 'X') {
      event.target.className = 'cell mouse-over-filled-x';
    }
    if (event.target.innerText === 'O') {
      event.target.className = 'cell mouse-over-filled-o';
    }
  };
  const onMouseLeaveHandler = (event) => {
    if (event.target.innerText === '') {
      event.target.className = 'cell';
    }
    if (event.target.innerText === 'X') {
      event.target.className = 'cell x-filled';
    }
    if (event.target.innerText === 'O') {
      event.target.className = 'cell o-filled';
    }
  };
  const clickHandler = (event) => {
    const row = event.target.attributes.row.value;
    const col = event.target.attributes.col.value;
    /* logic for filling cells*/
    const squares = [...table];
    if (winner.name !== '') {
      setTable([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]);
      setWinner({ coords: [], name: '' });
      return;
    } else if (event.target.innerText === '') {
      /*if the cell is empty, fill with X*/
      squares[row][col] = 'X';
      setTable(squares);
      event.target.className = 'cell mouse-over-filled-x';
    } else if (event.target.innerText === 'X') {
      /*if the cell is X, fill with O*/
      squares[row][col] = 'O';
      setTable(squares);
      event.target.className = 'cell mouse-over-filled-o';
    } else {
      /*if the cell is O, fill with empty*/
      squares[row][col] = '';
      setTable(squares);
      event.target.className = 'cell mouse-over-empty';
    }
    setWinner(CheckMatch(table[0], table[1], table[2]));
  };

  return (
    <>
      <div className="game--container">
        {table.map((x, i) => {
          return x.map((y, j) => {
            return (
              <div
                key={'row' + i + 'col' + j}
                row={i}
                col={j}
                className={'cell'}
               // [[0.0],[0.1],[0.2]]
                style={{
                  borderColor:
                    (winner.coords.filter((coord) => btoa(coord) === btoa([i, j]))
                      .length > 0 &&
                      winner.name === 'X' &&
                      'red') ||
                    (winner.coords.filter((coord) => btoa(coord) === btoa([i, j]))
                      .length > 0 &&
                      winner.name === 'O' &&
                      'blue'),
                }}
                onClick={clickHandler}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
              >
                {[x, y]}
              </div>
            );
          });
        })}
      </div>

    </>
  );
};

export default GameContainer;
