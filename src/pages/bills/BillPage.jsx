import "./bill-page.scss";
import { useState } from "react";
import Container from "../../components/container/Container";
// import AddRoom from "../../components/form/add/AddRoom";
// import FloorList from "../../components/list/FloorList";
// import RoomTypeList from "../../components/list/RoomTypeList";
// import RoomList from "../../components/list/RoomList";
import BillList from "../../components/list/BillList";

function Header(props) {
   return (
      <div className="bill-page-header">
         <input id="bill-id" type="text" placeholder="Id" />
         <input id="bill-room" type="text" placeholder="Room" />
         <input id="bill-customer" type="text" placeholder="Customer" />
         <button className="btn" onClick={() => props.setOpen(true)}>
            Tìm
         </button>
         {/* {props.open && <AddRoom setOpen={props.setOpen} />} */}
      </div>
   );
}

export default function BillPage() {
   const [open, setOpen] = useState(false);

   return (
      <div className="page">
         <Container
            title="Danh sách hóa đơn"
            isButton={true}
            button={<Header open={open} setOpen={setOpen} />}
            body={
               <>
                  <BillList />
               </>
            }
         />
      </div>
   );
}
