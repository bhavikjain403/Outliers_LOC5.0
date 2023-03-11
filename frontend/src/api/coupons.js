import axios from "./index";

class CouponApi {
  static getAllStaticCoupons = (company) => {
    return axios.get(`${base}/sCoupon/getAllStatic?company_name=${company}`);
  };
  static getAllDynamicCoupons = (company) => {
    return axios.get(`${base}/dCoupon/getAllDynamic?company_name=${company}`);
  };

  static generateStaticCoupon = (data) => {
    return axios.post(`${base}/sCoupon/generate`,
    data
    );
  };

  static generateDynamicCoupon = (data) => {
    return axios.post(`${base}/Dcoupon/generate`,
    data
    );
  };
}

let base = "";

export default CouponApi;
