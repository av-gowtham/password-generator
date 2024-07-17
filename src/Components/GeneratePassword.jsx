import { useEffect, useState } from "react";

function GeneratePassword() {
  const [length, setLength] = useState(10);
  const [upperCheckbox, setUpperCheckbox] = useState(true);
  const [lowerCheckbox, setLowerCheckbox] = useState(true);
  const [numberCheckbox, setNumberCheckbox] = useState(true);
  const [symbolCheckbox, setSymbolCheckbox] = useState(true);
  const [password, setPassword] = useState("");

  function handleGenerate() {
    if (length < 4) {
      const selectedOptionsCount =
        (upperCheckbox ? 1 : 0) +
        (lowerCheckbox ? 1 : 0) +
        (numberCheckbox ? 1 : 0) +
        (symbolCheckbox ? 1 : 0);

      if (selectedOptionsCount > length) {
        alert("Checkbox and Password length are mismatching");
        return;
      }
    }

    if (
      !upperCheckbox &&
      !lowerCheckbox &&
      !numberCheckbox &&
      !symbolCheckbox
    ) {
      alert("Check any one of the boxes");
      return;
    }

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_-+={}[]|/:;.,<>?~`";

    let charSet = "";
    if (upperCheckbox) charSet += uppercase;
    if (lowerCheckbox) charSet += lowercase;
    if (numberCheckbox) charSet += numbers;
    if (symbolCheckbox) charSet += symbols;

    let generatedPassword = generatePassword();

    while (!passwordMeetsRequirement(generatedPassword)) {
      generatedPassword = generatePassword();
    }

    console.log("Generated Password:", generatedPassword);
    setPassword(generatedPassword);

    function generatePassword() {
      let password = "";
      for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * charSet.length);
        password += charSet[index];
      }
      return password;
    }

    function passwordMeetsRequirement(password) {
      let hasUppercase = false;
      let hasLowercase = false;
      let hasNumber = false;
      let hasSymbol = false;

      for (let char of password) {
        if (uppercase.includes(char)) hasUppercase = true;
        if (lowercase.includes(char)) hasLowercase = true;
        if (numbers.includes(char)) hasNumber = true;
        if (symbols.includes(char)) hasSymbol = true;
      }

      return (
        (!upperCheckbox || hasUppercase) &&
        (!lowerCheckbox || hasLowercase) &&
        (!numberCheckbox || hasNumber) &&
        (!symbolCheckbox || hasSymbol)
      );
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(password);
    alert("Your password has been copied");
  }

  useEffect(() => handleGenerate(), []);

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
