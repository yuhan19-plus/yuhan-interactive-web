import React from "react";
import { Html } from '@react-three/drei';
import styled from "styled-components";

const SmokingArea = ({ position }) => {
  return (
    <Html position={position} center>
      <BoardLayout>
        <h2><img style={{width:"8%",height:"8%",verticalAlign:"sub"}}src="assets/images/smokingArea.png"/> 흡연장 위치 안내 <img style={{width:"8%",height:"8%",verticalAlign:"sub"}}src="assets/images/smokingArea.png"/></h2>
        <ImageContainer>
        <img style={{boxShadow:1,borderRadius:7,width:"100%",height:"100%"}}src="assets/images/smokingAreaPosition.png"/>
        </ImageContainer>
        <Description>
          <p>♣ <strong>옥상 흡연구역</strong> 5장소: 1(평화관), 2(봉사관), 5(나눔관), 6(창조관), 7(유일한 기념관)호관</p>
          <p>♣ <strong>지상 흡연구역</strong> 2장소: 평화관 1층 현관 앞 흡연부스, 정문 농구장 앞 야외쉼터</p>
          <p>♥ 흡연구역(지정장소) 7장소를 제외한 모든 장소는 '금연구역'입니다.</p>
          <p>※ 7호관(유일한 기념관), 8호관(유재라관) 사이 작은 숲은 '금연구역'입니다.</p>
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
  font-size: 16px;
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
