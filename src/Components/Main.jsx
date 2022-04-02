// import { Signup } from './SignUp/Signup'
// import Login from './Login/Login'
// import Admin from './Admin/Admin'
// import Booker from './BookerPages/Booker.jsx'
// import AdminBookingPage from './Admin/AdminBookingPage'
// import BookingDetails from './Admin/BookingDetails'
// import Feedback from './Admin/Feedback'

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useRoutes,
// } from "react-router-dom";

// METHOD ONE For Routing
// function Main() {
//   const element = useRoutes([
//     { path: '/', element: <Login /> },
//     { path: '/Signup', element: <Signup /> },
//     {
//       path: 'Admin', element: <Admin />,
//       children: [
//         { path: '', element: <AdminBookingPage /> },
//         { path: 'Bookingdetails', element: <BookingDetails /> },
//         { path: 'Feedback', element: <Feedback /> }
//       ]
//     },

//     { path: 'Booker', element: <Booker />,
//     children:[
//       { path: '', element: <BookingSlots /> },
//       { path: 'MyBooking', element: <MyBooking /> },
//       { path: 'Feedback', element: <AddFeeback /> }
//     ] 
//   }


//   ]);
//   return element
// };

// const AppWrapper = () => {
//   return (
//     <Router>
//       <Main />
//     </Router>
//   );
// };

// export default AppWrapper;

// Method two for Routing
import Protected from './Protected'
import { BookingSlots } from './BookerPages/BookingSlots'
import AddFeeback from './BookerPages/Addfeedback'
import MyBooking from './BookerPages/MyBooking'
import Container from 'react-bootstrap/Container'
import Singnup from './SignUp/Signup'
import Login from './Login/Login'
import Admin from './Admin/Admin'
import Booker from './BookerPages/Booker.jsx'
import { Routes, Route, BrowserRouter} from "react-router-dom"
import AdminBookingPage from './Admin/AdminBookingPage'
import BookingDetails from './Admin/BookingDetails'
import Feedback from './Admin/Feedback'

export default function Main() {
  return (    <Container>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/Signup" element={<Singnup/>}></Route>

      {/* <Route exact path='/Admin' element={<Protected Cmp={Admin}/>}> */}
      <Route path="Admin" element={<Admin />}>
        <Route path='' element={<AdminBookingPage/>}></Route>
        <Route path='Bookingdetails' element={<BookingDetails/>}></Route>
        <Route path='Feedback' element={<Feedback/>}></Route>
      </Route>
      {/* </Route> */}

      {/* <Route path='/Booker' element={<Protected Cmp={Booker}/>}> */}
      <Route path="Booker" element={<Booker />}>
      <Route path='' element={<BookingSlots/>}></Route>
      <Route path='MyBooking' element={<MyBooking/>}></Route>
      <Route path="Feedback" element={<Feedback/>}></Route>
      </Route>
      {/* </Route> */}
      </Routes>
      </BrowserRouter>
    </Container>

  )
}