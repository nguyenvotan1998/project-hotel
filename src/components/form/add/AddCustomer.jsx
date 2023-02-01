import { useState } from "react";
export default function AddCustomer() {
   const [customer, setCustomer] = useState({
      customerId: "",
      customerFullName: "",
      customerBirthday: "",
      customerPhoneNumber: "",
      customerIdCard: "",
      customerCompany: "",
      customerAddress: "",
      customerCity: "",
      customerMemberType: "",
   });
   const [lastOrder, setLastOrder] = useState();

   const handleChange = (event) => {};

   const handleSubmit = (event) => {
      event.preventDefault();
      fetch("http://localhost:8000/floors", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({}),
      });
      window.location.reload();
   };
   return (
      <>
         <form class="form" onSubmit={handleSubmit}>
            <label>
               Mã khách hàng:
               <input type="text" name="customerName" onChange={handleChange} />
            </label>
            <label>
               Họ và tên:
               <input type="text" name="floorName" onChange={handleChange} />
            </label>
            <label>
               Ngày sinh:
               <input type="date" name="floorName" onChange={handleChange} />
            </label>
            <label>
               Số điện thoại:
               <input type="text" name="floorName" onChange={handleChange} />
            </label>
            <label>
               Email:
               <input type="text" name="floorName" onChange={handleChange} />
            </label>
            <label>
               CMND/CCCD:
               <input type="text" name="floorName" onChange={handleChange} />
            </label>
            <label>
               Company:
               <input type="text" name="floorName" onChange={handleChange} />
            </label>
            <label>
               Địa chỉ:
               <input type="text" name="floorName" onChange={handleChange} />
            </label>
            <label>
               Loại thành viên:
               {/* <input type="text" name="floorName" onChange={handleChange} /> */}
               <select name="select-member" id="select-member">
                  <option value="default">Chọn loại thẻ ...</option>
                  <option value="bronze">Đồng</option>
                  <option value="silver">Bạc</option>
                  <option value="gold">Vàng</option>
                  <option value="diamond">Kim Cương</option>
               </select>
            </label>
            <label>
               Địa chỉ:
               <input type="text" name="floorName" onChange={handleChange} />
            </label>
         </form>
      </>
   );
}
