import axios from 'axios';
import './App.scss';
import { SudokuContainer } from './sudoku-components/SudokuContainer';
import { useEffect } from 'react';

const INITIAL_GRID = '302401809001000300000000000040708010780502036000090000200609003900000008800070005';
const SOLVED_GRID = '372451869691827354458936271543768912789512436126394587215689743937145628864273195';

function initialCall() {
  axios.get('http://localhost:8080').then((res) => {
    console.log(res);
  })
}

function App() {
  useEffect(() => {
    initialCall();
  })

  return (
    <div className='main-container'>
      <SudokuContainer initialSudokuWord={INITIAL_GRID} />
    </div>
  );
}

export default App;
