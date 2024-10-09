import { Html, Text } from '@react-three/drei'
import React from 'react'
import styled from 'styled-components'
import { deptInfoCareerAndEmploymentFieldData, deptInfoDeptFeaturesData, deptInfoEduGoalsData, deptInfoLicenseData, deptInfoMainEduFieldsData } from '../../../../../../../../../data/commonData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby, faBraille, faBriefcase, faBuildingColumns, faChalkboard, faChartLine, faCheck, faCheckCircle, faFile, faFileLines, faGraduationCap, faIdCard, faStar, faStarAndCrescent, faUser, faUserGraduate, faUserTie } from '@fortawesome/free-solid-svg-icons'

const DeptModal = ({position, deptInfoName}) => {
    return (
        <>
            <Html position={position} center>
                <StyledModal>
                    {deptInfoName === '학과특징' && (
                        <>
                            <ModalTitle><FontAwesomeIcon icon={faBuildingColumns} /> {deptInfoName}</ModalTitle>   
                            {deptInfoDeptFeaturesData.map((text, idx) => (
                                <p key={idx} style={{fontSize: '20px'}}>&nbsp;{text}</p>
                            ))}
                        </>
                    )}
                    {deptInfoName === '진로 및 취업 분야' && (
                        <>
                            <ModalTitle><FontAwesomeIcon icon={faBriefcase} /> {deptInfoName}</ModalTitle>
                            {deptInfoCareerAndEmploymentFieldData.map((text, idx) => (
                                <p key={idx} style={{fontSize: '18px'}}><FontAwesomeIcon icon={faFileLines} /> {text}</p>
                            ))}
                        </>
                    )}
                    {deptInfoName === '교육목표' && (
                        <ModalWrapper>
                            <ModalTitle><FontAwesomeIcon icon={faGraduationCap} /> {deptInfoName}</ModalTitle>
                            {deptInfoEduGoalsData.map((text, idx) => (
                                <p key={idx} style={{fontSize: '20px'}}><FontAwesomeIcon icon={faCheckCircle} style={{marginRight: '0.5%'}} /> {text}</p>
                            ))}            
                        </ModalWrapper>
                    )}
                    {deptInfoName === '주요교육분야' && (
                        <>
                            <ModalTitle><FontAwesomeIcon icon={faChalkboard} /> {deptInfoName}</ModalTitle>   
                            {deptInfoMainEduFieldsData.map((text, idx) => (
                                idx % 2 !== 0 ? (
                                    <p key={idx} style={{fontSize: '16px'}}>{text}</p>
                                ) : (
                                    <p key={idx} style={{fontSize: '18px', fontWeight: '900', borderBottom: '2px solid white'}}>
                                        <FontAwesomeIcon icon={faStar} />
                                        {text}
                                    </p>
                                )
                            ))}
                        </>
                    )}
                    {deptInfoName === '자격증' && (
                        <>
                            <ModalTitle><FontAwesomeIcon icon={faIdCard} /> {deptInfoName}</ModalTitle>   
                            {deptInfoLicenseData.map((text, idx) => (
                                text === '' ? (
                                    <p key={idx}></p>
                                ) : (
                                    <p key={idx} style={{fontSize: '14px', margin: '0'}}>{text}</p>
                                )
                            ))}
                        </>
                    )}
                </StyledModal>
            </Html>
        </>
    )
}

const StyledModal = styled.div`
    width: 500px;
    background: #0F275Cdd;
    padding: 5%;
    border-radius: 25px;
    border: 3px solid white;
    color: white;
    font-size: 24px;
    p {
        margin: 3% 0;
    }
`

const ModalWrapper = styled.div`

`

const ModalContent = styled.div`

`

const ModalTitle = styled.p`
    margin: 0;
    font-weight: 900;
`

export default DeptModal