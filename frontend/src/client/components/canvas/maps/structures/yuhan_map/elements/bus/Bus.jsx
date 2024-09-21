import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useSelector } from 'react-redux';

export function Bus({ position }) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF('/assets/models/bus/bus.glb');
  const { actions } = useAnimations(animations, group);
  const x = position[0];
  const y = position[1];
  const z = position[2];

  // Redux 상태에서 버스존 1과 2에 있는지 여부 가져오기
  const isInBusStationOne = useSelector(state => state.bus.inBusStationOne);
  const isInBusStationTwo = useSelector(state => state.bus.inBusStationTwo);

  // group.current에서 트래버스 실행
  useEffect(() => {
    if (group.current) {
      group.current.traverse((obj) => {
        if (obj.isObject3D) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
    }
  }, []);

  useEffect(() => {
    // `front_move` 애니메이션 실행
    const frontMoveAction = actions['front_move'];
    // `back_move` 애니메이션 실행
    const backMoveAction = actions['back_move'];

    // 두 개의 애니메이션을 동시에 실행
    if (frontMoveAction && backMoveAction) {
      frontMoveAction.play();
      backMoveAction.play();
    }

    return () => {
      // 컴포넌트 언마운트 시 애니메이션 정지
      if (frontMoveAction) frontMoveAction.stop();
      if (backMoveAction) backMoveAction.stop();
    };
  }, [actions]);

  return (
    <>
      {isInBusStationOne && (
        <motion.group ref={group} position={[x, y + 17.5, z]} scale={8}
          animate={{ x: [x, x, x], y: [y, y, y], z: [z - 200, z-50, z + 100] }} // 기준 위치를 기반으로 이동
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
      {isInBusStationTwo && (
        <motion.group ref={group} position={[x, y + 17.5, z]} scale={8} rotation={[0, Math.PI, 0]}
          animate={{ x: [x, x, x], y: [y, y, y], z: [z + 140, z-60, z - 260] }} // 기준 위치를 기반으로 이동
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
