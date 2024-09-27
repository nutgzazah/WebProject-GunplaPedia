import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


//Layout
import { CssBaseline } from "@mui/material";

import FormProduct from './components/FormProduct';
import FormEditProduct from './components/FormEditProduct';
import FormTechnique from './components/FormTechnique';

//admin
import HomePageAdmin from './components/pages/admin/HomePageAdmin';
import ManageUser from './components/pages/admin/ManageUser';

//user
import HomePageUser from './components/pages/user/HomePageUser';

//routes
import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';

//function
import { currentUser } from "./functions/auth"
import { useDispatch } from 'react-redux';
import { login } from './store/userSlice';

//comp
import Navbar from '../src/components/comp/header/Navbar'
import Footer from '../src/components/comp/bottom/footer'

//pages
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Notfound404 from './components/pages/Notfound404';
import Home from './components/pages/Home';
import Gunpla from './components/pages/gunpla/Gunpla';
import Collection from './components/pages/collection/Collection'
import Account from './components/pages/user/Account'
import Techniques from './components/pages/techniques/Techniques'
import Blogtech from './components/pages/techniques/blogtech/Blogtech'
import GunplaDetails from './components/pages/user/details/GunplaDetails'
import Collection_GunplaDetails from './components/pages/collection/Collection_GunplaDetails';
import FormEditTechnique from './components/FormEditTechnique';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  // javascript
  const dispatch = useDispatch()

  const idToken =  localStorage.getItem('token')
  console.log(idToken)
  currentUser(idToken).then(res=>{
    console.log(res)
    dispatch(login({
      name:res.data.name,
      role:res.data.role,
      token:idToken,
    }))
  }).catch(err=>console.log(err))

  return (
    <BrowserRouter>
    

    <>
      <CssBaseline />
      { /* Publish */}
    <Navbar/>
    <Routes >
        <Route path='*' element={<Notfound404/>} />
        <Route path='/' element={
          <>
        <Home/>
          </>
        } />
        <Route path="/gunpla" element={<Gunpla />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/techniques' element={<Techniques/>}/>


        { /* User */}

        <Route path='/collection' element={
        <UserRoute>
          <Collection/>
        </UserRoute>
        } />

        <Route path='/account' element={
        <UserRoute>
          <Account/>
        </UserRoute>
        } />

        <Route path="/gunpla/:id" element={
          <UserRoute>
            <GunplaDetails />
          </UserRoute>
        } />
        
        <Route path="/collection/:id" element={
          <UserRoute>
            <Collection_GunplaDetails />
          </UserRoute>
        } />


        <Route path='/techniques/:id' element={
        <UserRoute>
          <Blogtech/>
        </UserRoute>
        } />
      



      { /* Admin */}
        <Route path='/admin/index' element={
        <AdminRoute>
          <HomePageAdmin />
        </AdminRoute>
        } />

        <Route path='/admin/manageuser' element={
        <AdminRoute>
          <ManageUser />
        </AdminRoute>
        } />

        <Route path='/admin/gunpla' element={
        <AdminRoute>
          <FormProduct />
        </AdminRoute>
        } />

        <Route path='/admin/gunpla/edit/:id' element={
        <AdminRoute>
        <FormEditProduct />
        </AdminRoute>
        } />

        <Route path='/admin/technique' element={
        <AdminRoute>
          <FormTechnique />
        </AdminRoute>
        } />

        <Route path='/admin/technique/edit/:id' element={
        <AdminRoute>
          <FormEditTechnique />
        </AdminRoute>
        } />

    </Routes>
    <Footer />

    </>

    </BrowserRouter>
  );
}

export default App;

