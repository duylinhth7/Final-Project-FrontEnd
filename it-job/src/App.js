
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutDefault from './layout/LayoutDefault/LayoutDefault';
import Home from './pages/Home';
import SearchResults from './components/SearchResults/SearchResults';
import JobDetail from './components/JobDetail';
import CompanyDetail from './components/CompanyDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import LayoutAdmin from './layout/LayoutAdmin';
import Dashbord from './pages/Dashboard/Dashbord';
import InfoCompany2 from './components/InfoCompany2';
import JobList from './pages/JobManage/JobList';
import EditJob from './pages/JobManage/EditJob';
import Addjob from './pages/AddJob';
import DetailJob from './pages/JobManage/DetailJob';
import CVList from './pages/CVList/CVList';
import CVDetail from './pages/CVList/CVDetail';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LayoutDefault/>}>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<SearchResults/>} />
        <Route path='/jobs/:id' element={<JobDetail/>} />
        <Route path='/company/:id' element={<CompanyDetail />}  />
        <Route path='/register' element={ <Register />}  />
        <Route path='/login' element={ <Login />}  />
        <Route path='/logout' element={ <Logout />}  />
      </Route>
      
      <Route path='/' element={<LayoutAdmin />}>
        <Route path="/admin" element={<Dashbord />} />
        <Route path="/info-company" element={<InfoCompany2 />} />
        <Route path="/job-manage" element={<JobList />} />
        <Route path="/edit-job" element={<EditJob />} />
        <Route path="/add-job" element={<Addjob />} />
        <Route path="/detail-job/:id" element={<DetailJob />} />
        <Route path="/cv-manage" element={<CVList />} />
        <Route path="/detail-cv/:id" element={<CVDetail />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
