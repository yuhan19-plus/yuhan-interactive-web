import { Html, Text } from '@react-three/drei'
import React from 'react'
import styled from 'styled-components'
import { deptInfoCareerAndEmploymentFieldData, deptInfoDeptFeaturesData, deptInfoEduGoalsData, deptInfoLicenseData, deptInfoMainEduFieldsData } from '../../../../../../../../../data/commonData'

const DeptModal = ({position, deptInfoName}) => {
    return (
        <>
            {/* <motion.group
                position={[120, 0, -140]}
                rotation={[0, Math.PI / -2, 0]}
                animate={{
                    y: [-40, 0]
                }}
                transition={{
                    duration: 5,
                    ease: "easeInOut"
                }}
            >
                <mesh position={[150, 4, -11]} rotation={[Math.PI / -3.5, 0, 0]}>
                    <boxGeometry args={[100, 25, 0.3]} />
                    <meshStandardMaterial color={'black'} />
                </mesh>
                <Text position={[150, 9, -17]} rotation={[Math.PI / -3.5, 0, 0]} fontSize={2}>
                    정보화 사회의 진전과 더불어 컴퓨터 분야에 대한 전문지식을 갖춘 인력의 양성이 끊임없이 요구되고 있다.
                </Text>
                <Text position={[150, 7, -14]} rotation={[Math.PI / -3.5, 0, 0]} fontSize={2}>
                    더욱이 최근 기존 산업의 한계를 뛰어넘어 보다 높은 고부가 가치창출의 필요성이 한층 증대되면서,
                </Text>
                <Text position={[150, 5, -11]} rotation={[Math.PI / -3.5, 0, 0]} fontSize={2}>
                    창의적이고 문제해결 능력을 갖춘 응용 SW개발자 양성은 국가경쟁력을 좌우하는 결정적인 요소로 부각되고 있다.
                </Text>
                <Text position={[150, 3, -8]} rotation={[Math.PI / -3.5, 0, 0]} fontSize={2}>
                    컴퓨터소프트웨어공학과는 이러한 시대적 요청에 부응하여 컴퓨터를 이용한 정보처리 기술 이론 및 실습을 바탕으로,
                </Text>
                <Text position={[150, 1, -6]} rotation={[Math.PI / -3.5, 0, 0]} fontSize={2}>
                    산업체의 정보시스템 개발과 운영에 필요한 SW 개발, 웹/모바일 콘텐츠제작,
                </Text>
                <Text position={[150, -1, -4]} rotation={[Math.PI / -3.5, 0, 0]} fontSize={2}>
                    그리고 정보시스템 운영 등의 실무를 수행할 수 있는 현장밀착형 IT 전문인력 양성을 목표로 한다.
                </Text>
            </motion.group> */}
            <Html position={position} center>
                <StyledModal>
                    <b>{deptInfoName}</b>
                    {deptInfoName === '학과특징' && (
                        deptInfoDeptFeaturesData.map((text, idx) => (
                            <p key={idx}>{text}</p>
                        ))
                    )}
                    {deptInfoName === '진로 및 취업 분야' && (
                        deptInfoCareerAndEmploymentFieldData.map((text, idx) => (
                            <p key={idx}>-&nbsp;&nbsp;{text}</p>
                        ))
                    )}
                    {deptInfoName === '교육목표' && (
                        deptInfoEduGoalsData.map((text, idx) => (
                            <p key={idx}>{text}</p>
                        ))
                    )}
                    {deptInfoName === '주요교육분야' && (
                        deptInfoMainEduFieldsData.map((text, idx) => (
                            idx % 2 !== 0 ? (
                                <p key={idx} style={{fontSize: '16px'}}>{text}</p>
                            ) : (
                                <p key={idx}>{text}</p>
                            )
                        ))
                    )}
                    {deptInfoName === '자격증' && (
                        deptInfoLicenseData.map((text, idx) => (
                            text === '' ? (
                                <p key={idx}></p>
                            ) : (
                                <p key={idx} style={{fontSize: '14px', margin: '0'}}>{text}</p>
                            )
                        ))
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
    color: white;
    font-size: 24px;
    p {
        margin: 3% 0;
    }
`

export default DeptModal