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

  static predictCoupon = (data) => {
    return axios.post("https://596e-2402-3a80-4170-3ce7-db1-6499-fc78-8c23.in.ngrok.io",
    data
    );
  };
}

let base = "";

export default CouponApi;
