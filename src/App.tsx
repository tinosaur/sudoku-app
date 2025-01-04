import './App.scss';
import { SudokuContainer } from './sudoku-components/SudokuContainer';


const INITIAL_GRID = '302401809001000300000000000040708010780502036000090000200609003900000008800070005';

function App() {
  
  return (
    <div className='main-container'>
      <SudokuContainer initialGrid={INITIAL_GRID} />
    </div>
  );
}

export default App;
