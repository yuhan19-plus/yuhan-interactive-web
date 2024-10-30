import React from "react";
import { Html } from '@react-three/drei';
import styled from "styled-components";

const SmokingArea = ({ position }) => {
  return (
    <Html
      position={position}
      center
    >
      <SmokingWrapper
          onPointerUp={(e) => {
              e.stopPropagation()
          }}
      >
        <SmokingHeader>
          <img style={{width:"8%", height:"8%", verticalAlign:"sub"}} src="assets/images/smokingArea.png"/>
          <p>흡연장 위치 안내</p>
          <img style={{width:"8%",height:"8%",verticalAlign:"sub"}}src="assets/images/smokingArea.png"/>
        </SmokingHeader>
        <ImageContainer>
          <img src="assets/images/smokingAreaPosition.png"/>
        </ImageContainer>
        <DescriptionContainer>
          <p>
            교내 흡연 가능 구역을 아래와 같이 안내하오니 참고하시기 바라며, 지정된 흡연 구역 외에서는 반드시 금연(<span className="font-color-red">위반 시 과태료가 부과될 수 있음</span>)하여 주시기 바랍니다.
          </p>
          <p className="font-color-red">♣ <strong>옥상 흡연구역</strong> 5장소: 1(평화관), 2(봉사관), 5(나눔관), 6(창조관), 7(유일한 기념관)호관</p>
          <p className="font-color-blue">♣ <strong>지상 흡연구역</strong> 2장소: 평화관 1층 현관 앞 흡연부스, 정문 농구장 앞 야외쉼터</p>
          <p className="font-color-green">♥ 흡연구역(지정장소) 7장소를 제외한 모든 장소는 '금연구역'입니다.</p>
          <p className="font-color-green" style={{textDecoration: 'underline'}}>※ 7호관(유일한 기념관), 8호관(유재라관) 사이 작은 숲은 '금연구역'입니다.</p>
        </DescriptionContainer>
      </SmokingWrapper>
    </Html>
  );
};

export default SmokingArea;

const SmokingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 50vh;
  height: auto;
  background-color: var(--sub-opacity-color2);
  border-radius: 1rem;
  padding: 1.3rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SmokingHeader = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 1rem;
    font-size: 1.5rem;
`

const ImageContainer = styled.div`
  width: 100%;
`;

const DescriptionContainer = styled.div`
  font-size: 1rem;
  line-height: 1.3;
`;
