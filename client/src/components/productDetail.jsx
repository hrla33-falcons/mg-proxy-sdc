import React from "react";
import StarReview from "./starReview.jsx";

const ProductDetail = props => (
  <div>
    <div>
      <div className="dk-productDetailName">{props.data.name}</div>
      <div style={{ lineHeight: 2.3 }}>{props.data.shortDesc}</div>
      <div className="dk-productPrice">${props.data.price}.00</div>
      <div display="flex">
        <span>
          <StarReview
            rating={props.data.rating}
            reviewNum={props.data.reviewNum}
          />
        </span>
        <span className="dk-reviewCount">{props.data.reviewNum} Reviews</span>
      </div>
      <br />
      <span style={{ lineHeight: 1.4 }}>{props.data.midDesc}</span>
      <span className="dk-readMore">Read More</span>
    </div>
    <div></div>
  </div>
);

export default ProductDetail;
