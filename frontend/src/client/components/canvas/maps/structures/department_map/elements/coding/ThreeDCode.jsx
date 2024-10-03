import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const ThreeDCode = ({ resultCode }) => {
    const meshRef = useRef();

    useEffect(() => {
        if (!meshRef.current) return;

        console.log(resultCode); // 값 전달 확인
        const loader = new FontLoader();
        
        // 폰트 로딩 (해당 경로에 JSON 폰트가 존재해야 합니다)
        loader.load('/assets/fonts/HakgyoansimWoojuR.json', (font) => {
            const textGeometry = new TextGeometry(resultCode || 'No Text', {
                font: font,
                size: 5,       // 텍스트 크기
                height: 2,     // 텍스트 깊이
                curveSegments: 12,
                bevelEnabled: false, // 베벨(경사) 옵션
            });

            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const textMesh = new THREE.Mesh(textGeometry, material);

            // 기존에 추가된 객체가 있으면 제거하고 새로운 텍스트 추가
            meshRef.current.clear();
            meshRef.current.add(textMesh);
        });
    }, [resultCode]);

    return (
        <group ref={meshRef} position={[0, 0, 0]}>
            {/* 이곳에 텍스트가 렌더링됨 */}
        </group>
    );
};

export default ThreeDCode;
