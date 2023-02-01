import "./sidebar.scss";
import { memo, useState } from "react";
import { BsList } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { BiBed } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import {
   Outlet,
   NavLink,
   useLoaderData,
   Form,
   redirect,
} from "react-router-dom";

function Sidebar() {
   const [open, setOpen] = useState({
      home: false,
      room: false,
      customer: false,
      bill: false,
   });
   const hideTitle = () => {};
   return (
      <div className="sidebar">
         <div className="sidebar__logo">
            <span className="logo">Tấn Nguyên</span>
            <BsList className="icon" onClick={hideTitle} />
         </div>
         <ul className="sidebar__list-link">
            <li className="item-link">
               <NavLink
                  to={`/`}
                  className={({ isActive, isPending }) =>
                     isActive ? "active" : isPending ? "pending" : ""
                  }
                  onClick={() =>
                     setOpen((prev) => ({ ...prev, home: !open.home }))
                  }
               >
                  <RxDashboard />
                  Home
                  {open.home ? <IoIosArrowUp /> : <IoIosArrowDown />}
               </NavLink>
            </li>
            <li className="item-link">
               <NavLink
                  to={`/rooms`}
                  className={({ isActive, isPending }) =>
                     isActive ? "active" : isPending ? "pending" : ""
                  }
                  onClick={() =>
                     setOpen((prev) => ({ ...prev, room: !open.room }))
                  }
               >
                  <BiBed />
                  Room
                  {open.room ? <IoIosArrowUp /> : <IoIosArrowDown />}
               </NavLink>
               <ul
                  className={
                     open.room ? "sub-menu-lv2 open" : "sub-menu-lv2 hidden"
                  }
               >
                  <li>
                     <NavLink to={`/rooms/room-information`}>
                        Information
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to={`/rooms/room-prices`}>Prices</NavLink>
                  </li>
               </ul>
            </li>
            <li className="item-link">
               <NavLink
                  to={`/customers`}
                  className={({ isActive, isPending }) =>
                     isActive ? "active" : isPending ? "pending" : null
                  }
                  onClick={() =>
                     setOpen((prev) => ({ ...prev, customer: !open.customer }))
                  }
                  // className={active(isActive, isPending)}
               >
                  <FiUsers />
                  Customer
                  {open.customer ? <IoIosArrowUp /> : <IoIosArrowDown />}
               </NavLink>
               <ul
                  className={
                     open.customer ? "sub-menu-lv2 open" : "sub-menu-lv2 hidden"
                  }
               >
                  <li>
                     <NavLink to={`/customers/`}>List</NavLink>
                  </li>
                  <li>
                     <NavLink to={`/customers/revenue`}>Revenue</NavLink>
                  </li>
                  <li>
                     <NavLink to={`/customers/blacklist`}>Blacklist</NavLink>
                  </li>
                  <li>
                     <NavLink to={`/customers/promotion`}>Promotion</NavLink>
                  </li>
                  <li>
                     <NavLink to={`/customers/birthday`}>Birthday</NavLink>
                  </li>
               </ul>
            </li>
            <li className="item-link">
               <NavLink
                  to={`/bills`}
                  className={({ isActive, isPending }) =>
                     isActive ? "active" : isPending ? "pending" : ""
                  }
                  onClick={() =>
                     setOpen((prev) => ({ ...prev, bill: !open.bill }))
                  }
               >
                  <RxDashboard />
                  Bill
                  {open.bill ? <IoIosArrowUp /> : <IoIosArrowDown />}
               </NavLink>
            </li>
         </ul>
      </div>
   );
}

export default memo(Sidebar);
