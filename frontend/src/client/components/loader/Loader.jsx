/** 파일 생성자 : 임성준
 * 오브젝트 담당 : 이정민
 * 기능구현 : 오자현
 */
import { Canvas } from '@react-three/fiber';
import { useProgress} from '@react-three/drei';
import React from 'react';
import styled from 'styled-components';
import { Bus } from './testObject/Bus';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <LoaderLayout>
      {/* 3D 모델을 렌더링할 Canvas */}
      <CanvasWrapper>
        <Canvas camera={{ position: [0, 0, 5] }}> {/* 카메라 위치 조정 */}
            <ambientLight intensity={0.7} /> {/* 조명 강도 증가 */}
            <Bus position={[0, -0.5, 0]} scale={0.2} /> 
        </Canvas>
      </CanvasWrapper>

      {/* 로딩 바 */}
      <Progressing>
        <Bar width={progress}>Loading {progress.toFixed(2)}%</Bar>
      </Progressing>
    </LoaderLayout>
  );
};

export default Loader;

const LoaderLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellowgreen;//#0f275c
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CanvasWrapper = styled.div`
  width: 100%;
  height: 50%; /* 캔버스가 로딩 바 위에 적절히 배치되도록 크기 조정 */
  position: absolute;
  top: 20%; /* 캔버스가 화면 중앙 위쪽에 오도록 배치 */
`;

const Progressing = styled.div`
  width: 50%;
  max-width: 400px;
  height: 25px;
  background-color: white;
  border-radius: 12.5px;
  overflow: hidden;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  margin-top: 20px;
`;

const Bar = styled.div`
  width: ${(props) => `${props.width}%`};
  height: 100%;
  background-color: yellow;
  border-radius: 12.5px 0 0 12.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: #0f275c;
  transition: width 0.3s ease;
  box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.1);
`;
