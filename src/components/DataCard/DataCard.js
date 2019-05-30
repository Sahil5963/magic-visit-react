import React from "react";
import styled, { css } from "styled-components";

function DataCard(props) {
  const Card = styled.div`
    padding: 1.2rem 0rem;
    color: #2a2a2a;
    border-radius: 6px;
    background: ${props.primary ? "#2DE6AA" : "#fff"};
    text-align: center;
    transition: all 0.2s;

    &:hover {
      box-shadow: inset 2px 6px 20px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  `;

  const PrimaryHeading = styled.h3`
    font-size: 1.8rem;
  `;
  const SecondaryHeading = styled.h2`
    font-size: 2.4rem;
  `;

  return (
    <Card>
      <PrimaryHeading>{props.primaryHeading}</PrimaryHeading>
      <SecondaryHeading>{props.secondaryHeading}</SecondaryHeading>
    </Card>
  );
}

export default DataCard;
