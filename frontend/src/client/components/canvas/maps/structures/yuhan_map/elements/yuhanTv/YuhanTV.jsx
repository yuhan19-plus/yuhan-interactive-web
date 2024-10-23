/** 파일 생정자 : 오자현
 * 유한TV 컴포넌트
 * 오자현 : 프론트엔드 개발
 * - 오브젝트 생성, position, 물리엔진적용(24/08/27)
 * 
 * 임성준 : 코드 수정 및 정리
 * - three.js로 메쉬 생성한 부분 r3f로 변경
 */
import { useBox } from "@react-three/cannon";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function YuhanTV({ position, rotation, ...props }) {
  const videoRef = useRef();
  const groupRef = useRef();

  const [_, api] = useBox(() => ({
    args: [200, 150, 11],
    type: 'Static',
    mass: 1,
    position: [
      position[0],
      position[1],
      position[2] + 0.495
    ],
    ...props,
  }));

  useEffect(() => {
    // 비디오 요소 생성 및 속성 설정
    const video = document.createElement("video");
    video.src = "/assets/video/video360p.mp4"; // 로컬 비디오 파일 경로
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.play();
    videoRef.current = video;

    // 비디오 텍스처 생성
    const texture = new THREE.VideoTexture(video);
    texture.format = THREE.RGBAFormat; // RGBA 포맷으로 변경
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // 그룹에 비디오 텍스처가 있는 평면 추가
    if (groupRef.current) {
      groupRef.current.children[0].material.map = texture // 메쉬의 첫 번째 자식에 텍스처 맵을 적용
    }

    return () => {
      video.pause();
      video.src = "";
      videoRef.current = null;
    };
  }, [groupRef]);

  return (
    <group ref={groupRef} position={[position[0], position[1] - 3, position[2]]} rotation={rotation} scale={50}>
      {/* TV 화면 메쉬 */}
      <mesh
        position={[0, 0.15, 0.11]}
      >
        <planeGeometry args={[3.8, 2]} />
        <meshBasicMaterial />
      </mesh>
      {/* TV 프레임 메쉬 */}
      <mesh>
        <boxGeometry args={[4, 2.6, 0.2]} />
        <meshPhongMaterial color={0x000000} />
      </mesh>
    </group>
  );
}
