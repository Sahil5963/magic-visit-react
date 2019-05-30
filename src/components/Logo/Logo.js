import React from "react";
import classes from "./Logo.module.css";

const logo = props => {
  const color1 = props.color1;
  const color2 = props.color2;

  return (
    <div className={classes.Logo}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={props.height}
        viewBox="0 0 73.718 36.864"
      >
        <g id="kik" transform="translate(-60.032 -80.022)">
          <path
            id="Path_7"
            data-name="Path 7"
            d="M311.979,148.534a4.225,4.225,0,1,1-4.244,4.225A4.234,4.234,0,0,1,311.979,148.534Z"
            transform="translate(-182.473 -50.47)"
            fill="#4ecca3"
          />
          <path
            id="Path_8"
            data-name="Path 8"
            d="M172.593,152.035H164.9l.008-19.131,7.682.027Z"
            transform="translate(-77.254 -38.956)"
            fill={color1}
          />
          <path
            id="Path_9"
            data-name="Path 9"
            d="M91.728,109.171a3.858,3.858,0,1,1-3.8,3.858A3.828,3.828,0,0,1,91.728,109.171Zm0-19.17a3.859,3.859,0,1,1-3.8,3.858A3.829,3.829,0,0,1,91.728,90ZM64.1,109.266a3.809,3.809,0,1,1-3.756,3.809A3.782,3.782,0,0,1,64.1,109.266Zm.017-29.244a3.852,3.852,0,1,1-3.771,3.851A3.811,3.811,0,0,1,64.12,80.022Z"
            transform="translate(-0.232)"
            fill={color1}
          />
          <path
            id="Path_10"
            data-name="Path 10"
            d="M60.033,95.149l7.667.081.038,14.122,7.1-6.941L80.5,107.69,75.5,112.607l6.979,9.408-6.224,4.517-6.65-8.889-1.936,1.8v5l-7.638-.3V95.149Z"
            transform="translate(0 -11.143)"
            fill={color1}
          />
          <path
            id="Path_11"
            data-name="Path 11"
            d="M116.321,90a3.849,3.849,0,1,1-3.836,3.849A3.842,3.842,0,0,1,116.321,90Zm1.55,19.147a3.867,3.867,0,1,1-3.813,3.867A3.84,3.84,0,0,1,117.871,109.15Zm25.322.116a3.809,3.809,0,1,1-3.756,3.809A3.782,3.782,0,0,1,143.193,109.266Zm.016-29.244a3.852,3.852,0,1,1-3.771,3.851A3.812,3.812,0,0,1,143.209,80.022Z"
            transform="translate(-38.64)"
            fill={color1}
          />
          <path
            id="Path_12"
            data-name="Path 12"
            d="M214.515,95.149l7.667.081.038,14.122,7.1-6.941,5.66,5.278-4.993,4.917,6.979,9.408-6.224,4.517-6.649-8.889-1.936,1.8v5l-7.639-.3V95.149Z"
            transform="translate(-113.801 -11.143)"
            fill={color1}
          />
          <path
            id="Path_13"
            data-name="Path 13"
            d="M270.8,117.923a3.849,3.849,0,1,1-3.836,3.849,3.842,3.842,0,0,1,3.836-3.849Zm1.55,19.147a3.867,3.867,0,1,1-3.813,3.867A3.84,3.84,0,0,1,272.353,137.07Z"
            transform="translate(-152.441 -27.92)"
            fill={color1}
          />
        </g>
      </svg>
    </div>
  );
};

export default logo;
