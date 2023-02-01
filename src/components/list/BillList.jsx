import "./list.scss";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { BsTrash } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
export default function BillList(props) {
   const { data, loading, error } = useFetch("http://localhost:8000/bills");

   const [openForm, setOpenForm] = useState(false);

   const render = (array) =>
      array?.map((res) => (
         <tr key={res.id}>
            <td>{res.id}</td>
            <td>{res.room}</td>
            <td>{res.customer}</td>
            <td>{res.hourOut + " " + res.dateOut}</td>
            <td>{res.prepay + " - " + res.prePayment.toUpperCase()}</td>
            <td>{res.roomPrice}</td>
            <td>{res.servicePrice}</td>
            <td>{res.totalPrice}</td>
            <td></td>
            <td>
               <BsPencil className="icon icon__edit" onClick={viewDetail} />
            </td>
            <td>
               <BsTrash
                  className="icon icon__delete"
                  onClick={() => printBill(res.id)}
               />
            </td>
         </tr>
      ));

   const viewDetail = () => {};

   const printBill = (id) => {
      window.location.reload(false);
   };

   const vertical = "top";
   const horizontal = "center";
   if (error) {
      console.log(error);
      return (
         <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={true}
            autoHideDuration={6000}
            onClose={() => {}}
         >
            <Alert onClose={() => {}} severity="error" sx={{ width: "100%" }}>
               Lỗi load dữ liệu Customer!!!
            </Alert>
         </Snackbar>
      );
   }
   return (
      <div className="list">
         <div className="list__header">
            <h3 className="title list__title">Thông tin lầu</h3>
            <button className="btn btn-add" onClick={() => setOpenForm(true)}>
               Thêm lầu
            </button>
            {/* {openForm && <AddFloor setOpenForm={setOpenForm} />} */}
         </div>
         <table>
            <thead>
               <tr>
                  <th style={{ width: "5%" }}>Id</th>
                  <th style={{ width: "10%" }}>Room</th>
                  <th style={{ width: "15%" }}>Customer</th>
                  <th>Date</th>
                  <th>Prepay</th>
                  <th>Room Price</th>
                  <th>Service Price</th>
                  <th>Total</th>
                  <th>Cashier</th>
                  <th>View Details</th>
                  <th>Print Bill</th>
               </tr>
            </thead>
            <tbody>
               {loading && (
                  <tr>
                     <td>Loading ... </td>
                     <td>Loading ... </td>
                     <td>
                        <BsPencil className="icon icon__edit" />
                     </td>
                     <td>
                        <BsTrash className="icon icon__delete" />
                     </td>
                  </tr>
               )}
               {render(data)}
            </tbody>
         </table>
      </div>
   );
}
