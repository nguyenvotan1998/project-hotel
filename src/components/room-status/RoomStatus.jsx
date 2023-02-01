import "./room-status.scss";
import { useState, useEffect, memo } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { BsDash } from "react-icons/bs";
import { BsCheck2Circle } from "react-icons/bs";
import { BsCash } from "react-icons/bs";
import { BsBank } from "react-icons/bs";
import RoomSettingList from "../setting/room-settings/RoomSettingList";
import CheckIn from "../form/check-in/CheckIn";
import CheckOut from "../form/check-out/CheckOut";

function formatDate(value) {
   const array = value.split("-");
   return array[2] + "/" + array[1];
}

function RoomStatus(props) {
   const [open, setOpen] = useState({
      setting: false,
      checkin: false,
      checkout: false,
   });

   const handleSetting = (e) => {
      e.stopPropagation();
      setOpen((prev) => ({ ...prev, setting: !open.setting }));
   };

   const handleDbClick = () => {
      if (props.status.status === "notclean") {
         fetch(`http://localhost:8000/room-status/${props.status.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               ...props.status,
               status: "empty",
            }),
         });
         props.onLoad();
      }
   };

   const handleOpen = () => {
      switch (props.status.status) {
         case "empty":
            setOpen((prev) => ({ ...prev, checkin: true }));
            break;
         case "using":
            setOpen((prev) => ({ ...prev, checkout: true }));
            break;
         default:
            console.log("Lỗi open!!!");
            break;
      }
   };

   return (
      <div
         className="room-status"
         style={{ backgroundColor: `${props.bg}` }}
         onClick={handleOpen}
         onDoubleClick={handleDbClick}
      >
         {open.checkin && props.status.status === "empty" ? (
            <CheckIn
               setOpen={setOpen}
               onLoad={props.onLoad}
               status={props.status}
            />
         ) : open.checkout && props.status.status === "using" ? (
            <CheckOut
               setOpen={setOpen}
               onLoad={props.onLoad}
               status={props.status}
            />
         ) : null}
         <div className="room-status__header">
            <div className="room-status__room-number">
               <span>{props.status.room}</span>
            </div>
            {props.status.method === "hours" ? (
               <div className="room-status__total-time">{props.totalTime}</div>
            ) : null}
            <div className="room-status__status-icons">{props.iconStatus}</div>
            <div className="room-status__time-stay">
               {props.status.status === "empty" ||
               props.status.status === "notclean" ? null : (
                  <>
                     <div>
                        <div className="room-status__date-in">
                           {props.status.dateIn
                              ? formatDate(props.status.dateIn)
                              : null}
                        </div>
                        <BsDash />
                        <div className="room-status__date-out">
                           {props.status.dateOut
                              ? formatDate(props.status.dateOut)
                              : "--/--"}
                        </div>
                     </div>

                     <div>
                        <div className="room-status__hour-in">
                           {props.status.hourIn}
                        </div>
                        <BsDash />
                        <div className="room-status__hour-out">
                           {props.status.hourOut
                              ? props.status.hourOut
                              : "--:--"}
                        </div>
                     </div>
                  </>
               )}
            </div>

            <div className="room-status__time-total">
               <div className="date-total">{props.dateTotal}</div>
               <div className="hour-total">{props.hourTotal}</div>
            </div>
         </div>
         <div className="room-status__body">
            <div className="room-status__customer-name">
               {props.status.customer}
            </div>
            {props.status.prepay ? (
               props.status.prePayment === "cash" ? (
                  <BsCash className="room-status__prepay" />
               ) : props.status.prePayment === "tranfer" ? (
                  <BsBank className="room-status__prepay" />
               ) : null
            ) : null}
         </div>
         <div className="room-status__footer">
            <div
               className="room-status__color"
               onClick={props.changeColor}
            ></div>
            <div className="room-status__setting" onClick={handleSetting}>
               {open.setting ? (
                  <>
                     <IoIosArrowUp />
                     <RoomSettingList room={props.status.room} />
                  </>
               ) : (
                  <IoIosArrowDown />
               )}
            </div>
         </div>
      </div>
   );
}

export default memo(RoomStatus);
