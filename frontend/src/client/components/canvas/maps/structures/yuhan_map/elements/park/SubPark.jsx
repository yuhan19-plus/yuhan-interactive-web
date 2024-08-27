/**
 * 임성준
 */
import React from 'react'
import { TreeTen } from './tree/TreeTen'
import { TreeNine } from './tree/TreeNine'
import { TreeEleven } from './tree/TreeEleven'
import { TreeTwelve } from './tree/TreeTwelve'
import { TreeThirteen } from './tree/TreeThirteen'
import { TreeFourteen } from './tree/TreeFourteen'
import { TreeFifteen } from './tree/TreeFifteen'
import { TreeSixteen } from './tree/TreeSixteen'
import { GrassOne } from './grass/GrassOne'
import { GrassTwo } from './grass/GrassTwo'
import { GrassSix } from './grass/GrassSix'
import { SubParkFloor } from './floor/SubParkFloor'

const SubPark = () => {
    return (
        <group>
            <SubParkFloor position={[-360.743, -0.7, 6.593]}/>
            <TreeNine position={[-348.221, 24.792, -26.805]}/>
            <TreeTen position={[-313.936, 17.834, -15.873]}/>
            <TreeEleven position={[-320.533, 27.045, 14.808]} />
            <TreeTwelve position={[-341.572, 45.601, 35.167]} />
            <TreeThirteen position={[-386.438, 21.772, 40.777]} />
            <TreeFourteen position={[-396.531, 22.835, -2.079]} />
            <TreeFifteen position={[-415.802, 32.105, -25.245]} />
            <TreeSixteen position={[-366.259, 32.947, 1.186]} />

            <GrassOne position={[-433, 4, 20]} rotation={[0, -Math.PI/3, 0]} />
            <GrassTwo position={[-433, 4, -7]} rotation={[0, Math.PI/2.5, 0]} />
            <GrassOne position={[-413, 4, -40]} rotation={[0, -Math.PI/1.3, 0]} />
            <GrassTwo position={[-367, 4, -45]} />
            <GrassTwo position={[-325, 4, -43]} rotation={[0, -Math.PI/5.3, 0]} />
            <GrassTwo position={[-295, 4, -20]} rotation={[0, -Math.PI/3, 0]} />
            <GrassSix position={[-300, 4, 35]} rotation={[0, Math.PI/3.5, 0]} />
            <GrassTwo position={[-325, 4, 50]} rotation={[0, -Math.PI, 0]} />
            <GrassTwo position={[-355, 4, 50]} rotation={[0, -Math.PI, 0]} />
            <GrassTwo position={[-385, 4, 50]} rotation={[0, -Math.PI, 0]} />
        </group>
    )
}

export default SubPark