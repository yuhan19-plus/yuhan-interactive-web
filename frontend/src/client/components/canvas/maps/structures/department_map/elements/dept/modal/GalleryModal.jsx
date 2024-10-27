// GalleryModal.jsx
import React from 'react';
import { Html } from '@react-three/drei';
import styled from 'styled-components';

const GalleryModal = ({ data, position }) => {
    return (
        <Html position={position} center>
            <ModalLayout>
                <h2>{data.work_name}</h2>
                <InfoText>팀 이름: {data.team_name}</InfoText>
                <InfoText>팀 멤버: {data.team_member}</InfoText>
                <InfoText>기술 스택: {data.tech_stack}</InfoText>
                <Description>{data.work_desc}</Description>
                {data.work_repository_url && (
                    <RepositoryLink href={data.work_repository_url} target="_blank" rel="noopener noreferrer">
                        저장소 링크
                    </RepositoryLink>
                )}
            </ModalLayout>
        </Html>
    );
};

export default GalleryModal;

const ModalLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 20px;
    width: 450px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
    font-family: Arial, sans-serif;
    text-align: left;

    h2 {
        font-size: 20px;
        color: #333;
        margin-bottom: 10px;
    }
`;

const InfoText = styled.p`
    font-size: 14px;
    color: #555;
    margin: 5px 0;
`;

const Description = styled.p`
    font-size: 12px;
    color: #666;
    margin: 10px 0;
`;

const RepositoryLink = styled.a`
    color: #0066cc;
    text-decoration: none;
    font-size: 12px;

    &:hover {
        text-decoration: underline;
    }
`;
