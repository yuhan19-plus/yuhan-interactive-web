import { Html } from '@react-three/drei'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CREATION_HALL, FREE_HALL, JAE_RA_YOO, MEMORIAL_HALL, PEACE_HALL, SHARING_HALL, STUDENT_CAFETERIA, VOLUNTEER_CENTER } from '../../../../../../../../../data/commonData'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Pagination } from '@mui/material'
import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood, faCode, faDna, faPenRuler } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { computerSoftwareMap, foodNutritionMap, industrialDesignMap, yuhanBioMap } from '../../../../../../../../../redux/actions/actions'

const dataKiosk = {
    PEACE_HALL,
    VOLUNTEER_CENTER,
    FREE_HALL,
    STUDENT_CAFETERIA,
    SHARING_HALL,
    CREATION_HALL,
    MEMORIAL_HALL,
    JAE_RA_YOO
}
let name
const ITEMS_PER_PAGE = 5 // 페이지당 7개 아이템

const KioskModal = ({kioskName, ...props}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0) // 현재 페이지 상태
    switch(kioskName) {
        case '평화관':
            name = 'PEACE_HALL'
            break
        case '봉사관':
            name = 'VOLUNTEER_CENTER'
            break
        case '자유관':
            name = 'FREE_HALL'
            break
        case '학생회관':
            name = 'STUDENT_CAFETERIA'
            break
        case '나눔관':
            name = 'SHARING_HALL'
            break
        case '창조관':
            name = 'CREATION_HALL'
            break
        case '유일한기념관':
            name = 'MEMORIAL_HALL'
            break
        case '유재라관':
            name = 'JAE_RA_YOO'
            break
        default:
            name = 'PEACE_HALL'
            break
    }
    const selectedData = dataKiosk[name] || []

    // 현재 페이지에 해당하는 데이터를 추출
    const paginatedData = selectedData.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
    
    // 다음 페이지로 이동하는 메서드
    const handleNextPage = () => {
        if ((currentPage + 1) * ITEMS_PER_PAGE < selectedData.length) {
            setCurrentPage(currentPage + 1)
        }
    }
    // 이전 페이지로 이동하는 메서드
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    
    const handleComputerSW = () => {
        dispatch(computerSoftwareMap())
        navigate('/department/csw')
    }
    const handleIndustrialDesign = () => {
        dispatch(industrialDesignMap())
        navigate('/department/id')
    }
    const handleFoodNutrition = () => {
        dispatch(foodNutritionMap())
        navigate('/department/fn')
    }
    const handleYuhanBio = () => {
        dispatch(yuhanBioMap())
        navigate('/department/bio')
    }

    return (
        <>
            <Html position={[50, -55, 50]} center>
                <KioskWrapper>
                    <KioskHeader>
                        <b>{kioskName}</b>
                    </KioskHeader>
                    <KioskContent>
                            {/* 키오스크 content */}
                            {
                                currentPage > 0 && (
                                    <PageBtn onClick={handlePrevPage}>
                                        <NavigateBefore /> {/* 이전 버튼 아이콘 */}
                                    </PageBtn>
                                )
                            }
                            <KioskList>
                                {
                                    paginatedData.map((item, idx) => (
                                        <KioskItem key={idx}>
                                            <span>
                                                <b style={{display: 'inline-block'}}>{item}</b>
                                            </span>
                                        </KioskItem>
                                    ))
                                }
                            </KioskList>
                            {
                                (4 < paginatedData.length && !((currentPage + 1) * ITEMS_PER_PAGE >= selectedData.length)) ? (
                                    <PageBtn onClick={handleNextPage}>
                                        <NavigateNext /> {/* 다음 버튼 아이콘 */}
                                    </PageBtn>
                                ) : <></>
                            }
                    </KioskContent>
                    <KioskFooter>
                        <KioskLink>
                            {
                                kioskName !== '유재라관' && (
                                    <>
                                        <p>학과체험하러가기</p>
                                        {
                                            (kioskName === '평화관 정문' || kioskName === '평화관 후문') && (
                                                <div style={{margin: '5px 0px'}}>
                                                    <FontAwesomeIcon icon={faBowlFood} size='lg' style={{marginRight: '5px'}} />
                                                    <span><a onClick={handleFoodNutrition}>식품영양학과체험</a></span>
                                                </div>
                                            )
                                        }
                                        {
                                            kioskName === '유일한기념관' && (
                                                <div style={{margin: '5px 0px'}}>
                                                    <FontAwesomeIcon icon={faCode} size='lg' style={{marginRight: '5px'}} />
                                                    <span><a onClick={handleComputerSW}>컴퓨터소프트웨어공학과체험</a></span>
                                                </div>
                                            )
                                        }
                                        {
                                            kioskName === '나눔관' && (
                                                <div style={{margin: '5px 0px'}}>
                                                    <FontAwesomeIcon icon={faDna} size='lg' style={{marginRight: '5px'}} />
                                                    <span><a onClick={handleYuhanBio}>유한생명바이오학과체험</a></span>
                                                </div>
                                            )
                                        }
                                        {
                                            kioskName === '창조관' && (
                                                <div style={{margin: '5px 0px'}}>
                                                    <FontAwesomeIcon icon={faPenRuler} size='lg' style={{marginRight: '5px'}} />
                                                    <span><a onClick={handleIndustrialDesign}>산업디자인학과체험</a></span>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </KioskLink>
                        {
                            kioskName === '유재라관' ? (
                                <p><a href='https://sanhak.yuhan.ac.kr/index.do'><b>산학협력단</b></a> 페이지 가기</p>
                            ) : (
                                <>
                                    {
                                        kioskName === '유일한기념관' && (
                                            <>
                                                <p><a href='https://newih.yuhan.ac.kr/index.do'><b>유일한기념관</b></a> 페이지 가기</p>
                                            </>
                                        )
                                    }
                                    <p><a href='https://www.yuhan.ac.kr/ibuilder.do?menu_idx=3091'><b>학과안내</b></a> 페이지 가기</p>
                                </>
                            )
                        }
                    </KioskFooter>
                </KioskWrapper>
            </Html>
        </>
    )
}

const KioskWrapper = styled.div`
    width: 250px;
    height: auto;
    display: flex;
    border-radius: 25px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0F275Cdd;
    padding: 15px;
`

const KioskHeader = styled.div`
    width: 100%;
    border-radius: 15px;
    padding: 3px;
    font-size: 34px;
    text-align: center;
    color: white;
`

const KioskContent = styled.div`
    width: 100%;
    border-radius: 15px;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const KioskList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`
const PageBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid white;
`

const KioskItem = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 15px;
    margin-bottom: 3px;
    border-radius: 15px;
    border: 1px solid white;
    padding: 7px;
    color: white;
`

const KioskFooter = styled.div`
    width: 100%;
    height: 15%;
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
`

const KioskLink = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;
    div {
        cursor: pointer;
    }
`

export default KioskModal