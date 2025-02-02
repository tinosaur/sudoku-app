import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import type { SudokuCell, SudokuGrid } from './SudokuContainer';

interface SudokuCellProps {
  cell: SudokuCell;
  setCurrentGrid: Dispatch<SetStateAction<SudokuGrid | undefined>>;
}

export function SudokuCell({ cell, setCurrentGrid }: SudokuCellProps) {
  return (
    <div
      className={classNames('sudoku-cell', {
        'initial': cell.initial,
        'selected':  cell.selected,
        'top-border': cell.coordinates.y % 3 === 0,
        'bottom-border': cell.coordinates.y % 3 === 2,
        'left-border': cell.coordinates.x % 3 === 0,
        'right-border': cell.coordinates.x % 3 === 2,
      })}
      onClick={() => setCurrentGrid((currentGrid) => {
        if (!currentGrid) return currentGrid;

        const currentGridCopy = [...currentGrid];
        const targetRowToUnselect = currentGridCopy.find((row) => row.find((cell) => cell.selected) !== undefined);
        if (targetRowToUnselect !== undefined) {
          const targetCellToUnselect = targetRowToUnselect.find((cell) => cell.selected);
          if (targetCellToUnselect !== undefined) {
            targetCellToUnselect.selected = false;
          }
        }

        cell.selected = true;

        return currentGridCopy;
      })}
    >
      {cell.value === 0 ? '' : cell.value}
    </div>
  )
}