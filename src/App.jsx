import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css';
import ChatBot from './pages/chatbot/chatBot'; // Import this


import Navbar from './components/Navbar';
import Recipes from './pages/recipes/Recipes'
import Scanner from './pages/scanner/Scanner.tsx';
import History from './pages/history/History';
import Header from './components/Header';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/scan" element={<Recipes />} />
          {/* <Route path="/history" element={<History />} /> */}
          {/* <Route path="/history" element={<Recipes />} /> */}
          <Route path="/chatbot" element={<ChatBot />} />

          
        

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
