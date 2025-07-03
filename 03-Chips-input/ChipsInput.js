import React, { useState } from "react";
import './styles.css'
function ChipsInput() {

  const [inputText, setInputText] = useState("")
  const [chips, setChips] = useState([])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputText.trim() !== "") {

      // hello
      setChips(prev => [...prev, inputText.trim()])
      setInputText("")
    }
  }

  const handleDeleteChip = (index) => {
    // remove value on index from chip
    const copyChips = [...chips]
    copyChips.splice(index, 1)
    setChips(copyChips)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "40px 0" }}>
      <h2>Chips Input</h2>
      <input
        type="text"
        placeholder="Type a chip and press tag"
        style={{ padding: "8px", width: "200px" }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <div style={{ display: "flex" }}>
        {chips.map((chip, index) => <div style={{ background: "gray", margin: "10px", color: "white", padding: "5px 10px", borderRadius: "12px" }}>
          {chip}
          <button style={{
            color: "red", marginLeft: "6px", background: "none",
            border: "none"
          }}
            onClick={() => handleDeleteChip(index)}
          >X</button>
        </div>)}
      </div>
    </div>
  );
}

export default ChipsInput;