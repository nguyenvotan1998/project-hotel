import "./check-out.scss";
import { useEffect, useState, useReducer, useMemo } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import Modal from "../../modal/Modal";
import {
   timeNow,
   dateNow,
   roundTime,
   formatDate,
   subTime,
   subDate,
} from "../../../script";

const CalPriceRoom = (hour, price, late) => {
   if (hour == 0) {
      return 0;
   } else {
      if (hour == 1) {
         return price;
      } else {
         return Number(price) + Number(hour - 1) * late;
      }
   }
};

const getRoomType = (room) => {};

export default function CheckOut(props) {
   const [data, setData] = useState({
      room: [],
      price: [],
      service: [],
   });
   useEffect(() => {
      Promise.all([
         fetch("http://localhost:8000/rooms").then((value) => value.json()),
         fetch("http://localhost:8000/room-prices").then((value) =>
            value.json()
         ),
         fetch("http://localhost:8000/services").then((value) => value.json()),
      ])
         .then(([r, p, s]) => {
            setData((prev) => ({ ...prev, room: r }));
            setData((prev) => ({ ...prev, price: p }));
            setData((prev) => ({ ...prev, service: s }));
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);
   const [payment, setPayment] = useState("cash");
   const [bill, setBill] = useState({
      room: "",
      customer: "",
      method: "",
      dateIn: "",
      dateOut: "",
      hourIn: "",
      hourOut: "",
      dateTotal: "",
      hourTotal: "",
      roomPrice: "",
      service: [],
      servicePrice: "",
      prepay: "",
      prePayment: "",
      priceTotal: "",
      dateBill: "",
      payment: "",
   });

   const initState = {
      service: { name: "Nước suối", number: 0, price: 0 },
      services: props.status.services ? props.status.services : [],
   };

   const SET_SERVICE = "set_service";
   const ADD_SERVICE = "add_service";
   const DELETE_SERVICE = "delete_service";

   const setService = (e) => {
      return {
         type: SET_SERVICE,
         e,
      };
   };
   const addService = (e) => {
      return {
         type: ADD_SERVICE,
         e,
      };
   };
   const delService = (e) => {
      return {
         type: DELETE_SERVICE,
         e,
      };
   };

   const reducer = (state, action) => {
      switch (action.type) {
         case SET_SERVICE:
            if (action.e.target.name === "name") {
               return {
                  ...state,
                  service: {
                     ...state.service,
                     [action.e.target.name]: action.e.target.value,
                  },
               };
            }
            if (action.e.target.name === "number") {
               var price;
               data.service?.map((res) => {
                  if (res.name === state.service.name) {
                     price = res.price;
                  }
               });
               price = action.e.target.value * price;
               return {
                  ...state,
                  service: {
                     ...state.service,
                     [action.e.target.name]: action.e.target.value,
                     price: price,
                  },
               };
            }
            break;

         case ADD_SERVICE:
            return {
               ...state,
               services: [...state.services, state.service],
            };
            break;

         case DELETE_SERVICE:
            const newServices = [...state.services];
            newServices.splice(action.e, 1);
            return {
               ...state,
               services: newServices,
            };
            break;

         default:
            throw new Error("Invalid action!");
      }
   };

   const [state, dispatch] = useReducer(reducer, initState);
   const { service, services } = state;

   const currentTime = timeNow();
   const currentDate = dateNow();
   const totalTime = subTime(props.status.hourIn, currentTime);
   const totalDate = subDate(
      formatDate(props.status.dateIn),
      formatDate(currentDate)
   );

   const servicePrice = services?.reduce((total, current) => {
      return total + current.price;
   }, 0);

   const prepay = props.status.prepay ? Number(props.status.prepay) : 0;

   const [roomPrice, totalPrice] = useMemo(() => {
      const time = roundTime(totalTime);
      let type;
      data.room?.forEach((res) => {
         if (res.room === props.status.room) {
            type = res.type;
         }
      });
      const priceOfRoom = data.price?.find((res) => {
         if (res.roomType === type && res.method === props.status.method) {
            return res;
         }
      });

      const getPrice = priceOfRoom?.price ? Number(priceOfRoom.price) : 0;
      const getPriceLate = priceOfRoom?.late ? Number(priceOfRoom.late) : 0;
      console.log(getPrice);
      console.log(getPriceLate);

      const roomPrice = CalPriceRoom(
         time,
         Number(priceOfRoom?.price),
         Number(priceOfRoom?.late)
      );
      const totalPrice = roomPrice + servicePrice - prepay;
      return [roomPrice, totalPrice];
   }, [data.room, data.price, servicePrice]);
   // const roomPrice = CalPriceRoom(time, priceOfRoom.price, priceOfRoom.late);
   // console.log(roomPrice);
   // const totalPrice = useMemo(() => {
   //    return roomPrice + servicePrice - prepay;
   // }, [servicePrice]);

   const handleSave = (e) => {
      e.stopPropagation();
      // const newService = [...state.services];
      const mergeService = services?.reduce((total, current) => {
         const dup = total.find((item) => item.name === current.name);
         if (dup) {
            current.number = Number(current.number) + Number(dup.number);
            current.price = Number(current.price) + Number(dup.price);
            const totalnew = total.map((res) => {
               if (res.name === current.name) {
                  return current;
               } else {
                  return res;
               }
            });
            return totalnew;
         }
         return [...total, current];
      }, []);
      fetch(`http://localhost:8000/room-status/${props.status.id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            ...props.status,
            services: mergeService,
         }),
      });
      props.setOpen((prev) => ({ ...prev, checkout: false }));
      props.onLoad();
   };

   const handleCheckOut = (e) => {
      e.stopPropagation();
      // const newBill = {
      //    ...props.status,
      //    hourOut: currentTime,
      //    dateOut: currentDate,
      //    totalHour: totalTime,
      //    totalDate: totalDate,
      //    // roomPrice: roomPrice,
      //    services: services,
      //    servicePrice: servicePrice,
      //    // totalPrice: totalPrice,
      //    dateBill: currentTime,
      // };
      // delete newBill.id;
      // delete newBill.status;
      // Promise.all([
      //    fetch("http://localhost:8000/bills", {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({
      //          ...newBill,
      //       }),
      //    }),
      //    fetch(`http://localhost:8000/room-status/${props.status.id}`, {
      //       method: "PUT",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({
      //          room: newBill.room,
      //          status: "notclean",
      //          id: props.status.id,
      //       }),
      //    }),
      // ]);
      props.setOpen((prev) => ({ ...prev, checkout: false }));
      props.onLoad();
   };
   console.log(props);

   return (
      <Modal
         title={"Thanh toán " + props.status.room}
         setOpen={props.setOpen}
         body={
            <div className="check-out">
               <div>
                  <p>Tên khách hàng:</p>
                  <p>{props.status.customer}</p>
               </div>
               <div>
                  <p>Giờ vào:</p>
                  <div className="display time-date">
                     <p>{props.status.hourIn}</p>
                     <p>{formatDate(props.status.dateIn)}</p>
                  </div>
               </div>
               <div>
                  <p>Giờ ra:</p>
                  <div className="display time-date">
                     <p>{currentTime}</p>
                     <p>{formatDate(currentDate)}</p>
                  </div>
               </div>
               <div>
                  <p>Tổng thời gian:</p>
                  <div className="display time-date">
                     <p>{totalTime}</p>
                     <p>{totalDate}</p>
                  </div>
               </div>
               <div>
                  <p>Tiền phòng:</p>
                  <div className="display time-date price">{roomPrice}</div>
               </div>
               <div className="service">
                  <p className="service__label">Dịch vụ:</p>
                  <select
                     className="service__name"
                     name="name"
                     value={service.name}
                     onChange={(e) => {
                        dispatch(setService(e));
                     }}
                  >
                     {data.service?.map((res) => (
                        <option key={res.id} value={res.name}>
                           {res.name}
                        </option>
                     ))}
                  </select>
                  <input
                     className="service__number"
                     type="number"
                     name="number"
                     min="1"
                     max="10"
                     value={service.number}
                     onChange={(e) => dispatch(setService(e))}
                  />
                  <BsPlusCircle
                     className="service__btn add"
                     onClick={(e) => dispatch(addService(e))}
                  />
                  <p className="service__price price">{servicePrice}</p>
               </div>
               {services?.map((res, index) => (
                  <div key={index} className="service">
                     <p className="service__label"></p>
                     <p className="service__name">{res.name}</p>
                     <p className="service__number">{res.number}</p>
                     <BsTrash
                        className="service__btn delete"
                        name={index}
                        onClick={() => dispatch(delService(index))}
                     />
                     <p className="service__price price">{res.price}</p>
                  </div>
               ))}

               <div>
                  <p>Trả trước:</p>
                  <div className="display time-date price">{prepay}</div>
               </div>
               <div>
                  <p>Phương thức:</p>
                  <div className="display time-date price">
                     {props.status.prePayment}
                  </div>
               </div>
               <div>
                  <p>Tổng tiền:</p>
                  <div className="display time-date price">
                     <p>{totalPrice}</p>
                  </div>
               </div>
               <div>
                  <p>Phương thức:</p>
                  <select
                     className="input room-info"
                     name="prePayment"
                     value={payment}
                     onChange={(e) => setPayment(e.target.value)}
                  >
                     <option value="cash">Tiền mặt</option>
                     <option value="tranfer">Chuyển khoản</option>
                  </select>
               </div>
            </div>
         }
         footer={
            <>
               <button className="btn btn-submit" onClick={handleSave}>
                  Lưu
               </button>
               <button className="btn btn-submit" onClick={handleCheckOut}>
                  Thanh toán
               </button>
            </>
         }
      />
   );
}
