/** 파일 생정자 : 오자현
 * 유한TV 컴포넌트
 * 오자현 : 프론트엔드 개발
 * - 오브젝트 생성, position, 물리엔진적용(24/08/27)
 */
import { useBox } from "@react-three/cannon";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function YuhanTV({ position, rotation, ...props }) {
  const videoRef = useRef();
  const groupRef = useRef();

  const x = position[0];
  const y = position[1];
  const z = position[2];

  const [_, api] = useBox(() => ({
    args: [200, 170, 11],
    type: 'Static',
    mass: 1,
    position: [x, y + 10, z+0.495],
    ...props
  }))

  useEffect(() => {
    // console.log("포지션", position);
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

    // TV 화면 메쉬 생성
    const screenGeometry = new THREE.PlaneGeometry(3.8, 2.8);
    const screenMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = 0.11;
    screenMesh.position.y = 0.24;

    groupRef.current.add(screenMesh);

    return () => {
      video.pause();
      video.src = "";
      videoRef.current = null;
    };
  }, [groupRef]);


  return (
    <group ref={groupRef} position={[x, y + 5, z]} rotation={rotation} scale={50}>
      <mesh>
        <boxGeometry args={[4, 3.4, 0.2]} position={[x, y + 25, z]} />
        <meshPhongMaterial color={0x000000} />
      </mesh>
    </group>
  );
}
