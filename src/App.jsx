import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './Components/Auth/Login';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;