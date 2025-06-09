import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-red-400 w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold underline text-center p-10">Hello Dũng nè!</h1>
      <Button type="primary" shape="circle">
        Click me!
      </Button>
    </div>
  );
}

export default App;
