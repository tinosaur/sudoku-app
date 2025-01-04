import { useEffect, useMemo, useState } from "react";
import { SudokuGrid } from "./SudokuGrid";
import { NumbersRow } from "./NumbersRow";
import { Erase } from "./Erase";

import './Sudoku.scss';
import './Controls.scss';

interface SudokuContainerProps {
  initialSudokuWord: string;
}

export type SudokuCellCoordinates = {
  x: number,
  y: number,
};

export type SudokuCell = {
  value: number,
  selected: boolean,
  initial: boolean,
  coordinates: SudokuCellCoordinates,
};

export type SudokuGrid = SudokuCell[][];

type SudokuStringGrid = string[][];

function splitWordIntoRows(sudokuWord: string): string[] {
  const rows: string[] = [];

  for (let i = 1; i <= sudokuWord.length; i++) {
    if (i % 9 === 0) {
      rows.push(sudokuWord.substring(i - 9, i));
    }
  }

  return rows;
}

const splitWordIntoStringGrid = (sudokuWord: string): SudokuStringGrid => splitWordIntoRows(sudokuWord).map((row) => row.split(''));

const enrichSudokuStringGrid = (stringGrid: SudokuStringGrid): SudokuGrid => stringGrid.map((row, indexY) => row.map((cell, indexX) => {
  return {
    value: Number(cell),
    selected: false,
    initial: cell !== '0',
    coordinates: {
      x: indexX,
      y: indexY,
    },
  }
}))

const getGridFromSudokuWord = (sudokuWord: string): SudokuGrid => enrichSudokuStringGrid(splitWordIntoStringGrid(sudokuWord));

function placeDigit(digitToPlace: number, currentGrid: SudokuGrid | undefined): SudokuGrid | undefined {
  if (!currentGrid) return currentGrid;

  const currentGridCopy = [...currentGrid];
  const targetRow = currentGridCopy.find((row) => row.find((cell) => cell.selected && !cell.initial) !== undefined);
  if (!targetRow) return currentGrid;

  const targetCell = targetRow.find((cell) => cell.selected && !cell.initial);
  if (!targetCell) return currentGrid;

  targetCell.value = digitToPlace;
  
  return currentGridCopy;
}

export function SudokuContainer({ initialSudokuWord }: SudokuContainerProps) {
  const initialGrid = useMemo(() => getGridFromSudokuWord(initialSudokuWord), [initialSudokuWord]);
  const [currentGrid, setCurrentGrid] = useState<SudokuGrid>();

  useEffect(() => setCurrentGrid(initialGrid), [initialGrid]);

  return (
    <div className='sudoku-container'>
      <SudokuGrid
        currentGrid={currentGrid ?? []}
        setCurrentGrid={setCurrentGrid}
      />
      <NumbersRow onClick={(numberToPlace) => setCurrentGrid((prev) => placeDigit(numberToPlace, prev))} />
      <Erase onClick={() => setCurrentGrid((prev) => placeDigit(0, prev))} />
    </div>
  )
}