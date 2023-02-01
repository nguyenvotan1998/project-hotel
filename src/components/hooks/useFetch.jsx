import { useState, useEffect } from "react";

export default function useFetch(url, load) {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   useEffect(() => {
      fetch(url)
         .then((res) => {
            if (res.status >= 400) {
               throw new Error("Server responds with error!");
            }
            return res.json();
         })
         .then(
            (data) => {
               setData(data);
               setLoading(false);
            },
            (error) => {
               setLoading(false);
               setError(error);
            }
         );
   }, [load]);
   return { data, loading, error };
}
