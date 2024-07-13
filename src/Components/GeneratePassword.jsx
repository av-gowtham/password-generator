import { useEffect, useState } from "react";

function GeneratePassword() {
  const [length, setLength] = useState(10);
  const [upperCheckbox, setUpperCheckbox] = useState(true);
  const [lowerCheckbox, setLowerCheckbox] = useState(true);
  const [numberCheckbox, setNumberCheckbox] = useState(true);
  const [symbolCheckbox, setSymbolCheckbox] = useState(true);
  const [password, setPassword] = useState("");

  function handleGenerate() {
    let charSet = "";
    if (upperCheckbox) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowerCheckbox) charSet += "abcdefghijklmnopqrstuvwxyz";
    if (numberCheckbox) charSet += "01234567890123456789";
    if (symbolCheckbox) charSet += "!@#$%^&*()_-+={}[]|/:;.,<>?~`";

    if (!upperCheckbox && !lowerCheckbox && !numberCheckbox && !symbolCheckbox)
      return alert("Check any one of the boxes");

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[index];
    }

    setPassword(generatedPassword);
  }

  function handleCopy() {
    navigator.clipboard.writeText(password);
    alert("Your password has been copied");
  }

  useEffect(() => handleGenerate, []);

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="input-group">
        <label htmlFor="num">Password Length:</label>
        <input
          type="number"
          id="num"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="uppercase"
          checked={upperCheckbox}
          onChange={(e) => setUpperCheckbox(e.target.checked)}
        />
        <label htmlFor="uppercase">include Uppercase</label>
      </div>
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="lowercase"
          checked={lowerCheckbox}
          onChange={(e) => setLowerCheckbox(e.target.checked)}
        />
        <label htmlFor="lowercase">include Lowercase</label>
      </div>
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="numbers"
          checked={numberCheckbox}
          onChange={(e) => setNumberCheckbox(e.target.checked)}
        />
        <label htmlFor="numbers">include Numbers</label>
      </div>
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="symbols"
          checked={symbolCheckbox}
          onChange={(e) => setSymbolCheckbox(e.target.checked)}
        />
        <label htmlFor="symbols">include Symbols</label>
      </div>
      <button className="generate-btn" onClick={handleGenerate}>
        Generate Password
      </button>
      <div className="generated-password">
        <input type="text" readOnly value={password} />
        <button className="copy-btn" onClick={handleCopy}>
          Copy
        </button>
      </div>
    </div>
  );
}

export default GeneratePassword;
