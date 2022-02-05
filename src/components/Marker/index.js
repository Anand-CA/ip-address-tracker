import React from "react";
import styled, { keyframes } from "styled-components";

const Marker = ({ text, color }) => {
  return (
    <Wrapper style={{ backgroundColor: color, cursor: "pointer" }}>
      <img src="/images/pin.png" alt="" />
    </Wrapper>
  );
};

export default Marker;

const pulse = keyframes`
     0%, 100% {
    opacity: 1;
    transform: scale(.7);
  }
  50% {
    opacity: .5;
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  user-select: none;
  background: transparent;
  img {
    height: 3rem;
    color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-in-out;
    animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;
