import Homepage from "./pages/homepage/Homepage.component"
import Header from "./components/header/Header.component"
function App() {
  document.title = "Nasa Project"
  return (
    <div className="nasa-project">
      <Header />
      <Homepage />
    </div>
  )
}

export default App
