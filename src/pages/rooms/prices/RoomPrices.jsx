import Container from "../../../components/container/Container";
import PriceList from "../../../components/list/PriceList";

export default function RoomPrices() {
   return (
      <div className="page">
         <Container
            title="Giá phòng"
            body={
               <>
                  <PriceList />
               </>
            }
         />
      </div>
   );
}
