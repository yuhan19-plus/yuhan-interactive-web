import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function YuhanMap(props) {
  const { scene, nodes, materials } = useGLTF('/assets/models/YuhanMap.glb')

  useEffect(() => {
    scene.traverse((obj) => {
      if(obj.isObject3D) {
        // console.log(obj)
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.SideWalk.geometry} material={materials['E77759 (SideWalk)']} position={[219.746, 0.768, -91.066]} scale={[20, 0.001, 100]} />
      <mesh geometry={nodes['B5-B6_Road'].geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} position={[-117.25, 0.9, 219.763]} scale={[9.444, 0.001, 75]} />
      <mesh geometry={nodes.Road_Line.geometry} material={materials['FFFFFF (Number, BaskitBall)']} position={[402.343, 1, -42.323]} scale={[5, 0.001, 116.399]} />
      <mesh geometry={nodes['B5-B6_Terrace_Area'].geometry} material={materials['654321 (Wood)']} position={[0.311, 0.9, 244.763]} scale={[108.088, 0.001, 75]} />
      <mesh geometry={nodes.Statue.geometry} material={materials['DCE759 & Metal (DEVName, Statue)']} position={[9.911, 13, -452.046]} scale={[5, 12.5, 5]} />
      <mesh geometry={nodes.BusStaion.geometry} material={nodes.BusStaion.material} position={[261.147, 13.603, -190.892]} scale={[12.923, 12.923, 16.153]} />
      <group position={[233.767, 75.457, 292.46]} rotation={[Math.PI, 0, Math.PI]} scale={[18.615, 4.051, 38.03]}>
        <mesh geometry={nodes.Cube359.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame))']} />
        <mesh geometry={nodes.Cube359_1.geometry} material={materials['858585 (B4,B9,B2)']} />
        <mesh geometry={nodes.Cube359_2.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube359_3.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Cube359_4.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table))']} />
        <mesh geometry={nodes.Cube359_5.geometry} material={materials['4B1711 (Building4)']} />
        <mesh geometry={nodes.Cube359_6.geometry} material={materials['18226AA (Number Plane)']} />
        <mesh geometry={nodes.Cube359_7.geometry} material={materials['23683C (RoofTop)']} />
        <mesh geometry={nodes.Cube359_8.geometry} material={materials['DCE759 & Metal (DEVName, Statue)']} />
      </group>
      <group position={[219.089, 103.921, -203.614]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[-3.881, -10, -3.056]}>
        <mesh geometry={nodes.Side_Window002.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Side_Window002_1.geometry} material={materials['96947D(B2(Window Frame),B6(Stone))']} />
        <mesh geometry={nodes.Side_Window002_2.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} />
        <mesh geometry={nodes.Side_Window002_3.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} />
        <mesh geometry={nodes.Side_Window002_4.geometry} material={materials['D18A8D (B2)']} />
        <mesh geometry={nodes.Side_Window002_5.geometry} material={materials['000000 (B1, B2, B9, Smoking Booth)']} />
        <mesh geometry={nodes.Side_Window002_6.geometry} material={materials['61544D (B1,B2,B5,B6(Body)']} />
        <mesh geometry={nodes.Side_Window002_7.geometry} material={materials['3E3C3A (B2)']} />
        <mesh geometry={nodes.Side_Window002_8.geometry} material={materials['858585 (B4,B9,B2)']} />
        <mesh geometry={nodes.Side_Window002_9.geometry} material={materials['23683C (RoofTop)']} />
        <mesh geometry={nodes.Side_Window002_10.geometry} material={materials['YuhanLogo2(B2)']} />
        <mesh geometry={nodes.Side_Window002_11.geometry} material={materials['B1A393(B2(Tray)']} />
        <mesh geometry={nodes.Side_Window002_12.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Side_Window002_13.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Side_Window002_14.geometry} material={materials['DCE759 & Metal (DEVName, Statue)']} />
      </group>
      <group position={[-320.665, 73.44, 181.609]} rotation={[Math.PI / 2, 0, Math.PI]} scale={[3.242, 3.242, 4.501]}>
        <mesh geometry={nodes.Text008.geometry} material={materials['DCE759 & Metal (DEVName, Statue)']} />
        <mesh geometry={nodes.Text008_1.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Text008_2.geometry} material={materials['18226AA (Number Plane)']} />
        <mesh geometry={nodes.Text008_3.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} />
        <mesh geometry={nodes.Text008_4.geometry} material={materials['23683C (RoofTop)']} />
        <mesh geometry={nodes.Text008_5.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame))']} />
        <mesh geometry={nodes.Text008_6.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Text008_7.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
      </group>
      <group position={[140.775, 11.318, -125.296]} scale={[10.993, 9.714, 15.914]}>
        <mesh geometry={nodes.Cube001.geometry} material={materials['00FF7F (Leaf,Smoking Booth)']} />
        <mesh geometry={nodes.Cube001_1.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Cube001_2.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.Cube001_3.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube001_4.geometry} material={materials['006400 (Leaf)']} />
        <mesh geometry={nodes.Cube001_5.geometry} material={materials['2CC337 (Smoking Booth)']} />
        <mesh geometry={nodes.Cube001_6.geometry} material={materials['000000 (B1, B2, B9, Smoking Booth)']} />
        <mesh geometry={nodes.Cube001_7.geometry} material={materials['1760E7(Trashbaskit)']} />
        <mesh geometry={nodes.Cube001_8.geometry} material={materials['E7E541 (Smoking Booth)']} />
        <mesh geometry={nodes.Cube001_9.geometry} material={materials['0EA6EF (Leaf, Smoking Booth)']} />
        <mesh geometry={nodes.Cube001_10.geometry} material={materials['E71512 (Flower, BaskiBall, Smoking Booth)']} />
        <mesh geometry={nodes.Cube001_11.geometry} material={materials['TextTure (Smoking Booth)']} />
      </group>
      {/* <mesh geometry={nodes.YuhanFlag.geometry} material={materials.YuhanFlag} position={[-343.115, 52.129, -84.564]} rotation={[Math.PI / 2, 0, 0]} scale={[9.476, 11.297, 5.169]} />
      <group position={[-404.513, 168.261, -181.736]} rotation={[-Math.PI, 0, -Math.PI]} scale={[4.452, 15, 4.429]}>
        <mesh geometry={nodes.실린더005.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} />
        <mesh geometry={nodes.실린더005_1.geometry} material={materials['18226AA (Number Plane)']} />
        <mesh geometry={nodes.실린더005_2.geometry} material={materials['DCE759 & Metal (DEVName, Statue)']} />
        <mesh geometry={nodes.실린더005_3.geometry} material={materials['23683C (RoofTop)']} />
        <mesh geometry={nodes.실린더005_4.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table))']} />
        <mesh geometry={nodes.실린더005_5.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.실린더005_6.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.실린더005_7.geometry} material={materials['AAAAAA (B8)']} />
        <mesh geometry={nodes.실린더005_8.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.실린더005_9.geometry} material={materials['23683C (RoofTop)']} />
      </group> */}
      <group position={[268.086, 100.683, 60.132]} rotation={[Math.PI, 0, Math.PI]} scale={[39.404, 65, 60.498]}>
        <mesh geometry={nodes.Cylinder001.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
        <mesh geometry={nodes.Cylinder001_1.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} />
        <mesh geometry={nodes.Cylinder001_2.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table))']} />
        <mesh geometry={nodes.Cylinder001_3.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Cylinder001_4.geometry} material={materials['858585 (B4,B9,B2)']} />
        <mesh geometry={nodes.Cylinder001_5.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cylinder001_6.geometry} material={materials['18226AA (Number Plane)']} />
        <mesh geometry={nodes.Cylinder001_7.geometry} material={materials['YuhanLogo(B9)']} />
        <mesh geometry={nodes.Cylinder001_8.geometry} material={materials['000000 & Metal (C2,T2)']} />
        <mesh geometry={nodes.Cylinder001_9.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table))']} />
        <mesh geometry={nodes.Cylinder001_10.geometry} material={materials['000000 & Metal (C2,T2)']} />
        <mesh geometry={nodes.Cylinder001_11.geometry} material={materials['AF9562 (C2)']} />
      </group>
      <group position={[39.133, 42.976, -81.327]} rotation={[Math.PI / 2, 0, 0]} scale={[8.072, 8.072, 9.321]}>
        <mesh geometry={nodes.텍스트002.geometry} material={materials['DCE759 & Metal (DEVName, Statue)']} />
        <mesh geometry={nodes.텍스트002_1.geometry} material={materials['000000 (B1, B2, B9, Smoking Booth)']} />
        <mesh geometry={nodes.텍스트002_2.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame))']} />
        <mesh geometry={nodes.텍스트002_3.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.텍스트002_4.geometry} material={materials['18226AA (Number Plane)']} />
        <mesh geometry={nodes.텍스트002_5.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.텍스트002_6.geometry} material={materials['61544D (B1,B2,B5,B6(Body)']} />
        <mesh geometry={nodes.텍스트002_7.geometry} material={materials['23683C (RoofTop)']} />
      </group>
      <group position={[79.158, 9.948, -211.372]} scale={[63.865, 63.865, 60.76]}>
        <mesh geometry={nodes.Plane001.geometry} material={materials['644F1C (Park Plane)']} />
        <mesh geometry={nodes.Plane001_1.geometry} material={materials['2D7932 (Baskiball Plane)']} />
        <mesh geometry={nodes.Plane001_2.geometry} material={materials['8F8E6E (Park)']} />
        <mesh geometry={nodes.Plane001_3.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
        <mesh geometry={nodes.Plane001_4.geometry} material={materials['596054 (Park)']} />
        <mesh geometry={nodes.Plane001_5.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.Plane001_6.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.Plane001_7.geometry} material={materials['E71512 (Flower, BaskiBall, Smoking Booth)']} />
        <mesh geometry={nodes.Plane001_8.geometry} material={materials['E71512 (Flower, BaskiBall, Smoking Booth)']} />
        <mesh geometry={nodes.Plane001_9.geometry} material={materials['006400 (Leaf)']} />
        <mesh geometry={nodes.Plane001_10.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Plane001_11.geometry} material={materials['00FF7F (Leaf,Smoking Booth)']} />
        <mesh geometry={nodes.Plane001_12.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Plane001_13.geometry} material={materials['00FF7F (Leaf,Smoking Booth)']} />
        <mesh geometry={nodes.Plane001_14.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Plane001_15.geometry} material={materials['0EA6EF (Leaf, Smoking Booth)']} />
        <mesh geometry={nodes.Plane001_16.geometry} material={materials['89E768 (Grass)']} />
        <mesh geometry={nodes.Plane001_17.geometry} material={materials['B5E74C (Grass)']} />
        <mesh geometry={nodes.Plane001_18.geometry} material={materials['29E72C (Grass)']} />
      </group>
      <group position={[-354.623, 1.131, 9.819]} rotation={[0, 0.369, 0]} scale={[-87.93, -51.004, -64.406]}>
        <mesh geometry={nodes.Plane016.geometry} material={materials['644F1C (Park Plane)']} />
        <mesh geometry={nodes.Plane016_1.geometry} material={materials['8F8E6E (Park)']} />
        <mesh geometry={nodes.Plane016_2.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
        <mesh geometry={nodes.Plane016_3.geometry} material={materials['596054 (Park)']} />
        <mesh geometry={nodes.Plane016_4.geometry} material={materials['006400 (Leaf)']} />
        <mesh geometry={nodes.Plane016_5.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Plane016_6.geometry} material={materials['00FF7F (Leaf,Smoking Booth)']} />
        <mesh geometry={nodes.Plane016_7.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Plane016_8.geometry} material={materials['00FF7F (Leaf,Smoking Booth)']} />
        <mesh geometry={nodes.Plane016_9.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Plane016_10.geometry} material={materials['006400 (Leaf)']} />
        <mesh geometry={nodes.Plane016_11.geometry} material={materials['E71512 (Flower, BaskiBall, Smoking Booth)']} />
        <mesh geometry={nodes.Plane016_12.geometry} material={materials['89E768 (Grass)']} />
        <mesh geometry={nodes.Plane016_13.geometry} material={materials['B5E74C (Grass)']} />
        <mesh geometry={nodes.Plane016_14.geometry} material={materials['29E72C (Grass)']} />
      </group>
      <group position={[210.815, 75.494, -30.8]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-25.054, -75.261, -13.44]}>
        <mesh geometry={nodes.Cube079.geometry} material={materials['858585 (B4,B9,B2)']} />
        <mesh geometry={nodes.Cube079_1.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.Cube079_2.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame))']} />
        <mesh geometry={nodes.Cube079_3.geometry} material={materials['000000 & Metal (C2,T2)']} />
        <mesh geometry={nodes.Cube079_4.geometry} material={materials['AF9562 (C2)']} />
        <mesh geometry={nodes.Cube079_5.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table))']} />
      </group>
      <group position={[1.644, 12.767, 152.007]} scale={[0.253, 12, 3.955]}>
        <mesh geometry={nodes.Cube073.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Cube073_1.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} />
        <mesh geometry={nodes.Cube073_2.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube073_3.geometry} material={materials['858585 (B4,B9,B2)']} />
      </group>
      <group position={[-63.776, 8.664, 190.938]} scale={[0.25, 0.25, 3.25]}>
        <mesh geometry={nodes.Cube018.geometry} material={materials['000000 & Metal (C2,T2)']} />
        <mesh geometry={nodes.Cube018_1.geometry} material={materials['AF9562 (C2)']} />
        <mesh geometry={nodes.Cube018_2.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table))']} />
      </group>
      <group position={[-82.553, 8.664, 240.652]} rotation={[Math.PI, 0, Math.PI]} scale={[0.25, 0.25, 3.25]}>
        <mesh geometry={nodes.Cube027.geometry} material={materials['000000 & Metal (C2,T2)']} />
        <mesh geometry={nodes.Cube027_1.geometry} material={materials['AF9562 (C2)']} />
        <mesh geometry={nodes.Cube027_2.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table))']} />
      </group>
      <group position={[-37.939, 6.156, 154.114]} scale={[0.25, 3.25, 0.25]}>
        <mesh geometry={nodes.Cube010.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube010_1.geometry} material={materials['455A33(T1)']} />
      </group>
      <group position={[-37.939, 6.156, 180.155]} scale={[0.25, 3.25, 0.25]}>
        <mesh geometry={nodes.Cube052.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube052_1.geometry} material={materials['455A33(T1)']} />
      </group>
      <group position={[-24.228, 6.156, 154.114]} scale={[0.25, 3.25, 0.25]}>
        <mesh geometry={nodes.Cube040.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube040_1.geometry} material={materials['455A33(T1)']} />
      </group>
      <group position={[-24.228, 6.156, 180.155]} scale={[0.25, 3.25, 0.25]}>
        <mesh geometry={nodes.Cube055.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube055_1.geometry} material={materials['455A33(T1)']} />
      </group>
      <group position={[-11.363, 6.156, 154.114]} scale={[0.25, 3.25, 0.25]}>
        <mesh geometry={nodes.Cube043.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube043_1.geometry} material={materials['455A33(T1)']} />
      </group>
      <group position={[-11.363, 6.156, 180.155]} scale={[0.25, 3.25, 0.25]}>
        <mesh geometry={nodes.Cube058.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube058_1.geometry} material={materials['455A33(T1)']} />
      </group>
      <group position={[61.672, 12.645, -299.379]} rotation={[Math.PI, 0, 0]} scale={[2.268, 18.224, 2.041]}>
        <mesh geometry={nodes.Pillar001.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Pillar001_1.geometry} material={materials['774D15(SmokingBench)']} />
        <mesh geometry={nodes.Pillar001_2.geometry} material={materials['1760E7(Trashbaskit)']} />
        <mesh geometry={nodes.Pillar001_3.geometry} material={materials['33AF6A(Smoking Area RoofTop)']} />
        <mesh geometry={nodes.Pillar001_4.geometry} material={materials.smoking} />
        <mesh geometry={nodes.Pillar001_5.geometry} material={materials['8A4636 (Smoking Area)']} />
      </group>
      <group position={[12.5, 77.5, 275]} rotation={[0, -1.571, 0]} scale={[25, 77.5, 120]}>
        <mesh geometry={nodes.Cube119.geometry} material={materials['61544D (B1,B2,B5,B6(Body)']} />
        <mesh geometry={nodes.Cube119_1.geometry} material={materials['000000 & Metal (C2,T2)']} />
        <mesh geometry={nodes.Cube119_2.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame))']} />
        <mesh geometry={nodes.Cube119_3.geometry} material={materials['18226AA (Number Plane)']} />
        <mesh geometry={nodes.Cube119_4.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} />
        <mesh geometry={nodes.Cube119_5.geometry} material={materials['DCE759 & Metal (DEVName, Statue)']} />
        <mesh geometry={nodes.Cube119_6.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
        <mesh geometry={nodes.Cube119_7.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Cube119_8.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube119_9.geometry} material={materials['23683C (RoofTop)']} />
      </group>
      <group position={[147, 84.025, 198.188]} rotation={[0, 0.384, 0]} scale={[0.353, 1.489, 3.966]}>
        <mesh geometry={nodes.Cube085.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
        <mesh geometry={nodes.Cube085_1.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Cube085_2.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame))']} />
      </group>
      <group position={[0, 82.814, 125]} rotation={[0, 1.571, 0]} scale={[25, 77.5, 120]}>
        <mesh geometry={nodes.Cube011.geometry} material={materials['61544D (B1,B2,B5,B6(Body)']} />
        <mesh geometry={nodes.Cube011_1.geometry} material={materials['000000 & Metal (C2,T2)']} />
        <mesh geometry={nodes.Cube011_2.geometry} material={materials['18226AA (Number Plane)']} />
        <mesh geometry={nodes.Cube011_3.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} />
        <mesh geometry={nodes.Cube011_4.geometry} material={materials['DCE759 & Metal (DEVName, Statue)']} />
        <mesh geometry={nodes.Cube011_5.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame))']} />
        <mesh geometry={nodes.Cube011_6.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Cube011_7.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube011_8.geometry} material={materials['23683C (RoofTop)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/YuhanMap.glb')