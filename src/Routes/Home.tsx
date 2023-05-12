import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { Suspense } from "react";
import { makeImagePath } from "../utills";

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
			<SBanner bhPhoto={makeImagePath(data?.results[1].backdrop_path || "")}>
				<STitle>{data?.results[1].title}</STitle>
				<SOverView>{data?.results[1].overview}</SOverView>
			</SBanner>
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
