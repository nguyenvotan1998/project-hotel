export function timeNow() {
   const now = new Date();
   const h = now.getHours();
   const m = now.getMinutes();
   const hh = h < 10 ? "0" + h : h;
   const mm = m < 10 ? "0" + m : m;
   return hh + ":" + mm;
}

export function dateNow() {
   const now = new Date();
   const y = now.getFullYear();
   const m = now.getMonth() + 1;
   const d = now.getDate();
   const mm = m < 10 ? "0" + m : m;
   const dd = d < 10 ? "0" + d : d;
   return y + "-" + mm + "-" + dd;
}

export function dateNowForDisplay() {
   const now = new Date();
   const y = now.getFullYear();
   const m = now.getMonth() + 1;
   const d = now.getDate();
   const mm = m < 10 ? "0" + m : m;
   const dd = d < 10 ? "0" + d : d;
   return dd + "-" + mm + "-" + y;
}

export function tomorrow() {
   const now = new Date();
   const y = now.getFullYear();
   const m = now.getMonth() + 1;
   const d = now.getDate() + 1;
   const mm = m < 10 ? "0" + m : m;
   const dd = d < 10 ? "0" + d : d;
   return y + "-" + mm + "-" + dd;
}

export function subTime(timeIn, timeOut) {
   const arrayIn = timeIn.split(":");
   const arrayOut = timeOut.split(":");

   const hourIn = Number(arrayIn[0]);
   const minuteIn = Number(arrayIn[1]);
   const hourOut = Number(arrayOut[0]);
   const minuteOut = Number(arrayOut[1]);

   let totalHour, totalMinute;

   if (minuteOut >= minuteIn) {
      totalMinute = minuteOut - minuteIn;
      if (hourOut >= hourIn) {
         totalHour = hourOut - hourIn;
      } else {
         totalHour = 24 - hourIn + hourOut;
      }
   } else {
      totalMinute = 60 - minuteIn + minuteOut;
      if (hourOut > hourIn) {
         totalHour = hourOut - hourIn - 1;
      } else {
         totalHour = 24 - hourIn + hourOut - 1;
      }
   }

   if (totalHour < 10) {
      totalHour = String("0") + totalHour;
   }
   if (totalMinute < 10) {
      totalMinute = String("0") + totalMinute;
   }

   return totalHour + ":" + totalMinute;
}

export function subDate(dateIn, dateOut) {
   const arrayIn = dateIn.split("/");
   const arrayOut = dateOut.split("/");
   let totalDate, totalMonth;
   totalDate = Number(arrayOut[0]) - Number(arrayIn[0]);
   totalMonth = Number(arrayOut[1]) - Number(arrayIn[1]);
   if (totalDate < 10) {
      totalDate = String("0") + totalDate;
   }
   if (totalMonth < 10) {
      totalMonth = String("0") + totalMonth;
   }

   return totalDate + "/" + totalMonth;
}

export function formatDate(value) {
   const array = value.split("-");
   return array[2] + "/" + array[1];
}

export function roundTime(value) {
   const array = value.split(":");
   if (array[1] > 15) {
      return Number(array[0]) + 1;
   } else {
      return Number(array[0]);
   }
}
