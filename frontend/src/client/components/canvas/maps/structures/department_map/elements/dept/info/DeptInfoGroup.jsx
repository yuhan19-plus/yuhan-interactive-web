import React from 'react'
import { CareerAndEmploymentField } from './CareerAndEmploymentField'
import { DepartmentFeatures } from './DepartmentFeatures'
import { EducationalGoals } from './EducationalGoals'
import { License } from './License'
import { MainEducationalFields } from './MainEducationalFields'
import DeptNameObject from '../bio/DeptNameObject'
import { Pot } from '../etc/Pot'
import { BookShelf } from '../etc/BookShelf'
import { CompanyTable } from '../etc/CompanyTable'
import { Computer } from '../etc/Computer'
import { DeskWatch } from '../etc/DeskWatch'
import { useSelector } from 'react-redux'
import { CalendarObject } from '../etc/CalendarObject'

const DeptInfoGroup = () => {
    const deptInfoState = useSelector((state) => state.deptInfo)
    const deptInfoValue = deptInfoState.value
    const deptInfoName = deptInfoState.deptInfoName
    console.log(deptInfoValue, deptInfoName)
    return (
        <>
            <DeptNameObject
                positionOne={[20 , 67, -247.5]}
                positionTwo={[65, 47, -247.5]}
                // rotation={[0, Math.PI / -4, 0]}
            />

            <Pot position={[-5, -8, -95]} scale={4} />
            <BookShelf position={[0, -7, -115]} rotation={[0, Math.PI / -2, 0]} />
            <CompanyTable position={[-3, -10, -71]} rotation={[0, Math.PI / 2, 0]} scale={1.7} />
            <Computer position={[0, 2, -71]} scale={1.7} />
            <DeskWatch position={[0, 0, -20]} scale={1.7} />
            <CalendarObject position={[0, 0, -30]} scale={1.7} />

            <CareerAndEmploymentField name={'진로 및 취업 분야'} deptInfoValue={deptInfoValue} deptInfoName={deptInfoName} position={[40, -7.5, -220]} scale={3} rotation={[0, Math.PI / 2, 0]} />
            <MainEducationalFields name={'주요교육분야'} deptInfoValue={deptInfoValue} deptInfoName={deptInfoName} position={[75, -7, -125]} scale={3} rotation={[0, Math.PI / -1.5, 0]} />
            <DepartmentFeatures name={'학과특징'} deptInfoValue={deptInfoValue} deptInfoName={deptInfoName} position={[240, -6, -155]} scale={10} rotation={[0, Math.PI / -1.35, 0]} />
            <EducationalGoals name={'교육목표'} deptInfoValue={deptInfoValue} deptInfoName={deptInfoName} position={[120, -11, -85]} scale={4} rotation={[0, Math.PI / 1.5, 0]} />
            <License name={'자격증'} deptInfoValue={deptInfoValue} deptInfoName={deptInfoName} position={[230, -11, -50]} scale={3} rotation={[0, Math.PI / 2, 0]} />
        </>
    )
}

export default DeptInfoGroup