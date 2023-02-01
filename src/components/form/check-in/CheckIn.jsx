import "./check-in.scss";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Modal from "../../modal/Modal";
import CustomerInfo from "./CustomerInfo";
import RoomInfo from "./RoomInfo";
import { timeNow, dateNow, tomorrow } from "../../../script";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

// function Validator() {
//    function isRequired() {}
// }

export default function CheckIn(props) {
   const currentTime = timeNow();
   const currentDate = dateNow();
   const tomorrowDate = tomorrow();
   const [alert, setAlert] = useState({
      name: false,
      card: false,
      phone: false,
      address: false,
   });
   const userRef = useRef();
   const [roomInfo, setRoomInfo] = useState({
      method: "hours",
      dateIn: "",
      hourIn: "",
      dateOut: "",
      hourOut: "",
      room: props.status.room,
      prepay: "",
      prePayment: "",
      note: "",
   });

   const [cusInfo, setCusInfo] = useState({
      name: "",
      card: "",
      phone: "",
      address: "",
      sex: "Male",
      birthday: "",
   });

   useEffect(() => {
      userRef.current.focus();
   }, []);

   const changeMethod = useMemo(() => {
      switch (roomInfo.method) {
         case "hours":
            setRoomInfo((prev) => ({
               ...prev,
               dateIn: currentDate,
               dateOut: currentDate,
               hourIn: currentTime,
            }));
            break;
         case "days":
            setRoomInfo((prev) => ({
               ...prev,
               dateIn: currentDate,
               dateOut: tomorrowDate,
               hourIn: currentTime,
               hourOut: "12:00",
            }));

            break;
         case "book":
            setRoomInfo((prev) => ({
               ...prev,
               dateIn: currentDate,
               dateOut: tomorrowDate,
               hourIn: "12:00",
               hourOut: "12:00",
            }));
            break;
      }
   }, [roomInfo.method]);

   const handleSubmit = (e) => {
      e.preventDefault();
      Promise.all([
         fetch(`http://localhost:8000/room-status/${props.status.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               ...roomInfo,
               status: "using",
               customer: cusInfo.name,
            }),
         }),
         fetch("http://localhost:8000/customers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cusInfo),
         }),
      ]);
      props.setOpen((prev) => ({ ...prev, checkin: false }));
      props.onLoad();
   };

   function onlyDigits(s) {
      for (let i = s.length - 1; i >= 0; i--) {
         const d = s.charCodeAt(i);
         if (d < 48 || d > 57) return false;
      }
      return true;
   }

   const updateCusInfo = useCallback((e) => {
      if (e.target.name === "phone") {
         if (!onlyDigits(e.target.value)) {
            setAlert((prev) => ({ ...prev, phone: true }));
         } else {
            setAlert((prev) => ({ ...prev, phone: false }));
         }
      }

      setCusInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   }, []);

   const updateRoomInfo = useCallback((e) => {
      setRoomInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   }, []);

   const updatePayment = useCallback((e) => {
      setRoomInfo((prev) => ({ ...prev, prePayment: "cash" }));
   }, []);

   const handleClose = useCallback((e) => {
      setAlert((prev) => ({ ...prev, phone: false }));
   }, []);

   return (
      <>
         <Snackbar
            open={alert.phone}
            autoHideDuration={6000}
            onClose={handleClose}
         >
            <Alert
               onClose={handleClose}
               severity="error"
               sx={{ width: "100%" }}
            >
               Vui lòng nhập đúng định dạng!
            </Alert>
         </Snackbar>
         <Modal
            title="Nhận phòng"
            setOpen={props.setOpen}
            body={
               <>
                  <CustomerInfo
                     userRef={userRef}
                     cusInfo={cusInfo}
                     alert={alert}
                     handleClose={handleClose}
                     updateCusInfo={updateCusInfo}
                  />
                  <RoomInfo
                     room={props.status.room}
                     roomInfo={roomInfo}
                     updatePayment={updatePayment}
                     updateRoomInfo={updateRoomInfo}
                  />
               </>
            }
            footer={
               <>
                  <button onClick={handleSubmit} className="btn btn-submit">
                     Thực hiện
                  </button>
               </>
            }
         />
      </>
   );
}
