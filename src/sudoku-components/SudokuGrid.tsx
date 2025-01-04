import './SudokuGrid.scss';
import { SudokuCell } from "./SudokuCell";
import type { SelectedCell, SudokuGrid } from "./SudokuContainer";

interface SudokuGridProps {
  currentGrid: SudokuGrid;
  initialCellsCoordinates: SelectedCell[];
  selectedCell: SelectedCell;
  setSelectedCell: (x: number, y: number) => void;
}

export function SudokuGrid({ currentGrid, initialCellsCoordinates, selectedCell, setSelectedCell }: SudokuGridProps) {
  return (
    <div className="sudoku-grid">
      {currentGrid.map((rowContent, indexY) => rowContent.map((cellContent, indexX) =>
        <SudokuCell
          key={indexX.toString() + indexY.toString()}
          content={cellContent}
          cellCoordinates={{x: indexX, y: indexY}}
          initialCellsCoordinates={initialCellsCoordinates}
          cellIsSelected={selectedCell.x === indexX && selectedCell.y === indexY}
          setSelectedCell={setSelectedCell}
        />
      ))}
    </div>
  )
}