/**
 * 파일생성자 : 임성준
 * 로딩기능 구현: 오자현
 */

import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import Loader from './components/loader/Loader';
import CanvasLayout from './components/canvas_layout/CanvasLayout';
import MainCanvas from './components/canvas/MainCanvas';

const ClientIndex = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // 로딩기능부분
  useEffect(() => {
    // 로딩 시작 이벤트
    THREE.DefaultLoadingManager.onStart = (url, item, total) => {
      // console.log('로딩 시작:', url);
      setProgress(0);
    };

    // 로딩 진행 상황 이벤트
    THREE.DefaultLoadingManager.onProgress = (url, loaded, total) => {
      const progressPercentage = (loaded / total) * 100;
      setProgress(progressPercentage);
      // console.log(`로딩 중: ${loaded}/${total}`);
    };

    // 로딩 완료 이벤트
    THREE.DefaultLoadingManager.onLoad = () => {
      // console.log('로딩 완료');
      setIsLoaded(true);
    };

    // 로딩 오류 이벤트
    THREE.DefaultLoadingManager.onError = (url) => {
      console.error(`로딩 오류 발생: ${url}`);
    };
  }, []);

  if (isLoaded) {
    return (
      <div>
        <CanvasLayout>
          <MainCanvas />
        </CanvasLayout>
      </div>
    );
  } else {
    return <Loader progress={progress} />;
  }
};

export default ClientIndex;
