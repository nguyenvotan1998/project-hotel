import "./room-setting.scss";

export default function RoomSetting(props) {
   return (
      <div className="room-setting" onClick={props.onClick}>
         <p>{props.title}</p>
      </div>
   );
}
