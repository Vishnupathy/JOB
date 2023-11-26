import './App.css';
import CreateJob from './pages/createJob/CreateJob';
import Details from './pages/details/Details';
import JobListing from './pages/jobListing/JobListing';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import store from './redux/Store';
import { Provider } from 'react-redux';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/job" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/job" element={<JobListing />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/job/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
