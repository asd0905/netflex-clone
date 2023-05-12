import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { Suspense, useState } from "react";
import { makeImagePath } from "../utills";
import { motion, AnimatePresence } from "framer-motion";

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

const SSlider = styled.div`
  position: relative;
  top: -100px;
`;

const SRow = styled(motion.div)`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const SBox = styled(motion.div)`
  background-color: #fff;
  height: 200px;
  font-size: 30px;
  color: red;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};

function MovieBanner() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies,
    {
      suspense: true,
    }
  );
  console.log(data, isLoading);
  const [index, setIndex] = useState(0);
  const increaseIndex = () => setIndex((prev) => prev + 1);
  return (
    <>
      <SBanner
        onClick={increaseIndex}
        bhPhoto={makeImagePath(data?.results[2].backdrop_path || "")}
      >
        <STitle>{data?.results[2].title}</STitle>
        <SOverView>{data?.results[2].overview}</SOverView>
      </SBanner>
      <SSlider>
        <AnimatePresence>
          <SRow
            variants={rowVariants}
            initial="hidden"
            animate={"visible"}
            exit={"exit"}
            transition={{ ease: "linear", duration: 5 }}
            key={index}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SBox key={i}>{i}</SBox>
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
