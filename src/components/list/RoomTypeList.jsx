import "./list.scss";
import { useState, useRef, memo, useEffect } from "react";
import Modal from "../modal/Modal";
import useFetch from "../hooks/useFetch";
import { BsTrash } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";

function AddRoomType(props) {
   const [roomTypeName, setRoomTypeName] = useState();

   useEffect(() => {
      props.nameRef.current.focus();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:8000/room-types", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            name: roomTypeName,
         }),
      });
      props.onLoad();
      props.setOpen(false);
   };

   return (
      <>
         <Modal
            title="Thêm thêm loại phòng"
            setOpen={props.setOpen}
            body={
               <div className="form">
                  <label className="input">
                     Tên loại phòng:
                     <input
                        type="text"
                        ref={props.nameRef}
                        name="roomTypeName"
                        onChange={(e) => setRoomTypeName(e.target.value)}
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
      </>
   );
}

function EditRoomType(props) {
   const [roomTypeName, setRoomTypeName] = useState(props.name);

   useEffect(() => {
      props.nameRef.current.focus();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`http://localhost:8000/floors/${props.id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            name: roomTypeName,
         }),
      });
      props.onLoad();
      props.setOpen(false);
   };

   return (
      <>
         <Modal
            title="Sửa lầu"
            setOpen={props.setOpen}
            body={
               <div className="form">
                  <label className="input">
                     Id lầu:
                     <input type="text" value={props.id} readOnly />
                  </label>
                  <label className="input">
                     Tên lầu:
                     <input
                        type="text"
                        ref={props.nameRef}
                        name="name"
                        value={roomTypeName}
                        onChange={(e) => setRoomTypeName(e.target.value)}
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
      </>
   );
}

function RoomTypeList() {
   const [load, setLoad] = useState(false);
   const { data, loading, error } = useFetch(
      "http://localhost:8000/room-types",
      load
   );
   const [open, setOpen] = useState({
      add: false,
      edit: false,
   });
   const [roomTypeEdit, setRoomTypeEdit] = useState({
      id: "",
      name: "",
   });
   const nameRef = useRef();

   if (error) {
      console.log(error);
      return null;
   }

   const render = (array) =>
      array?.map((res) => (
         <tr key={res.id}>
            <td>{res.id}</td>
            <td>{res.name}</td>
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
      const roomTypeChoose = data?.find((current) =>
         current.id === id ? current : null
      );
      setRoomTypeEdit(roomTypeChoose);
      setOpen((prev) => ({ ...prev, edit: true }));
   };
   const handleDelete = (id) => {
      fetch(`http://localhost:8000/room-types/${id}`, {
         method: "delete",
      });
      handleReLoad();
   };
   const handleReLoad = () => {
      setLoad(!load);
   };
   return (
      <div className="list">
         <div className="list__header">
            <h3 className="title list__title">Phân loại phòng</h3>
            <button
               className="btn btn-add"
               onClick={() => setOpen((prev) => ({ ...prev, add: true }))}
            >
               Thêm loại phòng
            </button>
            {open.add && (
               <AddRoomType
                  setOpen={setOpen}
                  nameRef={nameRef}
                  onLoad={handleReLoad}
               />
            )}
            {open.edit && (
               <EditRoomType
                  setOpen={setOpen}
                  nameRef={nameRef}
                  onLoad={handleReLoad}
                  id={roomTypeEdit.id}
                  name={roomTypeEdit.name}
               />
            )}
         </div>
         <table>
            <thead>
               <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
               </tr>
            </thead>
            <tbody>
               {loading && (
                  <tr>
                     <td>Loading ... </td>
                  </tr>
               )}
               {render(data)}
            </tbody>
         </table>
      </div>
   );
}

export default memo(RoomTypeList);
