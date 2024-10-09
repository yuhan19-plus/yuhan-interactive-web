import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { motion } from 'framer-motion-3d';

const ThreeDCode = ({ resultCode }) => {
    const firstmMshRef = useRef();
    const staticMeshRef = useRef();
    const finalMeshRef = useRef();
    const colorArray = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF"];
    const [codeResult, setCodeResult] = useState([]);
    const [randomColor, setRandomColor] = useState("#FFFFFF"); // 색상을 상태로 관리
    const [font, setFont] = useState(null); // 로드된 폰트를 상태로 저장

    useEffect(() => {
        // 폰트 로딩을 Promise로 처리
        const loader = new FontLoader();
        loader.load('/assets/fonts/HakgyoansimWoojuR.json', (loadedFont) => {
            setFont(loadedFont); // 폰트가 로드되면 상태에 저장
        });
    }, []); // 처음에만 실행하도록 설정

    useEffect(() => {
        if (!font || !firstmMshRef.current || !staticMeshRef.current || !finalMeshRef.current) return;

        const num = resultCode;
        if (num !== '') {
            const resultArray = [];
            for (let i = 1; i <= 9; i++) {
                const firstPart = `${num}`;
                const StaticPart = ` x ${i} =`;
                const resultPart = `${num * i}`;
                resultArray.push({ firstPart, StaticPart, resultPart });
            }
            setCodeResult(resultArray);

            const randomIdx = Math.floor(Math.random() * colorArray.length);
            setRandomColor(colorArray[randomIdx]);

            // 기존 텍스트 지우기
            firstmMshRef.current.clear();
            staticMeshRef.current.clear();
            finalMeshRef.current.clear();

            resultArray.forEach((line, index) => {
                // 첫숫자
                const FirstGeometry = new TextGeometry(line.firstPart, {
                    font: font,
                    size: 5,
                    height: 2,
                    curveSegments: 5,
                    bevelEnabled: false,
                });

                // numberPart: " * 1 =" 부분
                const StaticGeometry = new TextGeometry(line.StaticPart, {
                    font: font,
                    size: 5,
                    height: 2,
                    curveSegments: 5,
                    bevelEnabled: false,
                });

                // resultPart: "2" 같은 부분
                const resultGeometry = new TextGeometry(line.resultPart, {
                    font: font,
                    size: 5,
                    height: 2,
                    curveSegments: 5,
                    bevelEnabled: false,
                });

                const ColorMaterial = new THREE.MeshStandardMaterial({
                    color: randomColor,
                });

                const StaticMaterial = new THREE.MeshStandardMaterial({
                    color: '#FFFFFF'
                });

                const FirstMesh = new THREE.Mesh(FirstGeometry, ColorMaterial);
                FirstMesh.position.set(-2, -index * 8, 0); // Y축으로 각 줄을 아래로 이동
                firstmMshRef.current.add(FirstMesh);

                const StaticMesh = new THREE.Mesh(StaticGeometry, StaticMaterial);
                StaticMesh.position.set(0, -index * 8, 0); // Y축으로 각 줄을 아래로 이동
                staticMeshRef.current.add(StaticMesh);

                const resultMesh = new THREE.Mesh(resultGeometry, ColorMaterial);
                resultMesh.position.set(17, -index * 8, 0); // 고정된 부분을 옆으로 이동
                finalMeshRef.current.add(resultMesh);
            });
        } else {
            setCodeResult([]);
        }
    }, [resultCode, font]); // 폰트가 로드된 후에만 이 효과 실행

    return (
        <group position={[75, 35, 240]} rotation={[0, Math.PI, 0]}>
            <motion.group
                animate={{scale: [1, 1.125, 1] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'loop' }}
            >
                <group ref={firstmMshRef}></group>
            </motion.group>
            <group ref={staticMeshRef}></group>
            <motion.group
                animate={{scale: [1, 1.125, 1] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
            >
                <group ref={finalMeshRef}></group>
            </motion.group>
        </group>
    );
};

export default ThreeDCode;
