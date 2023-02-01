import { useState, useRef, useEffect } from "react";
import Modal from "../../modal/Modal";
import useFetch from "../../hooks/useFetch";

export default function AddPrice(props) {
   const { data, loading, error } = useFetch(
      "http://localhost:8000/room-types"
   );
   const [roomType, setRoomType] = useState("Nhỏ");
   const [method, setMethod] = useState("hours");
   const [price, setPrice] = useState();
   const [early, setEarly] = useState();
   const [late, setLate] = useState();

   const floor = useRef();

   //    useEffect(() => {
   //       floor.current.focus();
   //    }, []);

   const render = (array) =>
      array?.map((res) => (
         <option key={res.id} value={res.name}>
            {res.name}
         </option>
      ));

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:8000/room-prices", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            roomType: roomType,
            method: method,
            price: price,
            early: early,
            late: late,
         }),
      });
      window.location.reload(false);
   };

   return (
      <>
         <Modal
            title="Thêm giá phòng"
            setOpen={props.setOpen}
            body={
               <>
                  <label>
                     Loại phòng:
                     <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                     >
                        {render(data)}
                     </select>
                  </label>
                  <div className="input radio">
                     <label>
                        Tính ngày
                        <input
                           id="days"
                           value="days"
                           name="calculationMethod"
                           type="radio"
                           onChange={(e) => setMethod(e.target.value)}
                        />
                     </label>
                     <label>
                        Tính giờ
                        <input
                           id="hours"
                           value="hours"
                           name="calculationMethod"
                           type="radio"
                           defaultChecked
                           onChange={(e) => setMethod(e.target.value)}
                        />
                     </label>
                  </div>
                  <label>
                     Giá:
                     <input
                        type="text"
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                     />
                  </label>
                  {method === "days" ? (
                     <label>
                        Giá vào sớm:
                        <input
                           type="text"
                           name="price"
                           onChange={(e) => setEarly(e.target.value)}
                        />
                     </label>
                  ) : (
                     <></>
                  )}
                  <label>
                     Giá trả trễ
                     <input
                        type="text"
                        name="price"
                        onChange={(e) => setLate(e.target.value)}
                     />
                  </label>
               </>
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
