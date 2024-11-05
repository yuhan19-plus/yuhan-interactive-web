/**
 * 오자현
 * 게시판, 신고에서 공통으로 사용되는 styled-components 모음
 */
import styled from "styled-components";
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography } from "@mui/material";

// 버튼 styled-components
export const BackButton = styled(Button)`
  background-color:var(--main-dark-color) !important;
  padding: 0.5vh 2vw !important;
  size: medium;
  color: var(--sub-color) !important;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 
              0px 2px 2px 0px rgba(0, 0, 0, 0.14), 
              0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: var(--main-color) !important;
    color: var(--font-yellow-color) !important;
  }
`;
export const UpdateButton = styled(Button)`
  margin-right: 1vw !important;
  border-color: #3498db;
  border: 1px solid #3498db !important;
  
  &:hover {
    background-color: #3498db !important;
    color: var(--sub-color);
  }
`;
export const DeleteButton = styled(Button)`
  margin-right: 1vw !important;
  color: #e74c3c !important;
  border-color: #e74c3c;
  border: 1px solid #e74c3c !important;
  
  &:hover {
    background-color: #e74c3c !important;
    color: var(--sub-color) !important;
  }
`;
export const TotalSubmitButton = styled(Button).attrs({
  variant: "contained",
})`
  width:auto;
  background-color: var(--main-dark-color) !important;
  &:hover {
  background-color: var(--main-color) !important;
  color: var(--font-yellow-color) !important;
  }
`;
export const WriteButton = styled(Button).attrs({
  variant: "contained",
})`
  width:2;
  background-color: var(--main-dark-color) !important;
  &:hover {
  background-color: var(--main-color) !important;
  color: var(--font-yellow-color) !important;
}
`;
export const SearchButton = styled(Button).attrs({
  variant: "contained",
})`
  background-color: var(--main-dark-color) !important;
  &:hover {
  background-color: var(--main-color) !important;
  color: var(--font-yellow-color) !important;
  }
`

// 버튼컨테이너 styled-components
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2vh;
`
export const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1vh;
`;
export const WriteButtonContainer = styled.div`
  position: absolute;
  right: 5px;
  margin-top: 1vh;
`;
export const ButtonRightContainer = styled.div`
  display: flex;
  gap: 0.5vw;
`;

// 입력 styled-components
export const InputTitle = styled(TextField).attrs({
  multiline: true,
  fullWidth: true,
  label: "제목",
  variant: "outlined",
})`
  border-radius: 0.5vh;
  width:100%;
`;
export const InputContent = styled(TextField).attrs({
  multiline: true,
  fullWidth: true,
  label: "내용",
  variant: "outlined",
  rows: 8,
})`
  border-radius: 0.5vh;
  width:100%;
`;

// 첨부파일관련 styled-components
export const AttachmentsContainer = styled.div`
  padding: 1vw;
  display: flex;
  justify-content: flex-end;
`;

export const AttachmemtAccordion = styled(Accordion)`
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
`;

export const AttachmemtAccordionSummary = styled(AccordionSummary)`
  font-size: 1.1rem;
`;

export const AttachmemtAccordionDetails = styled(AccordionDetails)`
  background: var(--sub-color);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.25vh;
  position: absolute;
  z-index: 10;
`;

export const AttachmentLink = styled.a`
  color: #2980B9;
  text-align: center;
  display: block;
  width: auto;
`;

// 기타 styled-components
export const TitleTypography = styled(Typography)`
  color: #34495e;
  font-weight: bold;
  font-size: 2.5rem;
  padding: 0.75vw;
  margin-top: 1.5vh !important ;
`;