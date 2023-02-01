import "./home.scss";
import Container from "../../components/container/Container";
import RoomStatusList from "../../components/room-status/RoomStatusList";
export default function Home() {
   return (
      <div className="page">
         <Container title="Danh sách phòng" body={<RoomStatusList />} />
      </div>
   );
}
