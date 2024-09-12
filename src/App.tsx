import {Suspense, lazy} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";

// App imports
import {store} from "./app/store"
import Loading from "./components/Loading";
import ResetPassword from "./pages/ResetPassword";
import Banquet from "./pages/Banquet";
import Vacancies from "./pages/Vacancies";
import Interior from "./pages/Interior";

const Welcome = lazy(() => import("./pages/Welcome"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const SignUp = lazy(() => import("./pages/SignUp"))
const Login = lazy(() => import("./pages/Login"))
const SuccessPage = lazy(() => import("./pages/SuccessPage"))
const Products = lazy(() => import("./pages/Products"))
const Product = lazy(() => import("./pages/Product"))
const Cart = lazy(() => import("./pages/Cart"))
const Settings = lazy(() => import("./pages/Settings"))
const Contacts = lazy(() => import("./pages/Contacts"))
const Orders = lazy(() => import("./pages/Orders"))
const ConfirmOrder = lazy(() => import("./pages/ConfirmOrder"))
const Checkout = lazy(() => import("./pages/Checkout"))
const Admin = lazy(() => import("./pages/Admin/Admin"))
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"))
const DashboardMenu = lazy(() => import("./pages/Admin/DashboardMenu"))
const ForgotPass = lazy(() => import("./pages/ForgotPass"))

// TODO: Add ErrorBoundary above Suspense in case if some of that will not load.
function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<Loading/>}>
            <Routes>
              <Route path='/' element={<Welcome/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/signup-success' element={<SuccessPage type='signup'/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/forget-password' element={<ForgotPass/>}/>
              <Route path='/reset-password/:hash' element={<ResetPassword/>}/>
              <Route path='/categories/:id' element={<Products/>}/>
              <Route path='/products/:id' element={<Product/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/settings' element={<Settings/>}/>

              <Route path='/banquet' element={<Banquet/>}/>
              <Route path='/vacancies' element={<Vacancies/>}/>

              <Route path='/contacts' element={<Contacts/>}/>
              <Route path='/interior' element={<Interior/>}/>
              <Route path='/orders' element={<Orders/>}/>
              <Route path='/confirm-order' element={<ConfirmOrder/>}/>
              <Route path='/checkout' element={<Checkout/>}/>
              <Route path='/admin' element={<Admin/>}/>
              <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
              <Route path='/admin-dashboard/menu' element={<DashboardMenu/>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;