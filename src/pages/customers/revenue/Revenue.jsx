import "./revenue.scss";
import Widget from "../../../components/widget/Widget";
import { GrGroup } from "react-icons/gr";
import { CiMoneyBill } from "react-icons/ci";
import { BiBed } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsArrowDownRight } from "react-icons/bs";
import { BsArrowUpRight } from "react-icons/bs";

export default function Revenue() {
   return (
      <div className="dashboard">
         <div className="widgets">
            <Widget
               title="ROOM"
               counter="15/20"
               link={<a>See details</a>}
               icon={<BiBed />}
            />
            <Widget
               title="CUSTOMER"
               counter="15/20"
               link={<a>See details</a>}
               icon={<GrGroup />}
            />
            <Widget
               title="REVENUE"
               counter="15/20"
               link={<a>See details</a>}
               icon={<RiMoneyDollarCircleLine />}
               per={
                  <>
                     <BsArrowDownRight />
                     <span>20%</span>
                  </>
               }
            />
            <Widget
               title="REVENUE"
               counter="15/20"
               link={<a>See details</a>}
               icon={<RiMoneyDollarCircleLine />}
            />
         </div>
      </div>
   );
}
