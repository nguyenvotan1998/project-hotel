import "./check-in.scss";
import { memo } from "react";

function RoomInfo(props) {
   const isPayment = () => {
      if (props.roomInfo.prepay) {
         if (props.roomInfo.prePayment === "") {
            props.updatePayment();
            return (
               <label>
                  Hình thức:
                  <select
                     className="input room-info"
                     name="prePayment"
                     value={props.roomInfo.prePayment}
                     onChange={props.updateRoomInfo}
                  >
                     <option value="cash">Tiền mặt</option>
                     <option value="tranfer">Chuyển khoản</option>
                  </select>
               </label>
            );
         } else {
            return (
               <label>
                  Hình thức:
                  <select
                     className="input room-info"
                     name="prePayment"
                     value={props.roomInfo.prePayment}
                     onChange={props.updateRoomInfo}
                  >
                     <option value="cash">Tiền mặt</option>
                     <option value="tranfer">Chuyển khoản</option>
                  </select>
               </label>
            );
         }
      } else {
         return null;
      }
   };

   return (
      <div className="container-cus-info">
         <span>Thông tin phòng</span>
         <div className="customer-info">
            <div className="input method">
               <label>
                  Đặt phòng
                  <input
                     id="book"
                     type="radio"
                     name="method"
                     value="book"
                     onChange={props.updateRoomInfo}
                  />
               </label>
               <label>
                  Tính ngày
                  <input
                     id="days"
                     type="radio"
                     name="method"
                     value="days"
                     onChange={props.updateRoomInfo}
                  />
               </label>
               <label>
                  Tính giờ
                  <input
                     id="hours"
                     type="radio"
                     name="method"
                     value="hours"
                     defaultChecked
                     onChange={props.updateRoomInfo}
                  />
               </label>
            </div>
            <div className="input date time">
               <label>
                  Vào:
                  <div>
                     <input
                        type="date"
                        name="dateIn"
                        value={props.roomInfo.dateIn}
                        onChange={props.updateRoomInfo}
                     />
                     <input
                        type="time"
                        name="hourIn"
                        value={props.roomInfo.hourIn}
                        onChange={props.updateRoomInfo}
                     />
                  </div>
               </label>
               <label>
                  Ra:
                  <div>
                     <input
                        type="date"
                        name="dateOut"
                        value={props.roomInfo.dateOut}
                        onChange={props.updateRoomInfo}
                     />
                     <input
                        type="time"
                        name="hourOut"
                        value={props.roomInfo.hourOut}
                        onChange={props.updateRoomInfo}
                     />
                  </div>
               </label>
            </div>
            <label>
               Phòng:
               <p>{props.room}</p>
            </label>
            <label>
               Trả trước:
               <input
                  type="text"
                  className="input room-info"
                  name="prepay"
                  value={props.roomInfo.prepay}
                  onChange={props.updateRoomInfo}
               />
            </label>
            {isPayment()}
            <label>
               Ghi chú:
               <input
                  type="textarea"
                  className="input room-info"
                  name="note"
                  value={props.roomInfo.note}
                  onChange={props.updateRoomInfo}
               />
            </label>
         </div>
      </div>
   );
}

export default memo(RoomInfo);
