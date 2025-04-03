import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/predict", { input });
      setOutput(response.data.output);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setOutput("Error occurred!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>ML Model Prediction</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input"
      />
      <button onClick={handleSubmit}>Submit</button>
      <h3>Output: {output}</h3>
    </div>
  );
}

export default App;
