import { React } from 'react';
import Bricks2048List from './Bricks2048List';
import MiniGame2048 from './MiniGame2048';

const MiniGame2048Group= ({ position }) =>{
    return(
        <group position={position}>
            <MiniGame2048 position={[-500, 20, 510]} rotation={[0, Math.PI / 2, 0]} scale={3} />
            <Bricks2048List position={[-500, 20, 500]} rotation={[0, Math.PI / 2, 0]} scale={3} />
        </group>
    )
}


export default MiniGame2048Group;