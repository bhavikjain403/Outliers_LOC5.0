import axios from "./index";

class CouponApi {
  static getAllStaticCoupons = (company) => {
    return axios.get(`${base}/sCoupon/getAllStatic?company_name=${company}`);
  };

  static generateStaticCoupon = (data) => {
    return axios.post(`${base}/sCoupon/generate`,
    data
    );
  };
}

let base = "";

export default CouponApi;
