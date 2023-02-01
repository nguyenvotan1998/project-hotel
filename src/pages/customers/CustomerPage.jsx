import "./customer-page.scss";
import Container from "../../components/container/Container";
import CustomerList from "../../components/list/CustomerList";

export default function CustomerPage() {
   return (
      <div className="page">
         <Container
            title="Danh sách khách hàng"
            body={
               <>
                  <CustomerList />
               </>
            }
         />
      </div>
   );
}
