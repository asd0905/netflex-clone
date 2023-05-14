import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { Suspense, useState } from "react";
import { makeImagePath } from "../utills";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";

const SWrapper = styled.div`
	background-color: black;
	overflow-x: hidden;
`;

const SLoading = styled.div`
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
	background-position: center center;
`;

const STitle = styled.h2`
	font-size: 48px;
	margin-bottom: 15px;
`;

const SOverView = styled.p`
	font-size: 18px;
	width: 50%;
`;

const SSlider = styled.div`
	position: relative;
	top: -150px;
`;

const SRow = styled(motion.div)`
	display: grid;
	grid-gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
`;

const SBox = styled(motion.div)<{ bgphoto: string }>`
	background-color: #fff;
	height: 100px;
	font-size: 30px;
	color: red;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	cursor: pointer;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;

const SInfo = styled(motion.div)`
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	opacity: 0;
	position: absolute;
	width: 100%;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.8);
	h4 {
		font-size: 14px;
		text-align: center;
		color: #ffffff;
		font-weight: normal;
	}
`;

const rowVariants = {
	hidden: {
		x: document.body.clientWidth + 5,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -document.body.clientWidth - 5,
	},
};

const boxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.3,
		y: -30,
		transition: {
			delay: 0.5,
			type: "tween",
			duration: 0.3,
		},
	},
	blur: {
		transition: {
			type: "tween",
		},
	},
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duration: 0.3,
			type: "tween",
		},
	},
};

const offset = 6;

function MovieBanner() {
	const navigation = useNavigate();
	const bigMovieMatch = useMatch("/movies/:movieId");
	const { data, isLoading } = useQuery<IGetMoviesResult>(
		["movies", "nowPlaying"],
		getMovies,
		{
			suspense: true,
			refetchOnWindowFocus: false,
		}
	);
	console.log(data, isLoading);
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = data.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (index === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const handleBoxClick = (movieId: number) => {
		navigation(`/movies/${movieId}`);
	};
	return (
		<>
			<SBanner
				onClick={increaseIndex}
				bhPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
			>
				<STitle>{data?.results[0].title}</STitle>
				<SOverView>{data?.results[0].overview}</SOverView>
			</SBanner>
			<SSlider>
				<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
					<SRow
						variants={rowVariants}
						initial='hidden'
						animate={"visible"}
						exit={"exit"}
						transition={{ ease: "linear", duration: 1 }}
						key={index}
					>
						{data?.results
							.slice(1)
							.slice(offset * index, offset * index + offset)
							.map((movie) => (
								<SBox
									key={movie.id}
									layoutId={movie.id + ""}
									variants={boxVariants}
									whileHover={"hover"}
									initial={"normal"}
									transition={{ type: "tween" }}
									onClick={() => {
										handleBoxClick(movie.id);
									}}
									bgphoto={makeImagePath(
										movie.backdrop_path || movie.poster_path,
										"w500"
									)}
								>
									<SInfo variants={infoVariants}>
										<h4>{movie.title}</h4>
									</SInfo>
								</SBox>
							))}
					</SRow>
				</AnimatePresence>
			</SSlider>
			<AnimatePresence>
				{bigMovieMatch ? (
					<motion.div
						layoutId={bigMovieMatch.params.movieId}
						style={{
							position: "absolute",
							width: "40vw",
							height: "80vh",
							backgroundColor: "pink",
							top: 10,
							left: 0,
							right: 0,
							margin: "0 auto",
						}}
					></motion.div>
				) : null}
			</AnimatePresence>
		</>
	);
}

function Home() {
	return (
		<SWrapper>
			<Suspense fallback={<SLoading>Loading...</SLoading>}>
				<MovieBanner></MovieBanner>
			</Suspense>
		</SWrapper>
	);
}
export default Home;
