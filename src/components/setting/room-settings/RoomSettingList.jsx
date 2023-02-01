import "./room-setting-list.scss";
import RoomSetting from "./RoomSetting";

export default function RoomSettingList(props) {
   console.log(props);
   return (
      <div className="room-setting-list">
         <RoomSetting title="Thông tin phòng" />
         <RoomSetting title="Danh sách đặt phòng" />
         <RoomSetting title="Đặt phòng" />
         <RoomSetting title="Chi tiết giá phòng" />
      </div>
   );
}
