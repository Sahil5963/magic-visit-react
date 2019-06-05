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
        viewBox="0 0 128.715 54.201"
      >
        <g
          id="Group_123"
          data-name="Group 123"
          transform="translate(-122 -23.248)"
        >
          <g
            id="Group_122"
            data-name="Group 122"
            transform="translate(257.035 39.216) rotate(141)"
          >
            <g
              id="Group_121"
              data-name="Group 121"
              transform="translate(8.784 0)"
            >
              <g
                id="Group_120"
                data-name="Group 120"
                transform="translate(0 0)"
              >
                <path
                  id="Path_28"
                  data-name="Path 28"
                  d="M17.053,0,18.1,9.606l8.508,4.581L17.8,18.153,16.071,27.66l-6.5-7.155L0,21.8l4.8-8.387L.607,4.705l9.459,1.971Z"
                  transform="translate(0 0)"
                  fill="#32ac85"
                />
                <path
                  id="Path_29"
                  data-name="Path 29"
                  d="M10.886,0l.67,6.132,5.431,2.925-5.625,2.532-1.1,6.069L6.112,13.09,0,13.916,3.062,8.562.387,3,6.426,4.262Z"
                  transform="translate(4.537 4.472)"
                  fill={color2}
                />
              </g>
            </g>
            <path
              id="Path_37"
              data-name="Path 37"
              d="M3.6,0,4.877,2.329,7.207,3.6,4.877,4.877,3.6,7.206,2.329,4.877,0,3.6,2.329,2.329Z"
              transform="translate(0 10.044)"
              fill="#c1ffeb"
            />
            <path
              id="Path_36"
              data-name="Path 36"
              d="M3.5,0,4.736,2.262,7,3.5,4.736,4.736,3.5,7,2.262,4.736,0,3.5,2.262,2.262Z"
              transform="translate(30.407 23.948) rotate(-21)"
              fill="#c5ffec"
            />
          </g>
          <text
            id="Visit"
            transform="translate(187.826 69.449)"
            fill={color2}
            fontSize="22"
            fontFamily="Nunito-Regular, Nunito"
          >
            <tspan x="0" y="0">
              Visit
            </tspan>
          </text>
          <text
            id="Magic"
            transform="translate(122 69.449)"
            fill={color1}
            fontSize="22"
            fontFamily="Nunito-Bold, Nunito"
            fontWeight="700"
          >
            <tspan x="0" y="0">
              Magic
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default logo;
