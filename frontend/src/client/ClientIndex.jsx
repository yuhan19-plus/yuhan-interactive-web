/**
 * 파일생성자 : 임성준
 * 로딩기능 구현: 오자현
 */

import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import Loader from './components/loader/Loader';
import CanvasLayout from './components/canvas_layout/CanvasLayout';
import MainCanvas from './components/canvas/MainCanvas';
import { GLTFLoader } from 'three-stdlib';

const ClientIndex = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // 로딩기능부분

  useEffect(() => {
    console.log('ClientIndex 컴포넌트가 마운트되었습니다.');

    // YuhanMap.glb 로드 여부를 확인하는 함수
    const checkIfYuhanMapLoaded = () => {
      // 이미 로드된 경우를 확인하는 로직
      const cachedMap = THREE.Cache.get('/assets/models/YuhanMap.glb');
      return cachedMap ? true : false;
    };

    if (checkIfYuhanMapLoaded()) {
      // 이미 YuhanMap.glb가 로드된 경우
      setIsLoaded(true);
      console.log('이미 YuhanMap.glb가 로드되었습니다.');
    } else {
      // YuhanMap.glb를 로드하는 로직
      const loader = new GLTFLoader();
      loader.load(
        '/assets/models/YuhanMap.glb',
        (gltf) => {
          // console.log('YuhanMap.glb 로드 완료');
          setIsLoaded(true);  // 로딩 완료로 설정
        },
        undefined,
        (err) => {
          console.error('YuhanMap.glb 로드 오류:', err);
        }
      );
    }

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
