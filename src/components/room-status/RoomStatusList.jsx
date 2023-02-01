import "./room-status-list.scss";
import { useState, useEffect, useCallback } from "react";
import RoomStatus from "../room-status/RoomStatus";
import { GiBroom } from "react-icons/gi";

// function formatDate(value) {
//    const array = value.split("-");
//    return array[2] + "/" + array[1];
// }

export default function RoomStatusList() {
   const [data, setData] = useState({
      floors: [],
      rooms: [],
      status: [],
   });

   const [load, setLoad] = useState(false);

   useEffect(() => {
      Promise.all([
         fetch("http://localhost:8000/floors").then((value) => value.json()),
         fetch("http://localhost:8000/rooms").then((value) => value.json()),
         fetch("http://localhost:8000/room-status").then((value) =>
            value.json()
         ),
      ])
         .then(([floors, rooms, status]) => {
            setData((prev) => ({ ...prev, floors: floors }));
            setData((prev) => ({ ...prev, rooms: rooms }));
            setData((prev) => ({ ...prev, status: status }));
         })
         .catch((err) => {
            console.log(err);
         });
   }, [load]);

   // const check

   const handleReLoad = useCallback(() => {
      setLoad(!load);
   }, []);

   return (
      <div className="wrapper">
         {data.floors?.map((f) => (
            <div key={f.id} className="floor">
               <h2>{f.name}</h2>
               <div className="room-status-container">
                  {data.rooms?.map((r) =>
                     f.name === r.floor
                        ? data.status?.map((s) =>
                             r.room === s.room ? (
                                s.status === "empty" ? (
                                   <RoomStatus
                                      key={r.id}
                                      onLoad={handleReLoad}
                                      bg="white"
                                      status={s}
                                   />
                                ) : s.status === "notclean" ? (
                                   <RoomStatus
                                      key={r.id}
                                      onLoad={handleReLoad}
                                      iconStatus={<GiBroom />}
                                      status={s}
                                   />
                                ) : s.status === "using" ? (
                                   s.method === "hours" ? (
                                      <RoomStatus
                                         key={r.id}
                                         onLoad={handleReLoad}
                                         bg="red"
                                         status={s}
                                      />
                                   ) : s.method === "days" ? (
                                      <RoomStatus
                                         key={r.id}
                                         onLoad={handleReLoad}
                                         bg="orange"
                                         status={s}
                                      />
                                   ) : s.method === "book" ? (
                                      <RoomStatus
                                         key={r.id}
                                         onLoad={handleReLoad}
                                         bg="blue"
                                         status={s}
                                      />
                                   ) : null
                                ) : null
                             ) : null
                          )
                        : null
                  )}
               </div>
            </div>
         ))}
      </div>
   );
}
