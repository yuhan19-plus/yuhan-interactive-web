import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faEnvelopeOpenText, faList, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import MyCounsel from './MyCounsel'
import ReqForConsultation from './ReqForConsultation'
import CounselCalendar from './CounselCalendar'
import { useDispatch, useSelector } from 'react-redux';
import { counselDate, myCounsel, reqForConsultation } from '../../../../../../../../redux/actions/actions'
import ReqForConsultationList from './professor/ReqForConsultationList'

const CounselContent = () => {
    // const [currentPage, setCurrentPage] = useState(0)

    // const handleBtn = (pageNum) => {
    //     setCurrentPage(pageNum)
    //     console.log(currentPage)
    // }
    const counsel = useSelector((state) => state.counsel)
    // const counselValue = counsel.value
    const counselName = counsel.name

    const dispatch = useDispatch()

    const handleMyCounsel = () => {
        dispatch(myCounsel())
    }
    const handleCounselDate = () => {
        dispatch(counselDate())
    }
    const handleReqForConsultation = () => {
        dispatch(reqForConsultation())
    }

    return (
        <CounselContentMain>
            <ContentHeader>
                <CounselBtn>
                    <Button
                        variant="contained"
                        style={{marginRight: '5px'}}
                        onClick={() => {
                            handleMyCounsel()
                        }}
                    >
                        <FontAwesomeIcon icon={faList} />&nbsp;상담이력
                    </Button>
                    <Button
                        variant="contained"
                        style={{marginRight: '5px'}}
                        onClick={() => {
                            handleCounselDate()
                        }}
                    >
                        <FontAwesomeIcon icon={faCalendarCheck} />&nbsp;상담날짜
                    </Button>
                    <Button
                        variant="contained"
                        style={{marginRight: '5px'}}
                        onClick={() => {
                            handleReqForConsultation()
                        }}
                    >
                        <FontAwesomeIcon icon={faListCheck} />&nbsp;상담신청목록
                    </Button>
                    {/* {counselValue === false && (
                            <>
                                <Button
                                    variant="contained"
                                    style={{marginRight: '5px'}}
                                    onClick={() => {
                                        handleMyCounsel()
                                    }}
                                >
                                    <FontAwesomeIcon icon={faList} />&nbsp;상담이력
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{marginRight: '5px'}}
                                    onClick={() => {
                                        handleCounselDate()
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCalendarCheck} />&nbsp;상담날짜
                                </Button>
                            </>
                        )
                    } */}
                    {/* {(counselName !== '상담이력') && (
                            <Button
                                variant="contained"
                                style={{marginRight: '5px'}}
                                onClick={() => {
                                    handleMyCounsel()
                                }}
                            >
                                <FontAwesomeIcon icon={faList} />&nbsp;상담이력
                            </Button>
                        )
                    }
                    {(counselName !== '상담날짜') && (
                            <Button
                                variant="contained"
                                style={{marginRight: '5px'}}
                                onClick={() => {
                                    handleCounselDate()
                                }}
                            >
                                <FontAwesomeIcon icon={faCalendarCheck} />&nbsp;상담날짜
                            </Button>
                        )
                    } */}
                    {/* <Button
                        variant="contained"
                        onClick={() => {
                            
                        }}
                    >
                        <FontAwesomeIcon icon={faEnvelopeOpenText} />&nbsp;상담신청
                    </Button> */}
                </CounselBtn>
            </ContentHeader>
            <ContentContainer>
                {/* {counselValue === false && (
                    <MyCounsel />
                )} */}
                {(counselName === '상담이력') && (
                    <MyCounsel />
                )}
                {(counselName === '상담날짜') && (
                    <CounselCalendar />
                )}
                {(counselName === '상담신청') && (
                    <ReqForConsultation />
                )}
                {counselName === '상담신청목록' && (
                    <ReqForConsultationList />
                )}
            </ContentContainer>
        </CounselContentMain>
    )
}

const CounselContentMain = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ContentHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`

const CounselBtn = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
`

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`



export default CounselContent