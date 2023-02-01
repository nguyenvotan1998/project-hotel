import "./check-in.scss";
import { memo, useLayoutEffect } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function CustomerInfo(props) {
   console.log(props.cusInfo.phone);

   // const handleFocus = (e) => {
   //    if (!onlyDigits(props.cusInfo.phone)) {
   //       e.target.style.color = "red";
   //    }
   // };
   // useLayoutEffect(
   //    (e) => {
   //       handleFocus(e);
   //    },
   //    [props.cusInfo.phone]
   // );

   const handleNotFocus = (e) => {
      if (props.cusInfo.phone) {
      }
      e.target.style.color = "blue";
   };
   return (
      <div className="container-cus-info">
         <span>Thông tin khách hàng</span>
         <div className="customer-info">
            <input
               id="cusName"
               type="text"
               name="name"
               placeholder="Tên khách hàng"
               ref={props.userRef}
               value={props.cusInfo.name}
               onChange={props.updateCusInfo}
            />
            <input
               id="cusCard"
               type="text"
               name="card"
               placeholder="CMND/CCCD"
               value={props.cusInfo.card}
               onChange={props.updateCusInfo}
            />
            <input
               id="cusPhone"
               type="text"
               name="phone"
               placeholder="Số điện thoại"
               value={props.cusInfo.phone}
               onChange={props.updateCusInfo}
               // onInput={handleFocus}
               // onBlur={handleNotFocus}
            />
            <input
               type="text"
               name="address"
               placeholder="Địa chỉ"
               value={props.cusInfo.address}
               onChange={props.updateCusInfo}
            />

            <div>
               <div>
                  <label className="sex">
                     Nam
                     <input
                        id="book"
                        value="Male"
                        name="sex"
                        type="radio"
                        defaultChecked
                        onChange={props.updateCusInfo}
                     />
                  </label>
                  <label>
                     Nữ
                     <input
                        id="hours"
                        value="Female"
                        name="sex"
                        type="radio"
                        onChange={props.updateCusInfo}
                     />
                  </label>
               </div>
               <input
                  type="date"
                  name="birthday"
                  value={props.cusInfo.birthday}
                  onChange={props.updateCusInfo}
               />
            </div>
         </div>
      </div>
   );
}

export default memo(CustomerInfo);
