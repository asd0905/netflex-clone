import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { Suspense, useState } from "react";
import { makeImagePath } from "../utills";
import { motion, AnimatePresence } from "framer-motion";

const SWrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
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
  top: -200px;
`;

const SRow = styled(motion.div)`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const SBox = styled(motion.div)<{ bgPhoto: string }>`
  background-color: #fff;
  height: 200px;
  font-size: 30px;
  color: red;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
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

const offset = 6;

function MovieBanner() {
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
            initial="hidden"
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
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                ></SBox>
              ))}
          </SRow>
        </AnimatePresence>
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
