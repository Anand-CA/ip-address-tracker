import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Banner = ({ coordinates, setCoordinates }) => {
  const [data, setData] = useState([]);
  const [ipAddress, setIpAddress] = useState("");

  const fetchData = async () => {
    const res = await axios.get(
      `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${ipAddress}`
    );
    setData(res.data);
    setCoordinates({
      lat: res.data.location.lat,
      lng: res.data.location.lng,
    });
  };
  useEffect(() => {
    fetchData();
    return () => {
      setData([]);
      setCoordinates({ lat: 0, lng: 0 });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <Wrapper>
      <Container>
        <h1>IP Address Tracker</h1>
        <SearchBox>
          <input
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            type="text"
            placeholder="Search for any IP address or domain"
          />
          <div className="square" onClick={handleSubmit}>
            <img src="/images/icon-arrow.svg" alt="" />
          </div>
        </SearchBox>

        <StatsBox>
          <Stat>
            <h5>IP ADDRESS</h5>
            <h2>{data.ip}</h2>
          </Stat>

          <Stat>
            <h5>LOCATION</h5>
            <h2>{data.location?.city}</h2>
          </Stat>

          <Stat>
            <h5>TIMEZONE</h5>
            <h2>UTC{data.location?.timezone}</h2>
          </Stat>

          <Stat>
            <h5>ISP</h5>
            <h2>{data.isp}</h2>
          </Stat>
        </StatsBox>
      </Container>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div`
  background: url("/images/pattern-bg.png") no-repeat center center / cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 4.5rem 0;

  h1 {
    color: #fff;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  width: min(95%, 30rem);
  input {
    flex: 1;
    outline: none;
    border: none;
    padding: 0 1rem;
    font-size: 1rem;
  }
  .square {
    background: hsl(0, 0%, 17%);
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    &:active {
      img {
        transform: scale(0.9);
      }
    }
  }
`;

const StatsBox = styled.div`
  display: flex;
  align-items: center;
  z-index: 2;
  padding: 2.5rem;
  border-radius: 0.5rem;
  gap: 1.5rem;
  background: #fff;
  width: min(95%, 70rem);
  flex-flow: row wrap;
  margin-bottom: -150px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;
const Stat = styled.div`
  border-right: 1px solid lightgrey;
  flex-basis: 22%;
  @media (max-width: 768px) {
    flex-basis: 100%;
    border-right: none;
  }
  h5 {
    color: hsl(0, 0%, 59%);
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
  &:last-child {
    border-right: none;
  }
`;
