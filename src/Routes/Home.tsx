import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { Suspense } from "react";
import { makeImagePath } from "../utills";
import { motion } from "framer-motion";

const SWrapper = styled.div`
	background-color: black;
`;

const Loading = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SBanner = styled.div<{ bhPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		${(props) => "url(" + props.bhPhoto + ")" || "none"};
	background-size: cover;
`;

const STitle = styled.h2`
	font-size: 48px;
	margin-bottom: 15px;
`;

const SOverView = styled.p`
	font-size: 18px;
	width: 50%;
`;

const SSlider = styled.div``;

const SRow = styled(motion.div)``;

function MovieBanner() {
	const { data, isLoading } = useQuery<IGetMoviesResult>(
		["movies", "nowPlaying"],
		getMovies,
		{
			suspense: true,
		}
	);
	console.log(data, isLoading);
	return (
		<>
			<SBanner bhPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
				<STitle>{data?.results[0].title}</STitle>
				<SOverView>{data?.results[0].overview}</SOverView>
			</SBanner>
			<SSlider>
				<SRow>
					<SBox />
					<SBox />
					<SBox />
					<SBox />
					<SBox />
					<SBox />
				</SRow>
			</SSlider>
		</>
	);
}

function Home() {
	return (
		<SWrapper>
			<Suspense fallback={<Loading>Loading...</Loading>}>
				<MovieBanner></MovieBanner>
			</Suspense>
		</SWrapper>
	);
}
export default Home;
