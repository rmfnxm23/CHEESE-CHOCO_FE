import { LoadingStyle } from "./styled";

const Loading = () => {
  return (
    <LoadingStyle>
      <div className="Loading-wrap">
        <div className="Loading-box">
          <div className="Loading-div"></div>
          <p className="Loading-text">LOADING...</p>
        </div>
      </div>
    </LoadingStyle>
  );
};

export default Loading;
