/** 파일 생성자 : 임성준
 * 오브젝트 담당 : 이정민
 * 기능구현 : 오자현
 */
import { Canvas } from '@react-three/fiber';
import React from 'react';
import styled from 'styled-components';
import { LoadingAnimation } from './loadingObject/LoaderObject';

const Loader = ({ progress }) => {
  return (
    <LoaderLayout>
      {/* 3D 모델을 렌더링할 Canvas */}
      <CanvasWrapper>
        <Canvas camera={{ position: [0, 4, 15] }}> 
          <ambientLight intensity={2.5} /> 
          <LoadingAnimation />
        </Canvas>
      </CanvasWrapper>

      {/* 로딩 바 */}
      <Progressing>
        <Bar width={progress}>Loading {progress.toFixed(0)}%</Bar>
      </Progressing>
    </LoaderLayout>
  );
};

export default Loader;

const LoaderLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color:#56bbb6; // 그라데이션인데 위아래 색은 다시 물어봐야함 햇갈림
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CanvasWrapper = styled.div`
  width: 100%;
  height: 70%; 
  position: absolute;
  top: 10%; 
`;
const Progressing = styled.div`
  width: 60%; /* 폭을 키움 */
  max-width: 500px; /* 최대 폭을 키움 */
  height: 30px; /* 높이를 키움 */
  background-color: white;
  border-radius: 15px; /* 높이에 맞춰 둥글게 */
  overflow: hidden;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  margin-top: 25vh;
`;

const Bar = styled.div`
  width: ${(props) => `${props.width}%`};
  height: 100%;
  background-color: yellow;
  border-radius: 15px 0 0 15px; /* 높이에 맞춰 둥글게 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* 폰트 크기도 살짝 키움 */
  font-weight: bold;
  color: #0f275c;
  transition: width 0.3s ease;
  box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.1);
`;