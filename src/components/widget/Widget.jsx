import "./widget.scss";

export default function Widget(props) {
   return (
      <div className="widget">
         <div className="widget__left">
            <div className="widget__title">{props.title}</div>
            <div className="widget__counter">{props.counter}</div>
            <div className="widget__link">{props.link}</div>
         </div>
         <div className="widget__right">
            <div className="widget__percentage">{props.per}</div>
            <div className="widget__icon">{props.icon}</div>
         </div>
      </div>
   );
}
