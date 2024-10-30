import { Html } from '@react-three/drei'
import React, { useState } from 'react'
import styled from 'styled-components'
import { BIO_PATH, CREATION_HALL, CSW_PATH, FN_PATH, FREE_HALL, ID_PATH, JAE_RA_YOO, MEMORIAL_HALL, PEACE_HALL, SHARING_HALL, STUDENT_CAFETERIA, VOLUNTEER_CENTER } from '../../../../../../../../../data/commonData'
import { useNavigate } from 'react-router-dom'
import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood, faCode, faDna, faGamepad, faPenRuler } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { computerSoftwareMap, foodNutritionMap, industrialDesignMap, miniGameMap, yuhanBioMap } from '../../../../../../../../../redux/actions/actions'

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
const ITEMS_PER_PAGE = 5 // 페이지당 7개 아이템

let name

const KioskModal = ({kioskName, position, ...props}) => {
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
        dispatch(computerSoftwareMap(CSW_PATH))
        navigate('/department/csw')
    }
    const handleIndustrialDesign = () => {
        dispatch(industrialDesignMap(ID_PATH))
        navigate('/department/id')
    }
    const handleFoodNutrition = () => {
        dispatch(foodNutritionMap(FN_PATH))
        navigate('/department/fn')
    }
    const handleYuhanBio = () => {
        dispatch(yuhanBioMap(BIO_PATH))
        navigate('/department/bio')
    }

    const handleMiniGame = () => {
        dispatch(miniGameMap())
        navigate('/department/mini')
    }
    
    return (
        <>
            <Html 
                position={ position }
                center
            >
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
                                ((kioskName === '유재라관') || (kioskName === '학생회관')) ? (
                                    <></>
                                ) : (
                                    <>
                                        {
                                            (kioskName === '평화관 정문' || kioskName === '평화관 후문') && (
                                                <>
                                                    {/* <p>학과체험하러가기</p>
                                                    <KioskLinkContent>
                                                        <p><FontAwesomeIcon icon={faBowlFood} /></p>
                                                        <p><a onClick={handleFoodNutrition}>식품영양학과체험</a></p>
                                                    </KioskLinkContent> */}
                                                </>
                                            )
                                        }
                                        {
                                            kioskName === '유일한기념관' && (
                                                <>
                                                    <p>학과체험하러가기</p>
                                                    <KioskLinkContent>
                                                        <p>
                                                            <FontAwesomeIcon icon={faCode} />
                                                            <a onClick={handleComputerSW}>컴퓨터소프트웨어공학과체험</a>
                                                        </p>
                                                        <p>
                                                            <FontAwesomeIcon icon={faGamepad} />
                                                            <a onClick={handleMiniGame}>미니게임</a>
                                                        </p>
                                                    </KioskLinkContent>
                                                </>
                                            )
                                        }
                                        {
                                            kioskName === '나눔관' && (
                                                <>
                                                    {/* <p>학과체험하러가기</p>
                                                    <div >
                                                        <FontAwesomeIcon icon={faDna} size='lg' style={{marginRight: '5px'}} />
                                                        <span><a onClick={handleYuhanBio}>유한생명바이오학과체험</a></span>
                                                    </div> */}
                                                </>
                                            )
                                        }
                                        {
                                            kioskName === '창조관' && (
                                                <>
                                                    {/* <p>학과체험하러가기</p>
                                                    <div >
                                                        <FontAwesomeIcon icon={faPenRuler} size='lg' style={{marginRight: '5px'}} />
                                                        <span><a onClick={handleIndustrialDesign}>산업디자인학과체험</a></span>
                                                    </div> */}
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                        </KioskLink>
                        <PageLink>
                            {
                                kioskName === '유재라관' ? (
                                    <p><a href='https://sanhak.yuhan.ac.kr/index.do' target='_blank'><b>산학협력단</b></a> 페이지 가기</p>
                                ) : (
                                    <>
                                        {
                                            kioskName === '유일한기념관' && (
                                                <>
                                                    <p><a href='https://newih.yuhan.ac.kr/index.do' target='_blank'><b>유일한기념관</b></a> 페이지 가기</p>
                                                </>
                                            )
                                        }
                                        {
                                            kioskName !== '학생회관' && (
                                                <>
                                                    <p><a href='https://www.yuhan.ac.kr/ibuilder.do?menu_idx=3091' target='_blank'><b>학과안내</b></a> 페이지 가기</p>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                        </PageLink>
                    </KioskFooter>
                </KioskWrapper>
            </Html>
        </>
    )
}

const KioskWrapper = styled.div`
    width: 250px;
    border: 0.15rem solid var(--sub-color);
    height: auto;
    display: flex;
    border-radius: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--main-opacity-color);
    padding: 0.9rem;
`

const KioskHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    padding: 0.1rem;
    font-size: 2rem;
    text-align: center;
    color: var(--sub-color);
`

const KioskContent = styled.div`
    width: 100%;
    border-radius: 1rem;
    padding: 0.2rem;
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
    color: var(--sub-color);
    cursor: pointer;
    border-radius: 1rem;
    border: 0.1rem solid var(--sub-color);
`

const KioskItem = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 0.1rem;
    border-radius: 1rem;
    border-bottom: 0.1rem solid var(--sub-color);
    padding: 0.7rem;
    color: var(--sub-color);

    &:hover {
        color: var(--font-yellow-color);
        border-color: var(--font-yellow-color);
    }
`

const KioskFooter = styled.div`
    width: 100%;
    height: 15%;
    padding: 0.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--sub-color);
`

const KioskLink = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.7rem;
`

const KioskLinkContent = styled.div`
    width: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        width: 100%;
        padding: 0.3rem;
        border-bottom: 0.1rem solid var(--sub-color);

        &:hover {
            color: var(--font-yellow-color);
            border-color: var(--font-yellow-color);
            a {
                color: var(--font-yellow-color);
                border-color: var(--font-yellow-color);
            }
        }
    }

    svg {
        margin-right: 0.7rem;
    }
`

const PageLink = styled.div`
    p {
        width: 100%;

        &:hover {
            b {
                color: var(--font-yellow-color);
                border-color: var(--font-yellow-color);
            }
        }
    }
`

export default KioskModal