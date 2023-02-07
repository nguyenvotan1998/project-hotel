import "./check-in.scss";
import {
   React,
   memo,
   useLayoutEffect,
   useTransition,
   useMemo,
   useState,
} from "react";
import useFetch from "../../hooks/useFetch";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { responsivePropType } from "@mui/system";

function SuggestCustomerItem(props) {
   const handleSuggestCustomer = () => {
      props.setCusInfo(props.customer);
      props.setIsSuggest(false);
   };

   return (
      <div className="suggest-customer-item" onClick={handleSuggestCustomer}>
         <p>
            {props.id} - {props.name}
         </p>
         <p>CMND: {props.card}</p>
      </div>
   );
}

function SuggestCustomerList(props) {
   return <div className="suggest-customer-list">{props.child}</div>;
}

function CustomerInfo(props) {
   const { data, loading, error } = useFetch("http://localhost:8000/customers");
   const [isSuggest, setIsSuggest] = useState(true);
   const [filterText, setFilterText] = useState();
   const [isPending, startTransition] = useTransition();

   const suggest = useMemo(() => {
      return data?.filter((res) =>
         res.name.includes(filterText) ? res : null
      );
   }, [filterText]);

   const handleSuggestCustomer = (e) => {
      props.updateCusInfo(e);
      startTransition(() => {
         setFilterText(e.target.value);
      });
   };

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
               onChange={handleSuggestCustomer}
            />
            {isSuggest && (
               <SuggestCustomerList
                  child={suggest?.map((res) => (
                     <SuggestCustomerItem
                        key={res.id}
                        id={res.id}
                        name={res.name}
                        card={res.card}
                        customer={res}
                        setCusInfo={props.setCusInfo}
                        setIsSuggest={setIsSuggest}
                     />
                  ))}
               />
            )}
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
