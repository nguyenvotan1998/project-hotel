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
   };

   console.log(props);
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
   const [inputCustomerName, setInputCustomerName] = useState();
   const [filterText, setFilterText] = useState();
   const [isPending, startTransition] = useTransition();

   const suggest = useMemo(() => {
      return data?.filter((res) =>
         res.name.includes(filterText) ? res : null
      );
   }, [filterText]);

   const handleSuggestCustomer = (e) => {
      setInputCustomerName(e.target.value);
      startTransition(() => {
         setFilterText(e.target.value);
      });
   };

   console.log(suggest);
   console.log(props.setCusInfo);

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

   // const handleClickSuggest = (res) => {
   //    props.setCusInfo({ res });
   // };

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
               value={inputCustomerName}
               onChange={handleSuggestCustomer}
            />
            <SuggestCustomerList
               child={suggest?.map((res) => (
                  <SuggestCustomerItem
                     key={res.id}
                     id={res.id}
                     name={res.name}
                     card={res.card}
                     customer={res}
                     setCusInfo={props.setCusInfo}
                  />
               ))}
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
