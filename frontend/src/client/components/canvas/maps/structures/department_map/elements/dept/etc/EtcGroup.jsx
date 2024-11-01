import React from 'react'
import { Pot } from './Pot'
import { BookShelf } from './BookShelf'
import { CompanyTable } from './CompanyTable'
import { Computer } from './Computer'
import { DeskWatch } from './DeskWatch'
import { CalendarObject } from './CalendarObject'

const EtcGroup = ({position}) => {
    return (
        <>
            <group position={position}>
                <Pot position={[-7, -8, -5]} scale={4} />
                <BookShelf position={[0, -6, -30]} rotation={[0, Math.PI / -2, 0]} />
                <CompanyTable position={[-3, -10, 10]} rotation={[0, Math.PI / 2, 0]} scale={1.7} />
                <Computer position={[0, 2, 10]} scale={1.7} />
                <DeskWatch position={[-6, 3.5, 16]} scale={1.5} />
                <CalendarObject position={[5.5, 3, 16]} scale={1.7} />
            </group>
        </>
    )
}

export default EtcGroup