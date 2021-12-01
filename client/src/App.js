import './App.css';
import { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import MainPage from './pages/MainPage/MainPage';
import CompletePage from './pages/CompletePage/CompletePage'
import { OrderContextProvider } from './contexts/OrderContext'


function App() {
  const [step, setStep] = useState(0)
  return (
    <div style={{padding: 0, margin: 0}}>
        <Header/>
        <OrderContextProvider>
          { step === 0 && <MainPage setStep={setStep} /> }
          { step === 1 && <CompletePage setStep={setStep}/> }
        </OrderContextProvider>
        <Footer/>
    </div>
  );
}

export default App;
