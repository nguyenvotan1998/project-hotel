import "./container.scss";

export default function Container(props) {
   return (
      <div className="container">
         <div className="container__header">
            <h2 className="container__title">{props.title}</h2>
            {props.isButton && (
               <div className="container__btn-group">{props.button}</div>
            )}
         </div>
         <div className="container__body">{props.body}</div>
         {props.isFooter && (
            <div className="container__footer">{props.footer}</div>
         )}
      </div>
   );
}
