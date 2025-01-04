import classNames from 'classnames';
import './SudokuCell.scss';
import { useMemo } from 'react';
import { SelectedCell } from './SudokuContainer';

interface SudokuCellProps {
  content: string;
  initialCellsCoordinates: SelectedCell[];
  cellCoordinates: SelectedCell;
  cellIsSelected: boolean;
  setSelectedCell: (x: number, y: number) => void;
}

export function SudokuCell({ content, initialCellsCoordinates, cellCoordinates, cellIsSelected, setSelectedCell }: SudokuCellProps) {
  const cellIsInitial = useMemo(() => initialCellsCoordinates.filter((address) => address.x === cellCoordinates.x && address.y === cellCoordinates.y).length === 1, [initialCellsCoordinates]);

  return (
    <div
      className={classNames('sudoku-cell', {'initial': cellIsInitial, 'selected': cellIsSelected})}
      onClick={() => setSelectedCell(cellIsInitial ? -1 : cellCoordinates.x, cellCoordinates.y)}
    >
      {content === '0' ? '' : content}
    </div>
  )
}