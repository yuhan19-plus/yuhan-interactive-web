/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발(예정)
 */
import { faBomb, faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AxiosError } from 'axios'
import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import styled from 'styled-components'

let errorMessage
const ErrorPage = () => {
    const error = useRouteError()

    if (error instanceof AxiosError) {
      errorMessage = error?.response?.data
    }

    return (
        <ErrorWrapper>
            <ErrorHeader>
                <p>Error</p>
                <p><FontAwesomeIcon icon={faBomb} /></p>
            </ErrorHeader>
            <ErrorContent>
                <p><FontAwesomeIcon icon={faMessage} /></p>
                <p>{errorMessage}</p>
            </ErrorContent>
            <ErrorFooter>
                <Link to='/'>
                  <img src='assets/images/yuhan-logo2.png' />
                </Link>
            </ErrorFooter>
        </ErrorWrapper>
    )
}

const ErrorWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--main-color);
  padding: 3rem;
`

const ErrorHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--sub-color);
  margin-bottom: 1rem;

  p {
    margin-right: 1rem;
  }
`

const ErrorContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: var(--sub-color);
  font-size: 1.5rem;
  
  p {
    margin-right: 1rem;
  }
`

const ErrorFooter = styled.div`
  width: 10%;
  height: 10%;
  color: var(--sub-color);
  margin-top: 1rem;
`
export default ErrorPage