import useRouterElements from "./routes/elements";
import Loading from "./components/ui/loading";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  const elements = useRouterElements();
  return (
    <>
      <ScrollToTop />
      {elements}
      <Loading />
    </>
  );
}

export default App;
