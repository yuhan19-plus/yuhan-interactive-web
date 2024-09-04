import React from 'react'
import { TreeTwo } from './tree/TreeTwo'
import { TreeThree } from './tree/TreeThree'
import { TreeFive } from './tree/TreeFive'
import { TreeFour } from './tree/TreeFour'
import { TreeSix } from './tree/TreeSix'
import { TreeSeven } from './tree/TreeSeven'
import { TreeEight } from './tree/TreeEight'
import { GrassOne } from './grass/GrassOne'
import { GrassTwo } from './grass/GrassTwo'
import { GrassThree } from './grass/GrassThree'
import { GrassFive } from './grass/GrassFive'
import { GrassSix } from './grass/GrassSix'
import { MainParkFloor } from './floor/MainParkFloor'

const MainPark = () => {
  return (
    <>
        <MainParkFloor position={[63.195, -4, -203.254]} />
        <TreeTwo position={[23.195, 0, -237.254]} />
        <TreeThree position={[-0.195, 0, -192.254]} />
        <TreeFour position={[33.195, 0, -203.254]} />
        <TreeFive position={[38.195, 0, -173.254]} />
        <TreeSix position={[88.195, 0, -173.254]} />
        <TreeSeven position={[113.195, 0, -193.254]} />
        <TreeEight position={[61.195, 0, -205.254]} />

        <GrassOne position={[-11.5, 4, -187]} rotation={[0, -Math.PI/3, 0]} />
        <GrassTwo position={[-10, 4, -217]} rotation={[0, Math.PI/2.5, 0]} />
        <GrassTwo position={[10, 4, -243]} rotation={[0, Math.PI/6, 0]} />
        <GrassThree position={[50, 4, -253]} rotation={[0, -Math.PI, 0]} />
        <GrassThree position={[70, 4, -253]} rotation={[0, -Math.PI, 0]} />
        <GrassOne position={[130, 4, -180]} rotation={[0, Math.PI/3, 0]} />
        <GrassTwo position={[107, 4, -160]} rotation={[0, Math.PI/6, 0]} />
        <GrassFive position={[75, 4, -150]} />
        <GrassSix position={[50, 4, -150]} />
        <GrassTwo position={[20, 4, -160]} rotation={[0, -Math.PI/6.5, 0]} />
    </>
  )
}

export default MainPark