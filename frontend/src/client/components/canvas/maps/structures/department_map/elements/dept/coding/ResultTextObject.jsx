/**
 * 오자현
 * 구구단을 3D로 보여주는 컴포넌트
 * 
 * 기능 구현 - 오자현
 * - 구구단연산, 3D 글자 애니매이션
 */
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { motion } from 'framer-motion-3d';

const ResultTextObject = ({ receivedNumber }) => {
    const [randomColor, setRandomColor] = useState("#33FF57");
    const [font, setFont] = useState(null); // 로드된 폰트를 상태로 저장

    const firstmMshRef = useRef();
    const staticMeshRef = useRef();
    const finalMeshRef = useRef();

    const colorArray = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF"];
    const randomIdx = Math.floor(Math.random() * colorArray.length);

    useEffect(() => {
        // 폰트 로딩을 Promise로 처리
        const loader = new FontLoader();
        loader.load('/assets/fonts/HakgyoansimWoojuR.json', (loadedFont) => {
            setFont(loadedFont); // 폰트가 로드되면 상태에 저장
        });
    }, []);

    useEffect(() => {
        if (!font || !firstmMshRef.current || !staticMeshRef.current || !finalMeshRef.current) return;

        const num = receivedNumber;
        if (num !== '') {
            const resultArray = [];
            for (let i = 1; i <= 9; i++) {
                const firstPart = `${num}`;
                const StaticPart = ` x ${i} =`;
                const resultPart = `${num * i}`;
                resultArray.push({ firstPart, StaticPart, resultPart });
            }

            // ResultTextObject의 랜덤색과 고정색
            setRandomColor(colorArray[randomIdx]);
            const ColorMaterial = new THREE.MeshStandardMaterial({ color: randomColor, });
            const StaticMaterial = new THREE.MeshStandardMaterial({ color: '#FFFFFF' });

            // 기존 텍스트 지우기
            firstmMshRef.current.clear();
            staticMeshRef.current.clear();
            finalMeshRef.current.clear();

            resultArray.forEach((line, index) => {
                // fistPart: 2*3=6에서 "2" 부분  
                const FirstGeometry = new TextGeometry(line.firstPart, {
                    font: font,
                    size: 5,
                    height: 2,
                    curveSegments: 5,
                    bevelEnabled: false,
                });

                // numberPart: 2*3=6에서 " * 3 =" 부분
                const StaticGeometry = new TextGeometry(line.StaticPart, {
                    font: font,
                    size: 5,
                    height: 2,
                    curveSegments: 5,
                    bevelEnabled: false,
                });

                // resultPart: 2*3=6에서 "6" 부분
                const resultGeometry = new TextGeometry(line.resultPart, {
                    font: font,
                    size: 5,
                    height: 2,
                    curveSegments: 5,
                    bevelEnabled: false,
                });

                const FirstMesh = new THREE.Mesh(FirstGeometry, ColorMaterial);
                const StaticMesh = new THREE.Mesh(StaticGeometry, StaticMaterial);
                const resultMesh = new THREE.Mesh(resultGeometry, ColorMaterial);

                FirstMesh.position.set(-2, -index * 8, 0);
                StaticMesh.position.set(0, -index * 8, 0);
                resultMesh.position.set(17, -index * 8, 0);

                firstmMshRef.current.add(FirstMesh);
                staticMeshRef.current.add(StaticMesh);
                finalMeshRef.current.add(resultMesh);
            });
        } else {
        }
    }, [receivedNumber, font]); // 폰트가 로드된 후 실행

    return (
        <group position={[120, 60, 260]} rotation={[0, Math.PI, 0]}>
            <motion.group
                animate={{ scale: [1, 1.125, 1], y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'loop' }}
            >
                <group ref={firstmMshRef}></group>
            </motion.group>
            <group ref={staticMeshRef}></group>
            <motion.group
                animate={{ scale: [1, 1.125, 1], y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
            >
                <group ref={finalMeshRef}></group>
            </motion.group>
        </group>
    );
};

export default ResultTextObject;
