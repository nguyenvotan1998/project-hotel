import { useState } from "react";
import Modal from "../modal/Modal";

export default function RoomInfo() {
   return (
      <>
         <Modal
            title="Thông tin phòng"
            setOpen={props.setOpenForm}
            body={
               <>
                  <label>
                     Tên lầu:
                     <input
                        type="text"
                        name="floorName"
                        onChange={handleChange}
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
