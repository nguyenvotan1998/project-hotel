import useFetch from "../hooks/useFetch";
import { BsTrash } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import "./list.scss";
import { useState, useRef, useEffect, memo } from "react";
import Modal from "../modal/Modal";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function AddCustomer(props) {
   const [customer, setCustomer] = useState({
      name: "",
      sex: "Male",
      card: "",
      phone: "",
      address: "",
      birthday: "",
   });

   useEffect(() => {
      props.nameRef.current.focus();
   }, []);

   const updateCustomer = (e) => {
      setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:8000/customers", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(customer),
      });
      props.setOpen((prev) => ({ ...prev, add: false }));
      props.onLoad();
   };

   return (
      <>
         <Modal
            title="Thêm khách hàng"
            setOpen={props.setOpen}
            body={
               <form className="form">
                  <label className="input">
                     Họ và tên:
                     <input
                        type="text"
                        ref={props.nameRef}
                        name="name"
                        value={customer.name}
                        onChange={updateCustomer}
                     />
                  </label>
                  <div className="input radio">
                     <p>Giới tính</p>
                     <div>
                        <label>
                           Nam
                           <input
                              type="radio"
                              name="sex"
                              value="Male"
                              onChange={updateCustomer}
                              defaultChecked
                           />
                        </label>
                        <label>
                           Nữ
                           <input
                              type="radio"
                              name="sex"
                              value="Female"
                              onChange={updateCustomer}
                           />
                        </label>
                     </div>
                  </div>
                  <label className="input">
                     CMND/CCCD:
                     <input
                        type="text"
                        name="card"
                        value={customer.card}
                        onChange={updateCustomer}
                     />
                  </label>
                  <label className="input">
                     Số điện thoại:
                     <input
                        type="text"
                        name="phone"
                        value={customer.phone}
                        onChange={updateCustomer}
                     />
                  </label>
                  <label className="input">
                     Địa chỉ:
                     <input
                        type="text"
                        name="address"
                        value={customer.address}
                        onChange={updateCustomer}
                     />
                  </label>
                  <label className="input">
                     Ngày sinh:
                     <input
                        type="text"
                        name="birthday"
                        value={customer.birthday}
                        onChange={updateCustomer}
                     />
                  </label>
               </form>
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

function EditCustomer(props) {
   const [customer, setCustomer] = useState(props.customer);

   useEffect(() => {
      props.nameRef.current.focus();
   }, []);

   const updateCustomer = (e) => {
      setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`http://localhost:8000/customers/${customer.id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(customer),
      });
      props.setOpen((prev) => ({ ...prev, edit: false }));
      props.onLoad();
   };

   return (
      <>
         <Modal
            title="Sửa khách hàng"
            setOpen={props.setOpen}
            body={
               <form className="form">
                  <label className="input">
                     Mã khách hàng:
                     <input
                        type="text"
                        name="id"
                        value={customer.id}
                        readOnly
                     />
                  </label>
                  <label className="input">
                     Họ và tên:
                     <input
                        type="text"
                        ref={props.nameRef}
                        name="name"
                        value={customer.name}
                        onChange={updateCustomer}
                     />
                  </label>
                  <div className="input radio">
                     <p>Giới tính</p>
                     <div>
                        <label>
                           Nam
                           <input
                              type="radio"
                              name="sex"
                              value="Male"
                              onChange={updateCustomer}
                           />
                        </label>
                        <label>
                           Nữ
                           <input
                              type="radio"
                              name="sex"
                              value="Female"
                              onChange={updateCustomer}
                           />
                        </label>
                     </div>
                  </div>
                  <label className="input">
                     CMND/CCCD:
                     <input
                        type="text"
                        name="card"
                        value={customer.card}
                        onChange={updateCustomer}
                     />
                  </label>
                  <label className="input">
                     Số điện thoại:
                     <input
                        type="text"
                        name="phone"
                        value={customer.phone}
                        onChange={updateCustomer}
                     />
                  </label>
                  <label className="input">
                     Địa chỉ:
                     <input
                        type="text"
                        name="address"
                        value={customer.address}
                        onChange={updateCustomer}
                     />
                  </label>
                  <label className="input">
                     Ngày sinh:
                     <input
                        type="text"
                        name="birthday"
                        value={customer.birthday}
                        onChange={updateCustomer}
                     />
                  </label>
               </form>
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

export default function CustomerList() {
   const [load, setLoad] = useState(false);
   const { data, loading, error } = useFetch(
      "http://localhost:8000/customers",
      load
   );
   const [open, setOpen] = useState({
      add: false,
      edit: false,
      alert: false,
   });

   const [alert, setAlert] = useState(true);
   const [cusEdit, setCusEdit] = useState();
   const nameRef = useRef();

   const render = (array) =>
      array?.map((res) => (
         <tr key={res.id}>
            <td>{res.id}</td>
            <td>{res.name}</td>
            <td>{res.sex}</td>
            <td>{res.card}</td>
            <td>{res.phone}</td>
            <td>{res.address}</td>
            <td>{res.birthday}</td>
            <td>
               <BsPencil
                  className="icon icon__edit"
                  onClick={() => handleEdit(res.id)}
               />
            </td>
            <td>
               <BsTrash
                  className="icon icon__delete"
                  onClick={() => handleDelete(res.id)}
               />
            </td>
         </tr>
      ));

   const handleEdit = (id) => {
      const cusChoose = data?.find((current) =>
         current.id === id ? current : null
      );
      setCusEdit(cusChoose);
      setOpen((prev) => ({ ...prev, edit: true }));
   };
   const handleDelete = (id) => {
      fetch(`http://localhost:8000/customers/${id}`, {
         method: "delete",
      });
      handleReLoad();
   };

   const handleReLoad = () => {
      setLoad(!load);
   };

   const handleClose = () => {
      setAlert(false);
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
   } else
      return (
         <div className="list">
            <Snackbar
               open={alert}
               autoHideDuration={6000}
               onClose={handleClose}
            >
               <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
               >
                  Lỗi load dữ liệu!!!
               </Alert>
            </Snackbar>
            <div className="list__header">
               <h3 className="title list__title">Thông tin khách hàng</h3>
               <button
                  className="btn btn-add"
                  onClick={() => setOpen((prev) => ({ ...prev, add: true }))}
               >
                  Thêm khách hàng
               </button>
               {open.add && (
                  <AddCustomer
                     setOpen={setOpen}
                     nameRef={nameRef}
                     onLoad={handleReLoad}
                  />
               )}
               {open.edit && (
                  <EditCustomer
                     setOpen={setOpen}
                     nameRef={nameRef}
                     onLoad={handleReLoad}
                     customer={cusEdit}
                  />
               )}
            </div>
            <table className="customer-list">
               <thead>
                  <tr>
                     <th>Id</th>
                     <th>Full Name</th>
                     <th>Sex</th>
                     <th>Id card</th>
                     <th>Phone number</th>
                     <th>Address</th>
                     <th>Birthday</th>
                     <th>Edit</th>
                     <th>Delete</th>
                  </tr>
               </thead>
               <tbody>
                  {loading && (
                     <tr>
                        <td>Loading ... </td>
                        <td>Loading ... </td>
                        <td>Loading ... </td>
                        <td>Loading ... </td>
                        <td>Loading ... </td>
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
