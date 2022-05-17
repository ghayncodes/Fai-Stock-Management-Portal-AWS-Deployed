import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/Navigation/NavBar';

import Dashboard from './pages';
import Orders from './pages/orders';
import Statistics from './pages/statistics';

class App extends React.Component <any,any> {

   render() {
      return(
         <BrowserRouter>
            <NavBar />
            <ToastContainer 
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />
            <Routes>
               <Route path="/" element={ <Dashboard/> }/>
               <Route path="/orders" element={ <Orders/> }/> 
               <Route path="/statistics" element={ <Statistics/> }/>
            </Routes>
         </BrowserRouter>
      );
   }
}

ReactDOM.render(<App/>, document.getElementById('app'));