import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Gethelp from "./pages/gethelp/Gethelp";
import Businessupdates from "./pages/businessupdates/Businessupdates";
import { AppProvider } from "./modalProvider/Modalprovider";
import TicketHistory from "./pages/ticketHistory/TicketHistory";
import Admin from "./pages/admin/Admin";
import TicketRequests from "./pages/ticketrequests/Ticketrequests";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
function App() {

  
  return (
    <div className="App">
      <AppProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/get-help" element={<Gethelp />}></Route>
          <Route path="/business-updates" element={<Businessupdates />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/ticket-history" element={<TicketHistory/>}></Route>
          <Route path='/' element={<ProtectedRoutes/>}>
              <Route path="/admin/business-strategy" element={<Admin cat="BUSINESS STRATEGY" catmain="GET HELP"/>}></Route>
              <Route path="/admin/marketing" element={<Admin cat="MARKETING" catmain="GET HELP"/>}></Route>
              <Route path="/admin/marketing/business_updates" element={<Admin cat="MARKETING" catmain="BUSINESS UPDATES"/>}></Route>
              <Route path="/admin/financial-management" element={<Admin cat="FINANCIAL MANAGEMENT" catmain="GET HELP"/>}></Route>
              <Route path="/admin/technical-support" element={<Admin cat="TECHNICAL SUPPORT" catmain="GET HELP"/>}></Route>
              <Route path="/admin/operation&logistics" element={<Admin cat="OPERATION & LOGISTICS" catmain="GET HELP"/>}></Route>
              <Route path="/admin/others" element={<Admin cat="OTHERS" catmain="GET HELP" />}></Route>
              <Route path="/admin/others/business_updates" element={<Admin cat="OTHERS" catmain="BUSINESS UPDATES" />}></Route>
              <Route path="/admin/new-product-launch"element={<Admin cat="NEW PRODUCT LAUNCH" catmain="BUSINESS UPDATES"/>}></Route>
              <Route path="/admin/expansion-of-business"element={<Admin cat="EXPANSION OF BUSINESS" catmain="BUSINESS UPDATES"/>}></Route>
              <Route path="/admin/revenue"element={<Admin cat="REVENUE" catmain="BUSINESS UPDATES"/>}></Route>
              <Route path="/admin/requests"element={<Admin recent={true}/>}></Route>
          </Route>
          <Route path="/ticket-history/requests" element={<TicketRequests profile="true"/>}></Route>
        </Routes>
      </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
