import axios from "./index";

class CouponApi {
  static getAllStaticCoupons = (company) => {
    return axios.get(`${base}/sCoupon/getAllStatic?company_name=${company}`);
  };
}

let base = "";

export default CouponApi;
