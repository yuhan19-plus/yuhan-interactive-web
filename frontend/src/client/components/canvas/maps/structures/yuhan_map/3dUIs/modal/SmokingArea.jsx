import React from "react";
import { Html } from '@react-three/drei';
import styled from "styled-components";

const SmokingArea = ({ position }) => {
  return (
    <Html position={position} center>
      <BoardLayout>
        <h2><img style={{width:"8%",height:"8%",verticalAlign:"sub"}}src="assets/images/smokingArea.png"/> 흡연장 위치 안내 <img style={{width:"8%",height:"8%",verticalAlign:"sub"}}src="assets/images/smokingArea.png"/></h2>
        <ImageContainer>
        <img style={{boxShadow:1,borderRadius:7,width:"90%",height:"90%"}}src="assets/images/smokingAreaPosition.png"/>
        </ImageContainer>
        <Description>
          <NoticeText>
            교내 흡연 가능 구역을 아래와 같이 안내하오니 참고하시기 바라며, 지정된 흡연 구역 외에서는 반드시 금연(<RedText>위반 시 과태료가 부과될 수 있음</RedText>)하여 주시기 바랍니다.
          </NoticeText>
          <RedText><p>♣ <strong><RedText>옥상 흡연구역</RedText></strong> 5장소: 1(평화관), 2(봉사관), 5(나눔관), 6(창조관), 7(유일한 기념관)호관</p></RedText>
          <p><BlueText>♣ <strong><BlueText>지상 흡연구역</BlueText></strong> 2장소: 평화관 1층 현관 앞 흡연부스, 정문 농구장 앞 야외쉼터</BlueText></p>
          <p><GreenText>♥ 흡연구역(지정장소) 7장소를 제외한 모든 장소는 '금연구역'입니다.</GreenText></p>
          <p><GreenUnderlineText>※ 7호관(유일한 기념관), 8호관(유재라관) 사이 작은 숲은 '금연구역'입니다.</GreenUnderlineText></p>
        </Description>
      </BoardLayout>
    </Html>
  );
};

export default SmokingArea;

const BoardLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 50vh;
  height: auto;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: Arial, sans-serif;
  
  h2 {
    margin-bottom: 10px;
    font-size: 24px;
    color: #333;
  }
`;

const ImageContainer = styled.div`
  margin: 20px 0;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Description = styled.div`
  font-size: 12px;
  color: #555;
  text-align: left;
  line-height: 1.6;

  strong {
    color: #000;
  }

  p {
    margin: 5px 0;
  }
`;

const NoticeText = styled.p`
  margin-bottom: 10px;
`;

const RedText = styled.span`
  color: red;
`;

const BlueText = styled.span`
  color: blue;
`;

const GreenText = styled.span`
  color: green;
`;

const GreenUnderlineText = styled.span`
  color: green;
  text-decoration: underline;
`;
