import { FormLabel as MuiFormLabel, FormControl as MuiFormControl, TextField, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { counselDate, myCounsel } from '../../../../../../../../redux/actions/actions'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBriefcase, faClock, faCompass, faFileAlt, faGlobe, faHome, faPhone, faQuestionCircle, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


const ReqForConsultation = ({userId, studentInfo, userInfo, studentInfo}) => {
    console.log(userInfo, studentInfo)
    
    const userData = {
        userPhone: userInfo[0].user_phone,
        userEmail: userInfo[0].user_email,
        userMajor: userInfo[0].user_major,
        userType: userInfo[0].user_type
    }
    
    const studentData = {
        studentNumber: studentInfo[0].student_number,
        studentGrade: studentInfo[0].student_grade
    }

    const location = useLocation()
    const dispatch = useDispatch()
    const { date = "날짜를 선택하세요" } = location.state || {}

    const [files, setFiles] = useState([])

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files))
    }

    const handleMyCounsel = () => {
        dispatch(myCounsel())
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
    
        const formData = {
            userId: userId,
            professorName: e.target.professorName.value,
            studentMajor: e.target.studentMajor.value,
            studentNum: e.target.studentNum.value,
            studentGrade: e.target.studentGrade.value,
            counselDate: e.target.counselDate.value,
            counselTime: e.target.counselTime.value,
            consultationCategory: e.target.consultationCategory.value,
            employmentClassification: e.target.employmentClassification.value,
            studentPhone: e.target.studentPhone.value,
            studentEmail: e.target.studentEmail.value,
            counselContent: e.target.counselContent.value,
        }
    
        axios.post("/api/consultation/req-for-consultation", formData)
            .then((response) => {
                console.log(response.data)
                Swal.fire({
                    icon: 'success',
                    title: '신청 완료',
                    text: '상담 신청이 성공적으로 접수되었습니다.',
                }).then(() => {
                    handleMyCounsel()
                })
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: '오류 발생',
                    text: `${error} 상담 신청 중 오류가 발생했습니다.`,
                })
            })
    }  
    
    return (
        <ReqForConsultationWrapper>
            {userId &&
                <form action='/consultation/req-for-consultation' method='POST' onSubmit={handleSubmit}>
                    <StyledFormControl>
                        <StyledFormLabel><p>상담사</p></StyledFormLabel>
                        <FormContent>
                            <input type="hidden" name='professorName' value={userData.userMajor} />
                            <p name='professorName'>
                                {userData.userMajor}학과장
                                
                            </p>
                        </FormContent>
                    </StyledFormControl>
                    <StyledFormControl>
                        <StyledFormLabel><p>학과</p></StyledFormLabel>
                        <FormContent>
                            <input type="hidden" name='studentMajor' value={userData.userMajor} />
                            <p name='studentMajor'>{userData.userMajor}</p>
                        </FormContent>
                    </StyledFormControl>
                    <StyledFormControl>
                        <StyledFormLabel><p>학번</p></StyledFormLabel>
                        <FormContent>
                            <input type="hidden" name='studentNum' value={studentData.studentNumber} />
                            <p name='studentNum'>{studentData.studentNumber}</p>
                        </FormContent>
                    </StyledFormControl>
                    <StyledFormControl>
                        <StyledFormLabel><p>학년</p></StyledFormLabel>
                        <FormContent>
                            <input type="hidden" name='studentGrade' value={studentData.studentGrade} />
                            <p name='studentGrade'>{studentData.studentGrade}</p>
                        </FormContent>
                    </StyledFormControl>
                    <StyledFormControl>
                        <StyledFormLabel id='counselTime'><p>상담일시</p></StyledFormLabel>
                        <FormContent style={{ display: 'flex', flexDirection: 'column' }}>
                            <FormContent style={{ display: 'flex', justifyContent: 'center', fontWeight: 600 }}>
                                <input type="hidden" name='counselDate' value={date} />
                                <p style={{ margin: 0 }}>{date}</p>
                            </FormContent>
                            <RadioGroup
                                aria-labelledby="counselTime"
                                defaultValue="09시~10시"
                                name="counselTime"
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                            >
                                {["09시~10시", "10시~11시", "11시~12시", "13시~14시", "14시~15시", "16시~17시"].map(time => (
                                    <FormControlLabel
                                        key={time}
                                        value={time}
                                        control={
                                            <Radio
                                                icon={<FontAwesomeIcon icon={faClock} />}
                                                checkedIcon={<FontAwesomeIcon icon={faClock} color='#366bdb' />}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: '14px' } }}
                                            />
                                        }
                                        label={time}
                                    />
                                ))}
                            </RadioGroup>
                        </FormContent>
                    </StyledFormControl>
                    <StyledFormControl>
                        <StyledFormLabel id="ConsultationCategory"><p>상담구분</p></StyledFormLabel>
                        <FormContent>
                            <RadioGroup
                                aria-labelledby="ConsultationCategory"
                                defaultValue="offline"
                                name="consultationCategory"
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                {["offline", "online", "call"].map((category, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={category}
                                        control={
                                            <Radio
                                                icon={
                                                    category === "offline" ? 
                                                    <FontAwesomeIcon icon={faHome} style={{ fontSize: '14px' }} /> :
                                                    category === "online" ? 
                                                    <FontAwesomeIcon icon={faPhone} style={{ fontSize: '14px' }} /> :
                                                    <FontAwesomeIcon icon={faGlobe} style={{ fontSize: '14px' }} />
                                                }
                                                checkedIcon={
                                                    category === "offline" ? 
                                                    <FontAwesomeIcon icon={faHome} style={{ fontSize: '14px', color: '#1976d2' }} /> :
                                                    category === "online" ? 
                                                    <FontAwesomeIcon icon={faPhone} style={{ fontSize: '14px', color: '#1976d2' }} /> :
                                                    <FontAwesomeIcon icon={faGlobe} style={{ fontSize: '14px', color: '#1976d2' }} />
                                                }
                                            />
                                        }
                                        label={category === "offline" ? "방문상담" : category === "online" ? "전화상담" : "온라인상담"}
                                    />
                                ))}
                            </RadioGroup>
                        </FormContent>
                    </StyledFormControl>
                    <StyledFormControl>
                        <StyledFormLabel id="EmploymentClassification"><p>취업구분</p></StyledFormLabel>
                        <FormContent>
                            <RadioGroup
                                aria-labelledby="EmploymentClassification"
                                defaultValue="careerGuidance"
                                name="employmentClassification"
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                {[
                                    { value: "careerGuidance", label: "진로지도", icon: faCompass },
                                    { value: "ResumeAndCoverLetterConsulting", label: "이력서 및 자소서 컨설팅", icon: faFileAlt },
                                    { value: "interviewConsulting", label: "면접 컨설팅", icon: faUserCheck },
                                    { value: "EmploymentGuidance", label: "취업지도", icon: faBriefcase },
                                    { value: "CriminalRecordMap", label: "전과지도", icon: faArrowRight },
                                    { value: "OtherConsultation", label: "기타상담", icon: faQuestionCircle }
                                ].map(item => (
                                    <FormControlLabel
                                        key={item.value}
                                        value={item.value}
                                        control={
                                            <Radio
                                                icon={<FontAwesomeIcon icon={item.icon} style={{ fontSize: '14px' }} />}
                                                checkedIcon={<FontAwesomeIcon icon={item.icon} style={{ fontSize: '14px', color: '#1976d2' }} />}
                                            />
                                        }
                                        label={item.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormContent>
                    </StyledFormControl>
                    <StyledFormControl>
                        <StyledFormLabel id='studentPhone'><p>연락처</p></StyledFormLabel>
                        <FormContent>
                            <input type="hidden" name='studentPhone' value={userData.userPhone} />
                            <p name='studentPhone'>{userData.userPhone}</p>
                        </FormContent>
                    </StyledFormControl>
                    <StyledFormControl>
                        <StyledFormLabel id='studentEmail'><p>이메일</p></StyledFormLabel>
                        <FormContent>
                            <input type="hidden" name='studentEmail' value={userData.userEmail} />
                            <p name='studentEmail'>{userData.userEmail}</p>
                        </FormContent>
                    </StyledFormControl>
                    <StyledFormControl>
                        <StyledFormLabel id='counselContent'><p>상담내용</p></StyledFormLabel>
                        <FormContent>
                            <TextField type='text' style={{ width: '100%' }} name='counselContent' />
                        </FormContent>
                    </StyledFormControl>
                    <StyledFormControl>
                        <FormContent style={{ justifyContent: 'flex-end', marginTop: '15px' }}>
                            <Button
                                variant="outlined"
                                color="error"
                                style={{ marginRight: '15px' }}
                                onClick={() => {
                                    Swal.fire({
                                        icon: "warning",
                                        title: "취소하기",
                                        text: "상담신청을 취소하시겠습니까?",
                                        showCancelButton: true,
                                        confirmButtonText: "취소",
                                        cancelButtonText: "닫기",
                                    }).then((res) => {
                                        if (res.isConfirmed) {
                                            dispatch(counselDate());
                                        }
                                    });
                                }}
                            >
                                취소하기
                            </Button>
                            <Button type="submit" variant="contained">
                                신청하기
                            </Button>
                        </FormContent>
                    </StyledFormControl>
                </form>
            }
        </ReqForConsultationWrapper>

    )
}

const ReqForConsultationWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background-color: #cccccc50;
    border-radius: 2%;
    margin-bottom: 15px;
`

const StyledFormControl = styled(MuiFormControl)`
    width: 100%;
    display: flex;
    flex-direction: row !important;
    align-items: center;
`

const StyledFormLabel = styled(MuiFormLabel)`
    width: 13%;
    text-align: center;
    p {
        font-size: 16px;
        font-weight: 600;
        margin: 15px;
    }
    border-right: 2px solid #ccc;
    margin-right: 15px;
`

const FormContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
export default ReqForConsultation