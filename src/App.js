import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Revenue from "./pages/customers/revenue/Revenue";
import Blacklist from "./pages/customers/blacklist/Blacklist";
import Birthday from "./pages/customers/birthday/Birthday";

const RoomPage = lazy(() => import("./pages/rooms/RoomPage"));
const CustomerPage = lazy(() => import("./pages/customers/CustomerPage"));
const BillPage = lazy(() => import("./pages/bills/BillPage"));
const RoomPrices = lazy(() => import("./pages/rooms/prices/RoomPrices"));

function Main() {
   return (
      <div className="content">
         <Suspense fallback={<>Loading ...</>}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/rooms" element={<RoomPage />} />
               <Route path="/rooms/room-prices" element={<RoomPrices />} />
               <Route path="/rooms/room-information" element={<RoomPage />} />
               <Route path="/bills" element={<BillPage />} />
               <Route path="/customers" element={<CustomerPage />} />
               <Route path="/customers/revenue" element={<Revenue />} />
               <Route path="/customers/blacklist" element={<Blacklist />} />
               <Route path="/customers/birthday" element={<Birthday />} />
            </Routes>
         </Suspense>
      </div>
   );
}

export default function App() {
   return (
      <div className="app">
         <Sidebar />
         <main className="main">
            <Header />
            <Main />
         </main>
      </div>
   );
}
