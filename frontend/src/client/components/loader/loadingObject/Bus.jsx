import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

useGLTF.preload("/assets/models/etc/bus.glb");
export function Bus(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/assets/models/etc/bus.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    if (actions) {
      // 애니메이션 활성화
      actions["front_move"].play();
      actions["back_move"].play();
    }
  }, [actions]);
  
  return (
    <group ref={group} scale={0.3} rotation={[Math.PI/7, Math.PI/3, 0]} position={[0,2,0]}>
      <group name="Scene">
        <group
          name="busbody"
          position={[0.252, -1.193, 1.039]}
          scale={[2, 2.5, 5]}
        >
          <mesh
            name="Cube001"
            geometry={nodes.Cube001.geometry}
            material={materials.main}
          />
          <mesh
            name="Cube001_1"
            geometry={nodes.Cube001_1.geometry}
            material={materials.Windows}
          />
          <mesh
            name="Cube001_2"
            geometry={nodes.Cube001_2.geometry}
            material={materials.yellow}
          />
        </group>
        <group
          name="front_wheel"
          position={[1.849, -3, 4.1]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.75, 0.35, 0.75]}
        >
          <mesh
            name="Cylinder001"
            geometry={nodes.Cylinder001.geometry}
            material={materials.black}
          />
          <mesh
            name="Cylinder001_1"
            geometry={nodes.Cylinder001_1.geometry}
            material={materials.steel}
          />
        </group>
        <group
          name="back_wheel"
          position={[1.849, -3, -4.125]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.75, 0.35, 0.75]}
        >
          <mesh
            name="Cylinder007"
            geometry={nodes.Cylinder007.geometry}
            material={materials.black}
          />
          <mesh
            name="Cylinder007_1"
            geometry={nodes.Cylinder007_1.geometry}
            material={materials.steel}
          />
        </group>
      </group>
    </group>
  );
}
