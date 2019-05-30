import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import styled, { css } from "styled-components";

const ChartDiv = styled.div`
  background: #fff;
  height: 100%;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 2px 6px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;

  &:hover {
    box-shadow: 2px 6px 20px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

function Chart(props) {
  return (
    <ChartDiv>
      <Line
        data={props.chartData}
        options={{
          maintainAspectRatio: false
        }}
      />
    </ChartDiv>
  );
}

export default Chart;
