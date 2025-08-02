
import React from 'react'
import config from './config/env'
function App() {
  return (
    <div className='text-4xl font-semibold text-amber-300 text-center my-40'>
      Welcome Shivam {config.appName} {config.nodeEnv} test12
    </div>
  )
}

export default App




// import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { store } from './store/store';
// import Home from './pages/Home';
// import News from './pages/news/News';
// import Jobs from './pages/jobs/Jobs';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import Solutions from './pages/Solutions';
// import Company from './pages/Company';
// import Resources from './pages/Resources';
// import TermsService from './pages/TermsService';
// import CookiePolicy from './pages/CookiePolicy';
// import Hire from './pages/platforms/Hire';
// import Campus from './pages/platforms/Campus';
// import Career from './pages/platforms/Career';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import VerifyOTP from './pages/auth/VerifyOTP';
// import ResetPassword from './pages/auth/ResetPassword';
// import Profile from './pages/auth/Profile';

// function App() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           <Route path="/verify-otp" element={<VerifyOTP />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/jobs" element={<Jobs />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path='/solutions' element={<Solutions/>}/>
//           <Route path='/resources' element={<Resources/>}/>
//           <Route path='/company' element={<Company/>}/>
//           <Route path='/platforms/hire' element={<Hire/>}/>
//           <Route path='/platforms/campus' element={<Campus/>}/>
//           <Route path='/platforms/career' element={<Career/>}/>
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms-service" element={<TermsService />} />
//           <Route path="/cookie-policy" element={<CookiePolicy />} />
//         </Routes>
//         <ToastContainer position="top-right" autoClose={3000} />
//       </Router>
//     </Provider>
//   );
// }

// export default App;

