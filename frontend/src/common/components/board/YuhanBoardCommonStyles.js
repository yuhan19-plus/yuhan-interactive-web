/**
 * 오자현
 * 게시판, 신고에서 공통으로 사용되는 styled-components 모음
 */
import styled from "styled-components";
import { Button, TextField, Typography } from "@mui/material";

export const BackButton = styled(Button)`
background-color: #2ecc71 !important;
padding: 0.5vh 2vw !important;
size: medium;
color: var(--sub-color) !important;
box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 
            0px 2px 2px 0px rgba(0, 0, 0, 0.14), 
            0px 1px 5px 0px rgba(0, 0, 0, 0.12);

&:hover {
  background-color: #27ae60 !important;
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
export const FileButton = styled(Button).attrs({
  variant: "outlined",
})`
  margin-right: 1vw;
  color: #e74c3c !important;
  border: 1px solid #e74c3c !important;
  padding: 0 !important;
  font-size: 0.75rem;

  &:hover {
      background-color: #e74c3c !important;
      color: var(--sub-color) !important;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2vh;
`
export const RightAlignedButtons = styled.div`
  display: flex;
  gap: 0.5vw;
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  display: flex;
  gap: 16px;
`;

export const TitleTypography = styled(Typography)`
  color: #34495e;
  font-weight: bold;
  font-size: 2.5rem;
  padding: 0.75vw;
  margin-top: 1.5vh !important ;
`;

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

export const TotalSubmitButton = styled(Button).attrs({
  variant: "contained",
  color: "primary"
})`
  width:auto;
`;
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
export const WriteButton = styled(Button).attrs({
  variant: "contained",
  color: "primary"
})`
  width:2;
`;