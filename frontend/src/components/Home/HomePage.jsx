import React from "react";
import img5 from "../../assets/img/Group 2444.png";
import img2 from "../../assets/img/Group 7330.png";
import img1 from "../../assets/img/Group 7436.png";
import img3 from "../../assets/img/Group 7482.png";
import img4 from "../../assets/img/googleadsensesm.png";
import logo from "../../assets/img/incento.png";
import "../Home/global.css";

function HomePage() {
  return (
    // <>
    <div className="vision">
      <div className="vision_head">
        <div className="vision_header">
          <img
            src={logo}
            alt=".."
            style={{ maxHeight: "250px", marginTop: "-5rem" }}
          />
        </div>
        <div className="vision_img">
          <img
            src={img5}
            alt=".."
            style={{ maxWidth: "110%", marginTop: "-9rem" }}
          />
        </div>
        <h3>One stop destination for all your Promotional Marketing needs</h3>
      </div>
      <div className="vision_cards_group">
        <div className="vision_cards">
          <div className="vision_cards_img">
            <img src={img1} alt="card-1" />
          </div>
          <div className="vision_cards_text">
            <p>Personalized & targeted</p>
          </div>
        </div>
        <div className="vision_cards">
          <div className="vision_cards_img">
            <img src={img2} alt="card-2" />
          </div>
          <div className="vision_cards_text">
            <p>Powerful coupon creation</p>
          </div>
        </div>
        <div className="vision_cards">
          <div className="vision_cards_img">
            <img src={img3} alt="card-3" />
          </div>
          <div className="vision_cards_text">
            <p>Easy to track coupons</p>
          </div>
        </div>
        <div className="vision_cards">
          <div className="vision_cards_img">
            <img src={img4} alt="card-4" />
          </div>
          <div className="vision_cards_text">
            <p>Analysis of Promotions for Insights</p>
          </div>
        </div>
      </div>
    </div>

    // </>
  );
}
export default HomePage;
