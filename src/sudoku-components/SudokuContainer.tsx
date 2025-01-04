import { useEffect, useMemo, useState } from "react";
import { SudokuGrid } from "./SudokuGrid";
import { NumbersRow } from "./NumbersRow";
import './SudokuContainer.scss';

interface SudokuContainerProps {
  initialGrid: string;
}

export type SudokuGrid = string[][];

export type SelectedCell = {
  x: number,
  y: number,
};

function splitWordIntoRows(sudokuWord: string): string[] {
  const rows: string[] = [];

  for (let i = 1; i <= sudokuWord.length; i++) {
    if (i % 9 === 0) {
      rows.push(sudokuWord.substring(i - 9, i));
    }
  }

  return rows;
}

const splitWordIntoGrid = (sudokuWord: string): SudokuGrid => splitWordIntoRows(sudokuWord).map((row) => row.split(''));

function placeNumberInCell(numberToPlace: number, selectedCellCoordinates: { x: number, y: number }, currentGrid: SudokuGrid): SudokuGrid {
  currentGrid[selectedCellCoordinates.y][selectedCellCoordinates.x] = numberToPlace.toString();
  return [...currentGrid];
}

export function SudokuContainer({ initialGrid }: SudokuContainerProps) {
  const transformedInitialGrid = useMemo(() => splitWordIntoGrid(initialGrid), [initialGrid]);
  const [currentGrid, setCurrentGrid] = useState<SudokuGrid>();
  const [selectedCell, setSelectedCell] = useState<SelectedCell>();
  const initialCellsCoordinates = useMemo(() => {
    const addresses: SelectedCell[] = [];
    transformedInitialGrid.forEach((row, indexY) => row.forEach((cell, indexX) => {
      if (cell !== '0') addresses.push({x: indexX, y: indexY});
    }));
    return addresses;
  }, [transformedInitialGrid])

  useEffect(() => setCurrentGrid(transformedInitialGrid), [transformedInitialGrid]);
  console.log(initialCellsCoordinates)

  return (
    <div className='sudoku-container'>
      <SudokuGrid
        currentGrid={currentGrid ?? []}
        initialCellsCoordinates={initialCellsCoordinates}
        selectedCell={selectedCell ?? {x: -1, y: -1}}
        setSelectedCell={(selectedX, selectedY) => setSelectedCell(selectedX === -1 ? undefined : {x: selectedX, y: selectedY})}
      />
      <NumbersRow onClick={(numberToPlace) => {
        if (!selectedCell) return;
        setCurrentGrid((prev) => placeNumberInCell(numberToPlace, selectedCell, prev!))
      }}/>
    </div>
  )
}