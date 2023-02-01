import "./list.scss";
import { useState, useRef, useEffect, memo } from "react";
import useFetch from "../hooks/useFetch";
import Modal from "../modal/Modal";
import { BsTrash } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";

function AddPrice(props) {
   const { data, loading, error } = useFetch(
      "http://localhost:8000/room-types"
   );

   const method = ["Giờ", "Đêm", "Ngày"];
   const [price, setPrice] = useState({
      type: "Nhỏ",
      method: "Giờ",
      early: null,
      price: null,
      late: null,
   });

   useEffect(() => {
      props.nameRef.current.focus();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:8000/room-prices", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(price),
      });
      props.setOpen((prev) => ({ ...prev, add: false }));
      props.onLoad();
   };

   const updatePrice = (e) => {
      setPrice((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   return (
      <Modal
         title="Thêm giá phòng"
         setOpen={props.setOpen}
         body={
            <div className="form">
               <label className="input">
                  Loại phòng:
                  <select
                     ref={props.nameRef}
                     name="type"
                     value={price.type}
                     onChange={updatePrice}
                  >
                     {data?.map((data, index) => (
                        <option key={index} value={data.name}>
                           {data.name}
                        </option>
                     ))}
                  </select>
               </label>
               <label className="input">
                  Cách tính:
                  <select
                     name="method"
                     value={price.method}
                     onChange={updatePrice}
                  >
                     {method?.map((data, index) => (
                        <option key={index} value={data}>
                           {data}
                        </option>
                     ))}
                  </select>
               </label>
               {price.method === "Ngày" ? (
                  <label className="input">
                     Vào sớm:
                     <input
                        type="text"
                        name="early"
                        value={price.early}
                        placeholder={
                           price.method === "Giờ" ? "1 giờ đầu" : null
                        }
                        onChange={updatePrice}
                     />
                  </label>
               ) : null}
               <label className="input">
                  Giá phòng:
                  <input
                     type="text"
                     name="price"
                     value={price.price}
                     placeholder={price.method === "Giờ" ? "1 giờ đầu" : null}
                     onChange={updatePrice}
                  />
               </label>

               <label className="input">
                  Trả trễ:
                  <input
                     type="text"
                     name="late"
                     value={price.late}
                     onChange={updatePrice}
                  />
               </label>
            </div>
         }
         footer={
            <>
               <button onClick={handleSubmit} className="btn btn-submit">
                  Thực hiện
               </button>
            </>
         }
      />
   );
}

function EditPrice(props) {
   const { data, loading, error } = useFetch(
      "http://localhost:8000/room-types"
   );

   const method = ["Giờ", "Đêm", "Ngày"];

   const [price, setPrice] = useState(props.price);

   useEffect(() => {
      props.nameRef.current.focus();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`http://localhost:8000/room-prices/${price.id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(price),
      });
      props.onLoad();
      props.setOpen(false);
   };
   const updatePrice = (e) => {
      setPrice((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };
   return (
      <Modal
         title="Sửa giá phòng"
         setOpen={props.setOpen}
         body={
            <div className="form">
               <label className="input">
                  Mã:
                  <input type="text" name="id" value={price.id} readOnly />
               </label>
               <label className="input">
                  Loại phòng:
                  <select
                     ref={props.nameRef}
                     name="type"
                     value={price.type}
                     onChange={updatePrice}
                  >
                     {data?.map((data, index) => (
                        <option key={index} value={data.name}>
                           {data.name}
                        </option>
                     ))}
                  </select>
               </label>
               <label className="input">
                  Cách tính:
                  <select
                     name="method"
                     value={price.method}
                     onChange={updatePrice}
                  >
                     {method?.map((data, index) => (
                        <option key={index} value={data}>
                           {data}
                        </option>
                     ))}
                  </select>
               </label>
               {price.method === "Ngày" ? (
                  <label className="input">
                     Vào sớm:
                     <input
                        type="text"
                        name="early"
                        value={price.early}
                        onChange={updatePrice}
                     />
                  </label>
               ) : null}
               <label className="input">
                  Giá phòng:
                  <input
                     type="text"
                     name="price"
                     value={price.price}
                     placeholder={price.method === "Giờ" ? "1 giờ đầu" : null}
                     onChange={updatePrice}
                  />
               </label>

               <label className="input">
                  Trả trễ:
                  <input
                     type="text"
                     name="late"
                     value={price.late}
                     onChange={updatePrice}
                  />
               </label>
            </div>
         }
         footer={
            <>
               <button onClick={handleSubmit} className="btn btn-submit">
                  Thực hiện
               </button>
            </>
         }
      />
   );
}
export default function PriceList() {
   const [load, setLoad] = useState(false);
   const { data, loading, error } = useFetch(
      "http://localhost:8000/room-prices",
      load
   );
   const [open, setOpen] = useState({
      add: false,
      edit: false,
   });
   const [priceEdit, setPriceEdit] = useState();

   const nameRef = useRef();

   const handleEdit = (id) => {
      const priceChoose = data?.find((current) =>
         current.id === id ? current : null
      );
      setPriceEdit(priceChoose);
      setOpen((prev) => ({ ...prev, edit: true }));
   };

   const handleDelete = (id) => {
      fetch(`http://localhost:8000/room-prices/${id}`, {
         method: "delete",
      });
      handleReLoad();
   };

   const handleReLoad = () => {
      setLoad(!load);
   };

   const render = (array) =>
      array?.map((res) => (
         <tr key={res.id}>
            <td>{res.id}</td>
            <td>{res.type}</td>
            <td>{res.method}</td>
            <td>{res.early}</td>
            <td>{res.price}</td>
            <td>{res.late}</td>
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

   return (
      <div className="list">
         <div className="list__header">
            <h3 className="title list__title">Thông tin giá phòng</h3>
            <button
               className="btn btn-add"
               onClick={() => setOpen((prev) => ({ ...prev, add: true }))}
            >
               Thêm giá phòng
            </button>
            {open.add && (
               <AddPrice
                  setOpen={setOpen}
                  nameRef={nameRef}
                  onLoad={handleReLoad}
               />
            )}
            {open.edit && (
               <EditPrice
                  setOpen={setOpen}
                  nameRef={nameRef}
                  onLoad={handleReLoad}
                  price={priceEdit}
               />
            )}
         </div>
         <table>
            <thead>
               <tr>
                  <th>Id</th>
                  <th>Room Type</th>
                  <th>Method</th>
                  <th>Early</th>
                  <th>Price</th>
                  <th>Late</th>
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
