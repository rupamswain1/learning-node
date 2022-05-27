import Homepage from "./pages/homepage/Homepage.component"
import Header from "./components/header/Header.component";
import LaunchPage from "./pages/launchPage/launchPage.component";
import HistoryPage from "./pages/historyPage/historyPage.component";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
function App() {
  document.title = "Nasa Project"
  return (
    <div className="nasa-project">

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/launch" element={<LaunchPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
