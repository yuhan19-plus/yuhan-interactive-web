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
            <SubParkFloor position={[-360.743, -5, 6.593]}/>
            <TreeNine position={[-348.221, 21.292, -26.805]}/>
            <TreeTen position={[-313.936, 14.334, -15.873]}/>
            <TreeEleven position={[-320.533, 23.545, 14.808]} />
            <TreeTwelve position={[-341.572, 42.101, 35.167]} />
            <TreeThirteen position={[-386.438, 18.272, 40.777]} />
            <TreeFourteen position={[-396.531, 19.335, -2.079]} />
            <TreeFifteen position={[-415.802, 28.605, -25.245]} />
            <TreeSixteen position={[-366.259, 29.447, 1.186]} />

            <GrassOne position={[-433, 0.5, 20]} rotation={[0, -Math.PI/3, 0]} />
            <GrassTwo position={[-433, 0.5, -7]} rotation={[0, Math.PI/2.5, 0]} />
            <GrassOne position={[-413, 0.5, -40]} rotation={[0, -Math.PI/1.3, 0]} />
            <GrassTwo position={[-367, 0.5, -45]} />
            <GrassTwo position={[-325, 0.5, -43]} rotation={[0, -Math.PI/5.3, 0]} />
            <GrassTwo position={[-295, 0.5, -20]} rotation={[0, -Math.PI/3, 0]} />
            <GrassSix position={[-300, 0.5, 35]} rotation={[0, Math.PI/3.5, 0]} />
            <GrassTwo position={[-325, 0.5, 50]} rotation={[0, -Math.PI, 0]} />
            <GrassTwo position={[-355, 0.5, 50]} rotation={[0, -Math.PI, 0]} />
            <GrassTwo position={[-385, 0.5, 50]} rotation={[0, -Math.PI, 0]} />
        </group>
    )
}

export default SubPark