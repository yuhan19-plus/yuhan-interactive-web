import React from 'react'
import { FormLabel as MuiFormLabel, FormControl as MuiFormControl, TextField } from '@mui/material'
import styled from 'styled-components'
import YuhanCalendar from '../YuhanCalendar'

const CounselDateRegister = () => {
    return (
        <CounselDateRegisterWrapper>
            {/* <StyledFormControl>
                <StyledFormLabel><p>날짜등록</p></StyledFormLabel>
                <FormContent>
                    <TextField type='date' style={{width: '100%'}} />
                </FormContent>
            </StyledFormControl> */}
            <YuhanCalendar />
        </CounselDateRegisterWrapper>
    )
}

const CounselDateRegisterWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    margin-bottom: 15px;
    background-color: white;
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
    display: flex;
    align-items: center;
`

export default CounselDateRegister