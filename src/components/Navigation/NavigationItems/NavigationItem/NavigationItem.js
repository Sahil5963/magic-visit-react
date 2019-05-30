import React from "react";
// import classes from './NavigationItem.module.css'
// import { NavLink } from "react-router-dom";

import Icon from "@material-ui/core/Icon";
import styled, { css } from "styled-components";

const NavItem = styled.li`
  padding: 1rem 0rem 1rem 2rem;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s;
  display: flex;
  font-size: 1rem;

  &:hover {
    background: rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }
`;

const NavItemIcon = styled.span`
  color: inherit;
  margin-right: 1.4rem;
  display: flex;
  align-items: center;

  &height: 2rem;
`;

const navigationItem = props => {
  return (
    <NavItem>
      <NavItemIcon>
        <Icon>home</Icon>
      </NavItemIcon>
      {props.children}

      {/* <NavLink
        activeStyle={{ color: "red" }}
        to={props.link}
        exact={props.exact}
      >
        {props.children}
      </NavLink> */}
    </NavItem>
  );
};

export default navigationItem;
