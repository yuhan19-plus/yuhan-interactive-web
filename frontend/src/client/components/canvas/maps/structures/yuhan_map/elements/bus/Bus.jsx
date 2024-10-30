/**
 * 파일생성자 오자현
 */
import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useSelector } from 'react-redux';

export function Bus({ position }) {
  // Redux 상태에서 버스존 1과 2에 있는지 여부 가져오기
  const isInBusStationOne = useSelector(state => state.bus.inBusStationOne);
  const isInBusStationTwo = useSelector(state => state.bus.inBusStationTwo);
  // 찾아오는 길버튼의 클릭여부를 확인
  const directionsState = useSelector((state) => state.view.value && state.view.viewName === 'directionsView');
  const groupOne = React.useRef(); 
  const groupTwo = React.useRef(); 

  const { nodes, materials, animations } = useGLTF('/assets/models/bus/bus.glb');

  const { actions: actionsOne } = useAnimations(animations, groupOne);
  const { actions: actionsTwo } = useAnimations(animations, groupTwo);

  // 첫 번째 group.current에서 트래버스 실행
  useEffect(() => {
    if (groupOne.current) {
      groupOne.current.traverse((obj) => {
        if (obj.isObject3D) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
    }
  }, []);

  // 두 번째 group.current에서 트래버스 실행
  useEffect(() => {
    if (groupTwo.current) {
      groupTwo.current.traverse((obj) => {
        if (obj.isObject3D) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
    }
  }, []);

  // 첫 번째 버스 애니메이션 실행
  useEffect(() => {
    const frontMoveActionOne = actionsOne['front_move'];
    const backMoveActionOne = actionsOne['back_move'];

    if (frontMoveActionOne && backMoveActionOne) {
      frontMoveActionOne.play();
      backMoveActionOne.play();
    }

    return () => {
      if (frontMoveActionOne) frontMoveActionOne.stop();
      if (backMoveActionOne) backMoveActionOne.stop();
    };
  }, [actionsOne]);

  // 두 번째 버스 애니메이션 실행
  useEffect(() => {
    const frontMoveActionTwo = actionsTwo['front_move'];
    const backMoveActionTwo = actionsTwo['back_move'];

    if (frontMoveActionTwo && backMoveActionTwo) {
      frontMoveActionTwo.play();
      backMoveActionTwo.play();
    }

    return () => {
      if (frontMoveActionTwo) frontMoveActionTwo.stop();
      if (backMoveActionTwo) backMoveActionTwo.stop();
    };
  }, [actionsTwo]);

  return (
    <>
      {(isInBusStationOne || directionsState) && (
        <motion.group ref={groupOne} position={[position[0], position[1], position[2]]} scale={8}
          animate={{ z: [position[2] - 370, position[2] - 50, position[2] + 500] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'loop' }}
        >
          <group name="Scene">
            <group name="Cube" scale={[2, 2, 5]}>
              <mesh name="Cube_1" geometry={nodes.Cube_1.geometry}>
                <meshStandardMaterial color={'#006961'} />
              </mesh>
              <mesh name="Cube_2" geometry={nodes.Cube_2.geometry} material={materials.white} />
              <mesh name="Cube_3" geometry={nodes.Cube_3.geometry} material={materials.Windows} />
              <mesh name="Cube_4" geometry={nodes.Cube_4.geometry} material={materials.yellow} />
            </group>
            <group name="front_wheel001" position={[0, -2.1, 3.65]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[0.75, 0.35, 0.75]}>
              <mesh name="Cylinder002" geometry={nodes.Cylinder002.geometry} material={materials.black} />
              <mesh name="Cylinder002_1" geometry={nodes.Cylinder002_1.geometry} material={materials.steel} />
            </group>
            <group name="back_wheel001" position={[0, -2.1, -3.65]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[0.75, 0.35, 0.75]}>
              <mesh name="Cylinder003" geometry={nodes.Cylinder003.geometry} material={materials.black} />
              <mesh name="Cylinder003_1" geometry={nodes.Cylinder003_1.geometry} material={materials.steel} />
            </group>
          </group>
        </motion.group>
      )}
      {(isInBusStationTwo || directionsState) && (
        <motion.group ref={groupTwo} position={[position[0], position[1], position[2]]} scale={8} rotation={[0, Math.PI, 0]}
          animate={{ x: [position[0] + 100, position[0] + 100, position[0] + 100], z: [position[2] + 500, position[2] - 60, position[2] - 370] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'loop' }}
        >
          <group name="Scene">
            <group name="Cube" scale={[2, 2, 5]}>
              <mesh name="Cube_1" geometry={nodes.Cube_1.geometry} material={materials.main} />
              <mesh name="Cube_2" geometry={nodes.Cube_2.geometry} material={materials.white} />
              <mesh name="Cube_3" geometry={nodes.Cube_3.geometry} material={materials.Windows} />
              <mesh name="Cube_4" geometry={nodes.Cube_4.geometry} material={materials.yellow} />
            </group>
            <group name="front_wheel001" position={[0, -2.1, 3.65]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[0.75, 0.35, 0.75]}>
              <mesh name="Cylinder002" geometry={nodes.Cylinder002.geometry} material={materials.black} />
              <mesh name="Cylinder002_1" geometry={nodes.Cylinder002_1.geometry} material={materials.steel} />
            </group>
            <group name="back_wheel001" position={[0, -2.1, -3.65]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[0.75, 0.35, 0.75]}>
              <mesh name="Cylinder003" geometry={nodes.Cylinder003.geometry} material={materials.black} />
              <mesh name="Cylinder003_1" geometry={nodes.Cylinder003_1.geometry} material={materials.steel} />
            </group>
          </group>
        </motion.group>
      )}
    </>
  );
}

useGLTF.preload('/assets/models/bus/bus.glb');
