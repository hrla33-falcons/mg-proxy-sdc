import React from "react";
import PropTypes from "prop-types";
import ZoomImages from "../zoomImages.jsx";
import Modal from "./modal.jsx";

export default function ZoomPageModal(props) {
  return (
    <Modal>
      <div className="modal">
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div>
            <button className="dk-zoomCloseButton" onClick={props.onClose}>
              <svg width="20" height="20">
                <path d="M17.597 5l-5.592 5.592L6.414 5 5 6.415l5.591 5.591L5 17.597l1.414 1.414 5.591-5.592 5.592 5.592 1.414-1.414-5.592-5.591 5.592-5.591z" />
              </svg>
            </button>
            <div className="dk-zoomImage">
              {props.imageSrc.map(img => (
                <ZoomImages list={img} key={img} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
//

ZoomPageModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool
};
