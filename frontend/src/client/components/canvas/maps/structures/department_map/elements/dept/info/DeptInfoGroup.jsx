import React from 'react'
import { CareerAndEmploymentField } from './CareerAndEmploymentField'
import { DepartmentFeatures } from './DepartmentFeatures'
import { EducationalGoals } from './EducationalGoals'
import { License } from './License'
import { MainEducationalFields } from './MainEducationalFields'
import DeptNameObject from '../bio/DeptNameObject'
import { useSelector } from 'react-redux'

const DeptInfoGroup = ({groundMapName}) => {
    const deptInfoState = useSelector((state) => state.deptInfo)
    const deptInfoValue = deptInfoState.value
    const deptInfoName = deptInfoState.deptInfoName
    return (
        <>
            <DeptNameObject
                groundMapName={groundMapName}
                positionOne={[20 , 67, -247.5]}
                positionTwo={[65, 47, -247.5]}
                // rotation={[0, Math.PI / -4, 0]}
            />

            <CareerAndEmploymentField name={'진로 및 취업 분야'} deptInfoValue={deptInfoValue} deptInfoName={deptInfoName} position={[40, -7.5, -220]} scale={3} rotation={[0, Math.PI / 2, 0]} />
            <MainEducationalFields name={'주요교육분야'} deptInfoValue={deptInfoValue} deptInfoName={deptInfoName} position={[75, -7, -125]} scale={3} rotation={[0, Math.PI / -1.5, 0]} />
            <DepartmentFeatures name={'학과특징'} deptInfoValue={deptInfoValue} deptInfoName={deptInfoName} position={[240, -6, -155]} scale={10} rotation={[0, Math.PI / -1.35, 0]} />
            <EducationalGoals name={'교육목표'} deptInfoValue={deptInfoValue} deptInfoName={deptInfoName} position={[120, -11, -85]} scale={4} rotation={[0, Math.PI / 1.5, 0]} />
            <License name={'자격증'} deptInfoValue={deptInfoValue} deptInfoName={deptInfoName} position={[230, -11, -50]} scale={3} rotation={[0, Math.PI / 2, 0]} />
        </>
    )
}

export default DeptInfoGroup