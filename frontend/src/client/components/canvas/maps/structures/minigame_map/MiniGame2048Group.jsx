import { React } from 'react';
import Bricks2048List from './Bricks2048List';
import MiniGame2048 from './MiniGame2048';

const MiniGame2048Group= () =>{
    return(
        <>
            <MiniGame2048 />
            <Bricks2048List />
        </>
    )
}


export default MiniGame2048Group;