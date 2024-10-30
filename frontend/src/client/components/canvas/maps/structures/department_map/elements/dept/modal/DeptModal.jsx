import { Html } from '@react-three/drei'
import React from 'react'
import styled from 'styled-components'
import { deptInfoCareerAndEmploymentFieldData, deptInfoDeptFeaturesData, deptInfoEduGoalsData, deptInfoLicenseData, deptInfoMainEduFieldsData } from '../../../../../../../../../data/commonData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faBuildingColumns, faChalkboard, faCheckCircle, faFileLines, faGraduationCap, faIdCard, faStar } from '@fortawesome/free-solid-svg-icons'

const DeptModal = ({position, deptInfoName}) => {
    return (
        <>
            <Html position={position} center>
                <StyledModal>
                    {deptInfoName === '학과특징' && (
                        <ModalWrapper>
                            <ModalTitle>
                                <FontAwesomeIcon icon={faBuildingColumns} />
                                {deptInfoName}
                            </ModalTitle>   
                            {deptInfoDeptFeaturesData.map((text, idx) => (
                                <p key={idx} style={{fontSize: '20px'}}>
                                    {text}
                                </p>
                            ))}
                        </ModalWrapper>
                    )}
                    {deptInfoName === '진로 및 취업 분야' && (
                        <ModalWrapper>
                            <ModalTitle>
                                <FontAwesomeIcon icon={faBriefcase} />
                                {deptInfoName}
                            </ModalTitle>
                            <ModalContent>
                                {deptInfoCareerAndEmploymentFieldData.map((text, idx) => (
                                    <p key={idx} style={{fontSize: '18px'}}>
                                        <FontAwesomeIcon icon={faFileLines} />
                                        {text}
                                    </p>
                                ))}
                            </ModalContent> 
                        </ModalWrapper>
                    )}
                    {deptInfoName === '교육목표' && (
                        <ModalWrapper>
                            <ModalTitle>
                                <FontAwesomeIcon icon={faGraduationCap} />
                                {deptInfoName}
                            </ModalTitle>
                            <ModalContent>
                                {deptInfoEduGoalsData.map((text, idx) => (
                                    <p key={idx} style={{fontSize: '20px'}}>
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                        {text}
                                    </p>
                                ))}
                            </ModalContent>         
                        </ModalWrapper>
                    )}
                    {deptInfoName === '주요교육분야' && (
                        <ModalWrapper>
                            <ModalTitle>
                                <FontAwesomeIcon icon={faChalkboard} />
                                {deptInfoName}
                            </ModalTitle>   
                            <ModalContent>
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
                            </ModalContent>
                        </ModalWrapper>
                    )}
                    {deptInfoName === '자격증' && (
                        <ModalWrapper>
                            <ModalTitle>
                                <FontAwesomeIcon icon={faIdCard} />
                                {deptInfoName}
                            </ModalTitle>  
                            <ModalContent> 
                                {deptInfoLicenseData.map((text, idx) => (
                                    text === '' ? (
                                        <p key={idx}></p>
                                    ) : (
                                        <p key={idx} style={{fontSize: '14px', margin: '0'}}>{text}</p>
                                    )
                                ))}
                            </ModalContent> 
                        </ModalWrapper>
                    )}
                </StyledModal>
            </Html>
        </>
    )
}

const StyledModal = styled.div`
    width: 500px;
    background: var(--main-opacity-color);
    padding: 5%;
    border-radius: 1rem;
    border: 0.3rem solid var(--sub-color);
    color: var(--sub-color);
    font-size: 1.5rem;

    p {
        margin: 3% 0;
    }
`

const ModalWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const ModalContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    svg {
        margin-right: 0.3rem;
    }
`

const ModalTitle = styled.p`
    margin: 0;
    font-weight: 900;
    
    svg {
        margin-right: 0.3rem;
    }
`

export default DeptModal