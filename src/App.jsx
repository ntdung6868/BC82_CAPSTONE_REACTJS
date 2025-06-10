import useRouterElements from "./routes/elements";
import Loading from "./components/ui/loading";

function App() {
  const elements = useRouterElements();
  return (
    <>
      {elements}
      <Loading />
    </>
  );
}

export default App;
