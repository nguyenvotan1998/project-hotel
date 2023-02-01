import "./modal.scss";
import { FaRegTimesCircle } from "react-icons/fa";

export default function Modal(props) {
   const closeByOverlay = (e) => {
      e.stopPropagation();
      props.setOpen(false);
   };

   const closeByIcon = (e) => {
      e.stopPropagation();
      props.setOpen(false);
   };

   const handleKeyEscape = (e) => {
      if (e.key === "Escape") {
         props.setOpen(false);
      }
   };

   return (
      <div className="modal" onKeyDown={handleKeyEscape}>
         <div className="modal__overlay" onClick={closeByOverlay}></div>
         <div className="modal__content">
            <div className="modal__header">
               <h2>{props.title}</h2>
               <FaRegTimesCircle className="icon" onClick={closeByIcon} />
            </div>
            <div className="modal__body">{props.body}</div>
            <div className="modal__footer">{props.footer}</div>
         </div>
      </div>
   );
}
