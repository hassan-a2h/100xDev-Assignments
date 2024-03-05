function Buttons({ buttonColors, clickHandler }) {
  return (
    <>
      {
        buttonColors.map((color, index) => <Button key={index} color={color} changeBodyColor={clickHandler} />)
      }
    </>
  );
}

// Child Components
function Button({ color, changeBodyColor }) {
  return (
    <button onClick={changeBodyColor}>{color}</button>
  );
}

export default Buttons;