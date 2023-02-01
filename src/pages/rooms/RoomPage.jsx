import { memo, useState } from "react";
import "./room-page.scss";
import Container from "../../components/container/Container";
import FloorList from "../../components/list/FloorList";
import RoomTypeList from "../../components/list/RoomTypeList";
import RoomList from "../../components/list/RoomList";

function RoomPage() {
   return (
      <div className="page">
         <Container
            title="Phân loại phòng"
            body={
               <>
                  <FloorList />
                  <RoomTypeList />
               </>
            }
         />
         <Container
            title="Danh sách phòng"
            body={
               <>
                  <RoomList />
               </>
            }
         />
      </div>
   );
}

export default RoomPage;
