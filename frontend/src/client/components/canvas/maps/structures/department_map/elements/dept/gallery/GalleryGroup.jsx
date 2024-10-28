import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GalleryBoard } from './Galleryboard'
import { Plane } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import axios from 'axios'
import GalleryModal from '../modal/GalleryModal';
import { Zone } from '../../../../common/Zone';

const GalleryGroup = () => {
    const [pictures, setPictures] = useState([]);
    const [workInfo, setWorkInfo] = useState([]);

    // 작품 영역 상태 가져오기
    const isInFirstWork = useSelector((state) => state.galleryArea.inFirstWork);
    useEffect(()=>{
        console.log("1등 작품",isInFirstWork)
    },[isInFirstWork])
    const isInSecondWork = useSelector((state) => state.galleryArea.inSecondWork);
    useEffect(()=>{
        console.log("2등 작품",isInSecondWork)
    },[isInSecondWork])
    const isInThirdWork = useSelector((state) => state.galleryArea.inThirdWork);
    useEffect(()=>{
        console.log("3등 작품",)
    },[isInThirdWork])

    useEffect(() => {
        // 백엔드에서 사진 데이터를 가져오는 함수
        const fetchPictures = async () => {
            try {
                const response = await axios.get('/api/gallery/fetchPicture');
                setPictures(response.data);
                console.log("데이터 가져오기 완료!");
            } catch (error) {
                console.error("Error fetching pictures:", error);
            }
        };
        fetchPictures();
    }, []);

    useEffect(() => {
        // 백엔드에서 전체 작품 정보를 가져오는 함수
        const fetchWorkInfo = async () => {
            try {
                const response = await axios.get('/api/gallery/fetchAllWorkInfo');
                setWorkInfo(response.data);
                console.log("전체 작품 데이터 가져오기 완료!");
            } catch (error) {
                console.error("Error fetching all work details:", error);
            }
        };
        fetchWorkInfo();
    }, []);

    // 각 Box에 이미지 텍스처 적용
    const texture1 = pictures[0] ? useLoader(THREE.TextureLoader, pictures[0].work_picture) : null;
    const texture2 = pictures[1] ? useLoader(THREE.TextureLoader, pictures[1].work_picture) : null;
    const texture3 = pictures[2] ? useLoader(THREE.TextureLoader, pictures[2].work_picture) : null;

    return (
        <>
        
            {/* 갤러리 보드 */}
            {/* 3등 작품 */}
            <GalleryBoard position={[-180, 13, 170]} rotation={[0, Math.PI / 2, 0]} scale={6} />
            {/* 3등 작품 사진 */}
            <Plane position={[-178, 20.5, 170]} rotation={[0, Math.PI / 2, 0]} scale={[57, 30, 0]}>
                {texture3 && <meshBasicMaterial attach="material" map={texture3} />}
            </Plane>

            {/* 1등 작품 */}
            <GalleryBoard position={[-180, 18, 100]} rotation={[0, Math.PI / 2, 0]} scale={6} />
            {/* 1등 작품 사진 */}
            <Plane position={[-178, 25.5, 100]} rotation={[0, Math.PI / 2, 0]} scale={[57, 30, 0]}>
                {texture1 && <meshBasicMaterial attach="material" map={texture1} />}
            </Plane>
            
            {/* // 2등 작품 */}
            <GalleryBoard position={[-180, 13, 30]} rotation={[0, Math.PI / 2, 0]} scale={6} />
            {/* 2등 작품 사진 */}
            <Plane position={[-178, 20.5, 30]} rotation={[0, Math.PI / 2, 0]} scale={[57, 30, 0]}>
                {texture2 && <meshBasicMaterial attach="material" map={texture2} />}
            </Plane>
            
             {/* 존(가로, 세로(왼쪽), 세로(오른쪽) 순서) */}
             {/* 3등 작품 */}
            <Zone position={[-140, -25, 155]} rotation={[0, Math.PI / -2, 0]} scale={5} />
            <Zone position={[-135, -25, 191]} rotation={[0, Math.PI * -2, 0]} scale={5} />
            <Zone position={[-135, -25, 150]} rotation={[0, Math.PI * -2, 0]} scale={5} />

            {/* // 1등 작품 */}
            <Zone position={[-140, -25, 85]} rotation={[0, Math.PI / -2, 0]} scale={5} />
            <Zone position={[-135, -25, 121]} rotation={[0, Math.PI * -2, 0]} scale={5} />
            <Zone position={[-135, -25, 80]} rotation={[0, Math.PI * -2, 0]} scale={5} />
            
            {/* // 2등 작품 */}
            <Zone position={[-140, -25, 15]} rotation={[0, Math.PI / -2, 0]} scale={5} />
            <Zone position={[-135, -25, 52]} rotation={[0, Math.PI * -2, 0]} scale={5} />
            <Zone position={[-135, -25, 10]} rotation={[0, Math.PI * -2, 0]} scale={5} />


            {/* GalleryModal 조건부 렌더링 */}
            {isInFirstWork && (
                <GalleryModal
                    data={workInfo[0]}
                    position={[-130, 0, 50]} // 모달의 위치를 설정하세요
                />
            )}
            {isInSecondWork && (
                <GalleryModal
                    data={workInfo[1]}
                    position={[-130, 0, -20]} // 모달의 위치를 설정하세요
                />
            )}
            {isInThirdWork && (
                <GalleryModal
                    data={workInfo[2]}
                    position={[-130, 0, 120]} // 모달의 위치를 설정하세요
                />
            )}
        </>

    )
}

export default GalleryGroup