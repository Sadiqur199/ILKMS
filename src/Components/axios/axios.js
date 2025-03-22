import axios from "axios";
const instance = axios.create({
  // baseURL: "http://192.168.68.137:5000",
  // baseURL: "https://bhumipedia.land.gov.bd",
 //  baseURL: "http://157.230.243.221",
   baseURL: "https://bhumipedia.land.gov.bd"
});
/*instance.interceptors.response.use(

    (response) => {
       return response;
    },
    (error) => {
       if (error) {

if (error.response.status === 403) {
/!*               alert("You are not authorized to access this page");
                  window.location.href = "/login";*!/
    console.log("You are not authorized to access this page");
    // logout();
            }

       }

    }
);*/
export default instance;