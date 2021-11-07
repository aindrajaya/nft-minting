import React, { useState } from "react";

function App2() {
  const [state, setState] = useState("CLICK ME");

  return <button onClick={() => alert("CLICKED")}>{state}</button>;
}

export default App2