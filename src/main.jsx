import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter ,Routes ,Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import QuizSettings from "./components/QuizSetting.jsx";
import Home from './components/Home.jsx'
import Info from './components/Info.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <Routes>
      <Route path="/quiz" element={<App />} />
      <Route path="/docs/Info/ForIAmZaid/Information's" element={<Info />} />
      <Route path="" element={<Home />} />
      <Route path="/" element={<QuizSettings />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
