function App() {
  const generatePara = (e) => {
    e.preventDefault();

    const wordCount = e.target.querySelector('#number-input').value;

    if (!validInput(wordCount)) {
      displayError();
      return;
    }

    const para = generateWords(wordCount);
    
    document.querySelector('.generated-para').textContent = para;
  }

  return (
    <div>
      <form onSubmit={generatePara} >
        <label htmlFor="number-input">Word Count</label>
        <input id='number-input' type="number" min={0} max={2000} />

        <button type="submit">Generate</button>
      </form>

      <div className="generated-para">

      </div>
    </div>
  );
}

// Helper functions
const validInput = (wordCount) => {
  return wordCount >= 1 && wordCount <= 1000;
}

const displayError = () => {
  const element = document.querySelector('.generated-para');
  element.classList.add('error');
  element.textContent = 'Invalid input. Value must be between 0 to 1000.';
} 

const generateWords = (wordCount) => {
  const loremIpsumWords = [
    'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
    'adipisicing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
    'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'
    // Add more words as needed
  ];

  const loremIpsum = Array.from({ length: wordCount }, (_, index) => loremIpsumWords[index % loremIpsumWords.length]).join(' ');
  return loremIpsum;
}

export default App;