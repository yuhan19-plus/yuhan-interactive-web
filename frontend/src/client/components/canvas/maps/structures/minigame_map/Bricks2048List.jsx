import { Text3D } from '@react-three/drei';
import { React } from 'react';
import { Bricks1024 } from './miniObject/Bricks1024';
import { Bricks128 } from './miniObject/Bricks128';
import { Bricks16 } from './miniObject/Bricks16';
import { Bricks2 } from './miniObject/Bricks2';
import { Bricks2048 } from './miniObject/Bricks2048';
import { Bricks256 } from './miniObject/Bricks256';
import { Bricks32 } from './miniObject/Bricks32';
import { Bricks4 } from './miniObject/Bricks4';
import { Bricks512 } from './miniObject/Bricks512';
import { Bricks64 } from './miniObject/Bricks64';
import { Bricks8 } from './miniObject/Bricks8';

const fontURL = 'assets/fonts/HakgyoansimWoojuR.json';
const Bricks2048List = () => {
    return (
        <>
            <group position={[200, -6.5, 110]} scale={5} rotation={[0,Math.PI/-2,0]}>
                <Bricks2 />,
                <Bricks4  position={[2.5,0,0]}/>,
                <Bricks8 position={[5,0,0]}/>,
                <Bricks16 position={[7.5,0,0]}/>,
                <Bricks32 position={[10,0,0]}/>,

                <group position={[0, -0.25, 2.5]} scale={0.8}>
                    <Text3D position={[-0.2, 0, 0]} font={fontURL} rotation={[Math.PI/-2,0,0]}>
                        2
                        <meshStandardMaterial color="white" />
                    </Text3D>
                    <Text3D position={[2.9, 0, 0]} font={fontURL} rotation={[Math.PI/-2,0,0]}>
                        4
                        <meshStandardMaterial color="white" />
                    </Text3D>
                    <Text3D position={[6, 0, 0]} font={fontURL} rotation={[Math.PI/-2,0,0]}>
                        8
                        <meshStandardMaterial color="white" />
                    </Text3D>
                    <Text3D position={[8.8, 0, 0]} font={fontURL} rotation={[Math.PI/-2,0,0]}>
                        16
                        <meshStandardMaterial color="white" />
                    </Text3D>
                    <Text3D position={[11.9, 0, 0]} font={fontURL} rotation={[Math.PI/-2,0,0]}>
                        32
                        <meshStandardMaterial color="white" />
                    </Text3D>
                </group>
            </group>
            <group position={[240, -6.5, 110]} scale={5} rotation={[0,Math.PI/-2,0]}>
                <Bricks64 />,
                <Bricks128 position={[2.5,0,0]}/>,
                <Bricks256 position={[5,0,0]}/>,
                <Bricks512 position={[7.5,0,0]}/>,
                <Bricks1024 position={[10,0,0]}/>,
                <Bricks2048 position={[12.5,0,0]}/>

                <group position={[-0.2,-0.25,2.5]} scale={0.8}>
                    <Text3D position={[-0.3, 0, 0]} font={fontURL} rotation={[Math.PI/-2,0,0]} >
                        64
                        <meshStandardMaterial color="white" />
                    </Text3D>
                    <Text3D position={[2.5, 0, 0]} font={fontURL} rotation={[Math.PI/-2,0,0]}>
                        128
                        <meshStandardMaterial color="white" />
                    </Text3D>
                    <Text3D position={[5.6, 0, 0]} font={fontURL} rotation={[Math.PI/-2,0,0]}>
                        256
                        <meshStandardMaterial color="white" />
                    </Text3D>
                    <Text3D position={[8.8, 0, 0]} font={fontURL} rotation={[Math.PI/-2,0,0]}>
                        512
                        <meshStandardMaterial color="white" />
                    </Text3D>
                    <Text3D position={[11.6, 0, 0]} font={fontURL} rotation={[Math.PI/-2,0,0]}>
                        1024
                        <meshStandardMaterial color="white" />
                    </Text3D>
                    <Text3D position={[14.7, 0, 0]} font={fontURL} rotation={[Math.PI/-2,0,0]}>
                        2048
                        <meshStandardMaterial color="white" />
                    </Text3D>
                </group>
            </group>
        </>
    );
};

export default Bricks2048List;