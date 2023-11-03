import React from "react";
import Main from "../Components/Main";
import Row from "../Components/Row";
import request from "../Request";
const Home = () => {
  return (
    <div>
      <Main />
      <Row rowID="1" title="Now Playing" fetchURL={request.requestNowPlaying} />
      <Row rowID="2" title="UpComing" fetchURL={request.requestUpcoming} />
      <Row rowID="3" title="Top Rated" fetchURL={request.requestTopRated} />
      <Row rowID="4" title="Popular" fetchURL={request.requestPopular} />

    </div>
  );
};

export default Home;
