import { useRef } from "react";
import Buttons from "./components/Buttons";

function App() {
  const containerRef = useRef('');

  const colors = [
    '#ff0000',
    '#fef65b',
    '#00ff00',
    '#8d5959',
    '#000000',
    '#ffffff',
    '#a3b8c8',
    '#ec8f7f'
  ];

  const clickHandler = (e) => {
    const color = e.target.textContent;
    containerRef.current.style.backgroundColor = color;
  }

  return(
    <div className='container' ref={containerRef}>
      <div className="buttons">
        <Buttons buttonColors={colors} clickHandler={clickHandler} />
      </div>
    </div>
  );
}

export default App;