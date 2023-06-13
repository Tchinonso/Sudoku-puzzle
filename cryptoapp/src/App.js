import CyConverter from "./components/CyConverter";
import NewsFeed from "./components/NewsFeed";




function App() {
  return (
    <div className="App">
      <h1>Crypto Dashboard</h1>
     <div className="wrapper">
     <CyConverter />
      <NewsFeed />
     </div>
    </div>
  );
}

export default App;
