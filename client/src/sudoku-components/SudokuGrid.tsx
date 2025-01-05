import { SudokuCell } from "./SudokuCell";
import type { SudokuGrid } from "./SudokuContainer";
import { Dispatch, SetStateAction } from 'react';

interface SudokuGridProps {
  currentGrid: SudokuGrid;
  setCurrentGrid: Dispatch<SetStateAction<SudokuGrid | undefined>>;
}

export function SudokuGrid({ currentGrid, setCurrentGrid }: SudokuGridProps) {
  return (
    <div className="sudoku-grid">
      {currentGrid.map((row) => row.map((cell) =>
        <SudokuCell
          key={cell.coordinates.y.toString() + cell.coordinates.x.toString()}
          cell={cell}
          setCurrentGrid={setCurrentGrid}
        />
      ))}
    </div>
  )
}