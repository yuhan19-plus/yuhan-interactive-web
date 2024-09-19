import React from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faCalendarPlus, faList, faListCheck } from '@fortawesome/free-solid-svg-icons'
import MyCounsel from './MyCounsel'
import ReqForConsultation from './ReqForConsultation'
import CounselCalendar from './CounselCalendar'
import { useDispatch, useSelector } from 'react-redux';
import { counselDate, counselDateRegister, myCounsel, reqForConsultation } from '../../../../../../../../redux/actions/actions'
import ReqForConsultationList from './professor/ReqForConsultationList'
import CounselDateRegister from './professor/CounselDateRegister'

const CounselContent = () => {
    const counsel = useSelector((state) => state.counsel)
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
    const handleCounselDateRegister = () => {
        dispatch(counselDateRegister())
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
                    <Button
                        variant="contained"
                        style={{marginRight: '5px'}}
                        onClick={() => {
                            handleCounselDateRegister()
                        }}
                    >
                        <FontAwesomeIcon icon={faCalendarPlus} />&nbsp;상담날짜등록
                    </Button>
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
                {counselName === '상담날짜등록' && (
                    <CounselDateRegister />
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