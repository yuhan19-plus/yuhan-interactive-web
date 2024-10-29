/** 파일 생성자 : 임성준
 * 오브젝트 담당 : 이정민
 * 기능구현 : 오자현
 */
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoadingAnimation } from './loadingObject/LoaderObject';
import { LoadingMessages } from '../../../data/commonData';

const Loader = ({ progress }) => {
 // 처음 로드될 때만 메시지를 랜덤으로 설정
 const [message, setMessage] = useState('');

 useEffect(() => {
   const randomMessage = LoadingMessages[Math.floor(Math.random() * LoadingMessages.length)];
   setMessage(randomMessage);
 }, []); // 빈 배열을 사용하여 처음 렌더링 시 한 번만 실행

  return (
    <LoaderLayout>
      {/* 3D 모델을 렌더링할 Canvas */}
      <CanvasWrapper>
        <Canvas camera={{ position: [0, 4, 15] }}>
          <ambientLight intensity={2.5} />
          <LoadingAnimation />
        </Canvas>
      </CanvasWrapper>
      <BubbleChat>
        {message}
      </BubbleChat>
      {/* 로딩 바 */}
      <Progressing>
        <Bar width={progress}>학교갈 준비 중 {progress.toFixed(0)}%</Bar>
      </Progressing>
    </LoaderLayout>
  );
};

export default Loader;

const LoaderLayout = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #FFFFFF 0%, #FFCB05 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CanvasWrapper = styled.div`
  width: 100%;
  height: 90%; 
  position: absolute;
  top: -3%; 
`;

const Progressing = styled.div`
  width: 60%;
  max-width: 40vw; 
  height: 5vh;
  background-color: var(--sub-color);
  border-radius: 2.5vh; 
  overflow: hidden;
  box-shadow: 0vw 0.4vh 1.5vh rgba(0, 0, 0, 0.2); 
  position: relative;
  z-index: 1;
  margin-top: 45vh;
`;

const Bar = styled.div`
  width: ${(props) => `${props.width}%`};
  height: 100%;
  background: var(--yuhan-orange-color);
  border-radius: 2.5vh 0 0 2.5vh; 
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5vw;
  font-weight: bold;
  color: var(--sub-color);
  transition: width 0.3s ease;
  box-shadow: inset 0vw 0.2vh 0.5vh rgba(0, 0, 0, 0.1);
`;

const BubbleChat = styled.div`
  background-color: var(--sub-color);
  padding: 2vw 4vh;
  border-radius: 1vw;
  position: relative;
  font-size: 1.5vw;
  font-weight: bold;
  color: #2C3E50;
  margin-top: -10vh;
  margin-left: 20vw; 
  box-shadow: 0vw 0.4vw 1vw rgba(0, 0, 0, 0.2);
  white-space: pre-line;

  /* 말풍선 꼬리 부분 */
  &:after {
    content: '';
    position: absolute;
    bottom: 2vh; 
    left: -4vh;
    width: 0;
    height: 0;
    border-width: 1.5vh 5vh 1.5vh 0;
    border-style: solid;
    border-color: transparent #FFFFFF transparent transparent;
  }
`;