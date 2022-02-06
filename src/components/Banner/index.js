import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			delayChildren: 0.5,
			staggerChildren: 0.5
		}
	}
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 }
};

const Banner = ({ coordinates, setCoordinates }) => {
	const [data, setData] = useState([]);
	const [ipAddress, setIpAddress] = useState("");

	const fetchData = async () => {
		const res = await axios.get(
			`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IP_API_KEY}&ipAddress=${ipAddress}&domain=${ipAddress}`
		);
		setData(res.data);
		setCoordinates({
			lat: res.data.location?.lat,
			lng: res.data.location?.lng
		});
	};
	useEffect(() => {
		fetchData();
		return () => {
			setData([]);
			setCoordinates({ lat: 0, lng: 0 });
		};
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		fetchData();
		setIpAddress("");
	};

	return (
		<Wrapper>
			<Container variants={container} initial="hidden" animate="show">
				<motion.h1 variants={item}>IP Address Tracker</motion.h1>
				<SearchBox variants={item} onSubmit={handleSubmit}>
					<input
						value={ipAddress}
						onChange={e => setIpAddress(e.target.value)}
						type="text"
						placeholder="Search for any IP address or domain"
					/>
					<button type="submit" className="square">
						<img src="/images/icon-arrow.svg" alt="" />
					</button>
				</SearchBox>

				<StatsBox>
					<Stat variants={item}>
						<img src="/images/ip.png" alt="" />

						<h5>IP ADDRESS</h5>
						<h2>{data.ip}</h2>
					</Stat>

					<Stat variants={item}>
						<img src="/images/address.png" alt="" />
						<h5>LOCATION</h5>
						<h2>{data.location?.city}</h2>
					</Stat>

					<Stat variants={item}>
						<img src="/images/timezone.png" alt="" />
						<h5>TIMEZONE</h5>
						<h2>{data.location?.timezone}</h2>
					</Stat>

					<Stat variants={item}>
						<img src="/images/isp.png" alt="" />
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

const Container = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;
	padding: 4.5rem 0;

	h1 {
		color: #fff;
		font-size: 2.5rem;
		@media (max-width: 768px) {
			font-size: 2rem;
		}
	}
`;

const SearchBox = styled(motion.form)`
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
		@media (max-width: 768px) {
			font-size: 0.8rem;
		}
	}
	button {
		background: hsl(0, 0%, 17%);
		width: 3rem;
		border: none;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		cursor: pointer;
		@media (max-width: 768px) {
			width: 2.5rem;
			height: 2.5rem;
		}
		&:active {
			img {
				transform: scale(0.9);
			}
		}
	}
`;

const StatsBox = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	z-index: 2;
	gap: 1rem;
	padding: 1rem;
	border-radius: 0.5rem;
	background: #fff;
	width: min(95%, 70rem);
	margin-bottom: -11rem;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	@media (max-width: 768px) {
		/* margin-bottom: -27rem; */
	}
`;
const Stat = styled(motion.div)`
	background: rgba(210, 210, 210, 0.3);
	padding: 1.5rem 1rem;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 0.2rem;
	img {
		object-fit: contain;
		height: 4.5rem;
	}
	h5 {
		color: hsl(0, 0%, 59%);
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
		@media (max-width: 768px) {
			font-size: 0.6rem;
		}
	}
	h2 {
		font-size: 1.5rem;
		@media (max-width: 768px) {
			font-size: 1.2rem;
		}
	}
	&:last-child {
	}
`;
