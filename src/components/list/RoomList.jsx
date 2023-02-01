import React from "react";
import "./list.scss";
import { useState, useEffect, useRef, memo } from "react";
import useFetch from "../hooks/useFetch";
import Modal from "../modal/Modal";
import { BsTrash } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";

function AddRoom(props) {
   const [data, setData] = useState({
      floors: [],
      roomTypes: [],
   });
   const [room, setRoom] = useState({
      floor: "Lầu 1",
      type: "Nhỏ",
      room: "",
      numberBed: 1,
      numberPeople: 2,
   });
   useEffect(() => {
      Promise.all([
         fetch("http://localhost:8000/floors").then((value) => value.json()),
         fetch("http://localhost:8000/room-types").then((value) =>
            value.json()
         ),
      ])
         .then(([floors, roomTypes]) => {
            setData((prev) => ({ ...prev, floors: floors }));
            setData((prev) => ({ ...prev, roomTypes: roomTypes }));
         })
         .catch((err) => {
            console.log(err);
         });
      props.nameRef.current.focus();
   }, []);

   const updateRoom = (e) => {
      setRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      Promise.all([
         fetch("http://localhost:8000/rooms", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               room: room.room,
               floor: room.floor,
               type: room.type,
               numberBed: room.numberBed,
               numberPeople: room.numberPeople,
            }),
         }),
         fetch("http://localhost:8000/room-status", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               room: room.room,
               status: "empty",
            }),
         }),
      ]);
      props.onLoad();
      props.setOpen(false);
   };

   return (
      <>
         <Modal
            title="Thêm phòng"
            setOpen={props.setOpen}
            body={
               <div className="form">
                  <label className="input">
                     Lầu:
                     <select
                        ref={props.nameRef}
                        name="floor"
                        value={room.floor}
                        onChange={updateRoom}
                     >
                        {data.floors?.map((data, index) => (
                           <option key={index} value={data.name}>
                              {data.name}
                           </option>
                        ))}
                     </select>
                  </label>
                  <label className="input">
                     Loại phòng:
                     <select
                        name="type"
                        value={room.type}
                        onChange={updateRoom}
                     >
                        {data.roomTypes?.map((data, index) => (
                           <option key={index} value={data.name}>
                              {data.name}
                           </option>
                        ))}
                     </select>
                  </label>
                  <label className="input">
                     Tên phòng:
                     <input type="text" name="room" onChange={updateRoom} />
                  </label>
                  <label className="input">
                     Số giường:
                     <input
                        type="text"
                        name="numberBed"
                        value={room.numberBed}
                        onChange={updateRoom}
                     />
                  </label>
                  <label className="input">
                     Số người:
                     <input
                        type="text"
                        name="numberPeople"
                        value={room.numberPeople}
                        onChange={updateRoom}
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

function EditRoom(props) {
   const [data, setData] = useState({
      floors: [],
      roomTypes: [],
   });
   const [room, setRoom] = useState({
      floor: props.room.floor,
      type: props.room.type,
      room: props.room.room,
      numberBed: props.room.numberBed,
      numberPeople: props.room.numberPeople,
   });
   useEffect(() => {
      Promise.all([
         fetch("http://localhost:8000/floors").then((value) => value.json()),
         fetch("http://localhost:8000/room-types").then((value) =>
            value.json()
         ),
      ])
         .then(([floors, roomTypes]) => {
            setData((prev) => ({ ...prev, floors: floors }));
            setData((prev) => ({ ...prev, roomTypes: roomTypes }));
         })
         .catch((err) => {
            console.log(err);
         });
      props.nameRef.current.focus();
   }, []);
   const updateRoom = (e) => {
      setRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`http://localhost:8000/floors/${props.id}`, {
         method: "patch",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            room: room.room,
            floor: room.floor,
            type: room.type,
            numberBed: room.numberBed,
            numberPeople: room.numberPeople,
         }),
      });
      props.onLoad();
      props.setOpen(false);
   };

   return (
      <>
         <Modal
            title="Sửa phòng"
            setOpen={props.setOpen}
            body={
               <div className="form">
                  <label className="input">
                     Id phòng:
                     <input type="text" value={props.room.id} readOnly />
                  </label>
                  <label className="input">
                     Lầu:
                     <select
                        ref={props.nameRef}
                        name="floor"
                        value={room.floor}
                        onChange={updateRoom}
                     >
                        {data.floors?.map((data, index) => (
                           <option key={index} value={data.name}>
                              {data.name}
                           </option>
                        ))}
                     </select>
                  </label>
                  <label className="input">
                     Loại phòng:
                     <select
                        name="type"
                        value={room.type}
                        onChange={updateRoom}
                     >
                        {data.roomTypes?.map((data, index) => (
                           <option key={index} value={data.name}>
                              {data.name}
                           </option>
                        ))}
                     </select>
                  </label>
                  <label className="input">
                     Tên phòng:
                     <input type="text" name="room" onChange={updateRoom} />
                  </label>
                  <label className="input">
                     Số giường:
                     <input
                        type="text"
                        name="numberBed"
                        value={room.numberBed}
                        onChange={updateRoom}
                     />
                  </label>
                  <label className="input">
                     Số người:
                     <input
                        type="text"
                        name="numberPeople"
                        value={room.numberPeople}
                        onChange={updateRoom}
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

function RoomList() {
   const [load, setLoad] = useState(false);
   const { data, loading, error } = useFetch(
      "http://localhost:8000/rooms",
      load
   );
   const [open, setOpen] = useState({
      add: false,
      edit: false,
   });
   const [roomEdit, setRoomEdit] = useState();

   const nameRef = useRef();

   if (error) {
      console.log(error);
      // setOpen((prev) => ({ ...prev, alert: true }));
      return null;
   }
   const render = (array) =>
      array?.map((res) => (
         <tr key={res.id}>
            <td>{res.id}</td>
            <td>{res.room}</td>
            <td>{res.floor}</td>
            <td>{res.type}</td>
            <td>{res.numberBed}</td>
            <td>{res.numberPeople}</td>
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
      const roomChoose = data?.find((current) =>
         current.id === id ? current : null
      );
      setRoomEdit(roomChoose);
      setOpen((prev) => ({ ...prev, edit: true }));
   };
   const handleDelete = (id) => {
      fetch(`http://localhost:8000/rooms/${id}`, {
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
            <h3 className="title list__title">Thông tin phòng</h3>
            <button
               className="btn btn-add"
               onClick={() => setOpen((prev) => ({ ...prev, add: true }))}
            >
               Thêm phòng
            </button>
            {open.add && (
               <AddRoom
                  setOpen={setOpen}
                  nameRef={nameRef}
                  onLoad={handleReLoad}
               />
            )}
            {open.edit && (
               <EditRoom
                  setOpen={setOpen}
                  nameRef={nameRef}
                  onLoad={handleReLoad}
                  room={roomEdit}
               />
            )}
         </div>
         <table>
            <thead>
               <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Floor</th>
                  <th>Room Type</th>
                  <th>Bed Number</th>
                  <th>People Number</th>
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

export default memo(RoomList);
