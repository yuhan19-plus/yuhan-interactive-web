import { FormLabel as MuiFormLabel, FormControl as MuiFormControl, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'


const ReqForConsultation = () => {
    const location = useLocation()
    const { date } = location.state || {}
    // console.log(date)
    return (
        <ReqForConsultationWrapper>
            {/* 
                상담사 : 학과장
                상담날짜 : 날짜
                신청일시 : 현재날짜
                학과
                학번
                이름
                학년
                첨부파일
                상담구분 : 텍스트 (radio 버튼 값임)
                취업구분 : 텍스트 (radio 버튼 값임)
                연락처
                이메일 
                희망 상담내용
            */}
            {/* <Form></Form> */}
            <StyledFormControl>
                <StyledFormLabel><p>상담사</p></StyledFormLabel>
                <FormContent>
                    {/* 추후 데이터 불러오기 */}
                    <p name='professorName'>학과장</p>
                </FormContent>
            </StyledFormControl>
            <StyledFormControl>
                <StyledFormLabel><p>학과</p></StyledFormLabel>
                <FormContent>
                    {/* 추후 데이터 불러오기 */}
                    <p name='studentMajor'>컴퓨터소프트웨어공학과 컴퓨터소프트웨어전공</p>
                </FormContent>
            </StyledFormControl>
            <StyledFormControl>
                <StyledFormLabel><p>학번</p></StyledFormLabel>
                <FormContent>
                    {/* 추후 데이터 불러오기 */}
                    <p name='studentNum'>21907012</p>
                </FormContent>
            </StyledFormControl>
            <StyledFormControl>
                <StyledFormLabel><p>이름</p></StyledFormLabel>
                <FormContent>
                    {/* 추후 데이터 불러오기 */}
                    <p name='studentName'>임성준</p>
                </FormContent>
            </StyledFormControl>
            <StyledFormControl>
                <StyledFormLabel><p>학년</p></StyledFormLabel>
                <FormContent>
                    {/* 추후 데이터 불러오기 */}
                    <p name='studentGrade'>3</p>
                </FormContent>
            </StyledFormControl>
            <StyledFormControl>
                <StyledFormLabel><p>상담일시</p></StyledFormLabel>
                <FormContent>
                    <p name='counselDate'>{date}</p>
                </FormContent>
                {/* <YuhanCalendar /> */}
            </StyledFormControl>
            <StyledFormControl>
                <StyledFormLabel id="counselFile"><p>첨부파일</p></StyledFormLabel>
                <FormContent>
                    <TextField type='file' aria-labelledby='counselFile' name='counselFile' />
                </FormContent>
            </StyledFormControl>
            <StyledFormControl>
                <StyledFormLabel id="ConsultationCategory"><p>상담구분</p></StyledFormLabel>
                <FormContent>
                    <RadioGroup
                        aria-labelledby="ConsultationCategory"
                        defaultValue="female"
                        name="radio-buttons-group"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <FormControlLabel value="offline" control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: '14px'}}} />} label="방문상담" />
                        <FormControlLabel value="online" control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: '14px'}}} />} label="전화상담" />
                        <FormControlLabel value="call" control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: '14px'}}} />} label="온라인상담" />
                    </RadioGroup>
                </FormContent>
            </StyledFormControl>
            <StyledFormControl>
                <StyledFormLabel id="EmploymentClassification"><p>취업구분</p></StyledFormLabel>
                <FormContent>
                    <RadioGroup
                        aria-labelledby="EmploymentClassification"
                        defaultValue="female"
                        name="radio-buttons-group"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <FormControlLabel value="careerGuidance" control={<Radio size='small' sx={{ '& .MuiSvgIcon-root': {fontSize: '14px'}}} />} label="진로지도" />
                        <FormControlLabel value="ResumeAndCoverLetterConsulting" control={<Radio size='small' sx={{ '& .MuiSvgIcon-root': {fontSize: '14px'}}} />} label="이력서 및 자소서 컨설팅" />
                        <FormControlLabel value="interviewConsulting" control={<Radio size='small' sx={{ '& .MuiSvgIcon-root': {fontSize: '14px'}}} />} label="면접 컨설팅" />
                        <FormControlLabel value="EmploymentGuidance" control={<Radio size='small' sx={{ '& .MuiSvgIcon-root': {fontSize: '14px'}}} />} label="취업지도" />
                        <FormControlLabel value="CriminalRecordMap" control={<Radio size='small' sx={{ '& .MuiSvgIcon-root': {fontSize: '14px'}}} />} label="전과지도" />
                        <FormControlLabel value="OtherConsultation" control={<Radio size='small' sx={{ '& .MuiSvgIcon-root': {fontSize: '14px'}}} />} label="기타상담" />
                    </RadioGroup>
                </FormContent>
            </StyledFormControl>
            <StyledFormControl>
                <StyledFormLabel><p>연락처</p></StyledFormLabel>
                <FormContent>
                    {/* 추후 데이터 불러오기 */}
                    <p>010-1111-2222</p>
                </FormContent>
            </StyledFormControl>
            <StyledFormControl>
                <StyledFormLabel><p>이메일</p></StyledFormLabel>
                <FormContent>
                    {/* 추후 데이터 불러오기 */}
                    <p>asd@asd.com</p>
                </FormContent>
            </StyledFormControl>
            <StyledFormControl>
                <StyledFormLabel><p>상담내용</p></StyledFormLabel>
                <FormContent>
                    <TextField type='text' style={{width: '100%'}} />
                </FormContent>
            </StyledFormControl>
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
    }
    border-right: 2px solid #ccc;
    margin-right: 15px;
`

const FormContent = styled.div`
    width: 100%;
`
export default ReqForConsultation