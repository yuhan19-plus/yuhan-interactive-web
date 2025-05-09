import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faCalendarPlus, faList, faListCheck } from '@fortawesome/free-solid-svg-icons'
import MyCounsel from './MyCounsel'
import ReqForConsultation from './ReqForConsultation'
import CounselCalendar from './CounselCalendar'
import { useDispatch, useSelector } from 'react-redux';
import { counselDate, counselDateRegister, myCounsel, myProfessorInfo, reqForConsultation } from '../../../../../../../../redux/actions/actions'
import ReqForConsultationList from './professor/ReqForConsultationList'
import Swal from 'sweetalert2'
import axios from 'axios'

const CounselContent = () => {
    const counsel = useSelector((state) => state.counsel)
    const currentUserState = useSelector((state) => state.currentUser)
    const studentMajor = currentUserState.user_major
    const userType = currentUserState.user_type
    const counselName = counsel.name
    const dispatch = useDispatch()

    // console.log(currentUserState)
    // console.log('asd', studentMajor)

    // 나의 교수정보 가져오기 (학생일경우)
    const MyProfessorData = async () => {
        try {
            const response = await axios.get('/api/memberInfo/get-my-professor-info', {
                params: {
                    studentMajor: studentMajor
                }
            })

            const data = response.data
            // console.log("data", data)
            dispatch(myProfessorInfo(data.professor))

            // Swal.fire({
            //     icon: 'success',
            //     title: '데이터 로드 성공.',
            //     text: '교수 데이터를 가져왔습니다.',
            // })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `교수정보를 가져오는 도중 오류가 발생했습니다: ${error}`,
            })
        }
    }

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

    useEffect(() => {
        // 학생일 경우에만 교수정보 가져오기
        if(userType === 'student') {
            MyProfessorData()
        }
    }, [])

    return (
        <CounselContentMain>
            <ContentHeader>
                <CounselBtn>
                    {
                        userType === 'student' ? (
                            <>
                                <StyledButton
                                    variant="contained"
                                    // style={{marginRight: '5px'}}
                                    onClick={() => {
                                        handleMyCounsel()
                                    }}
                                >
                                    <FontAwesomeIcon icon={faList} />
                                    <p>상담이력</p>
                                </StyledButton>
                                <StyledButton
                                    variant="contained"
                                    // style={{marginRight: '5px'}}
                                    onClick={() => {
                                        handleCounselDate()
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCalendarCheck} />
                                    <p>상담날짜</p>
                                </StyledButton>
                            </>
                        ) : (
                                <>
                                    <StyledButton
                                        variant="contained"
                                        // style={{marginRight: '5px'}}
                                        onClick={() => {
                                            handleReqForConsultation()
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faListCheck} />
                                        <p>상담신청목록</p>
                                    </StyledButton>
                                    <StyledButton
                                        variant="contained"
                                        // style={{marginRight: '5px'}}
                                        onClick={() => {
                                            handleCounselDateRegister()
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCalendarPlus} />
                                        <p>상담날짜등록</p>
                                    </StyledButton>
                                </>
                        )
                    }
                </CounselBtn>
            </ContentHeader>
            <ContentContainer>
                {
                    (userType === 'student') ? (
                        <>
                            {(counselName === '상담이력') && (
                                <MyCounsel currentUserState={currentUserState} />
                            )}
                            {(counselName === '상담날짜') && (
                                <CounselCalendar />
                            )}
                            {(counselName === '상담신청') && (
                                <ReqForConsultation currentUserState={currentUserState} />
                            )}
                        </>
                    ) : (
                        <>
                            {counselName === '상담신청목록' && (
                                <ReqForConsultationList currentUserState={currentUserState} />
                            )}
                            {counselName === '상담날짜등록' && (
                                <CounselCalendar />
                            )}
                        </>
                    )
                }
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
    margin-bottom: 1rem;
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

const StyledButton = styled(Button)`
    background-color: var(--main-color) !important;
    color: var(--sub-color) !important;
    margin-right: 0.5rem !important;
        
    svg {
        margin-right: 0.5rem !important
    }

    &:hover {
        color: var(--font-yellow-color) !important;
    }
`

export default CounselContent