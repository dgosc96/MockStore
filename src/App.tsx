import "./App.css";
import { Header, Footer } from "./components/";
import { NavRoutes } from "./navigation";

function App() {
  return (
    <>
      <Header />
      <NavRoutes />
      <Footer />
    </>
  );
}

export default App;
