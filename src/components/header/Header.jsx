import "./header.scss";
import { FiBell } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { memo } from "react";

function Header(props) {
   return (
      <div className="header">
         <div className="header__search">
            <BiSearch className="icon" />
            <input type="text" placeholder="Search here..." />
         </div>
         <div className="header__widget">
            <div className="header__noti item">
               <FiBell className="icon" />
               {props.noti ? (
                  <span className="number">{props.noti}</span>
               ) : null}
            </div>
            <div className="header__mess item">
               <FiMessageSquare className="icon" />
               {props.mess ? (
                  <span className="number">{props.mess}</span>
               ) : null}
            </div>
            <div className="header__profile item">
               <img
                  src="https://randomuser.me/api/portraits/women/79.jpg"
                  alt=""
               />
            </div>
         </div>
      </div>
   );
}

export default memo(Header);
