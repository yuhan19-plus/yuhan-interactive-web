import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { motion } from 'framer-motion-3d';

const ThreeDCode = ({ resultCode }) => {
    const meshRef = useRef();
    const colorArray = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF"];

    useEffect(() => {
        if (!meshRef.current) return;

        // console.log(resultCode); // 값 전달 확인
        const loader = new FontLoader();

        // 폰트 로딩 (해당 경로에 JSON 폰트가 존재해야 합니다)
        loader.load('/assets/fonts/HakgyoansimWoojuR.json', (font) => {
            const textGeometry = new TextGeometry(resultCode || '', {
                font: font,
                size: 5,       // 텍스트 크기
                height: 2,     // 텍스트 깊이
                curveSegments: 12,
                bevelEnabled: false, // 베벨(경사) 옵션
            });

            const material = new THREE.MeshStandardMaterial({
                color: colorArray[Math.floor(Math.random() * colorArray.length)]
            });
            const textMesh = new THREE.Mesh(textGeometry, material);

            // 기존에 추가된 객체가 있으면 제거하고 새로운 텍스트 추가
            meshRef.current.clear();
            meshRef.current.add(textMesh);
        });
    }, [resultCode]);

    return (
        <motion.group
            animate={{ x: [0, -5, 0], y: [30, 40, 30], z: [150, 150, 150], rotateY: [0, Math.PI * 2] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'loop' }}
        >
            <group ref={meshRef} position={[0, 40, 0]}>
                {/* 이곳에 텍스트가 렌더링됨 */}
            </group>
        </motion.group>
    );
};

export default ThreeDCode;
