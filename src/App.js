import { useState, useMemo } from "react";

import "./App.css";

const pad = (str = "", width, z = "0") => {
  return str.length >= width
    ? str
    : new Array(width - str.length + 1).join(z) + str;
};

function App() {
  const [hex1, setHex1] = useState("");
  const [hex2, setHex2] = useState("");

  const sum = useMemo(() => {
    let carry = 0,
      res = "";
    const length = Math.max(hex1.length, hex2.length);
    const newHex1 = pad(hex1, length);
    const newHex2 = pad(hex2, length);

    for (let i = length - 1; i >= 0; i--) {
      const d = parseInt(newHex1[i], 16) + parseInt(newHex2[i], 16) + carry;
      carry = d >> 4;
      res = (d & 15).toString(16) + res;
    }
    return carry > 0 ? carry + res : res;
  }, [hex1, hex2]);

  return (
    <div className="App">
      <h2>Sum</h2>
      <input value={hex1} onChange={(e) => setHex1(e.target.value)} />
      {" + "}
      <input value={hex2} onChange={(e) => setHex2(e.target.value)} />
      {" = "}
      <div>{sum}</div>
    </div>
  );
}

export default App;
