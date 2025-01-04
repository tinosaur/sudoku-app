import { Number } from "./Number";
import './NumbersRow.scss';

interface NumbersRowProps {
  onClick: (numberToPlace: number) => void;
}

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function NumbersRow({ onClick }: NumbersRowProps) {
  return (
    <div className='numbers-container'>
      {NUMBERS.map((numberToPlace) => <Number key={numberToPlace} content={numberToPlace} onClick={() => onClick(numberToPlace)} />)}
    </div>
  )
}