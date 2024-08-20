import React, { useState } from "react";
import styled from "styled-components";

const BoardTest = () => {
  // React 상태 훅을 사용하여 testdata 상태를 정의
  // 이 상태는 입력된 데이터를 저장하는 데 사용
  const [testdata, setTestdata] = useState({
    id: "", // 초기값으로 빈 문자열을 설정
  });

  // 입력 필드의 값이 변경될 때 호출되는 함수
  // 이벤트 객체에서 name과 value를 추출하여 상태를 업데이트합니다.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 기존 testdata 상태를 복사한 후, name에 해당하는 필드를 업데이트
    setTestdata({ ...testdata, [name]: value });
  };

  // 데이터를 추가하는 버튼 클릭 시 호출되는 함수
  // 비동기 함수로, 서버에 데이터를 POST 요청으로 전송합니다.
  const handleAddData = async () => {
    try {
      // fetch API를 사용하여 서버에 POST 요청을 보냄
      const response = await fetch("http://localhost:4000/testdb", {
        method: "POST", // HTTP 메서드로 POST를 사용하여 데이터 전송
        headers: { "Content-Type": "application/json" }, // JSON 형식으로 전송할 것을 명시
        body: JSON.stringify(testdata), // 상태 데이터를 JSON 문자열로 변환하여 요청의 본문에 포함
      });

      // 서버 응답이 정상적인지 확인 (HTTP 상태 코드 200-299)
      if (!response.ok) {
        // 응답이 실패했을 경우 에러를 발생시킴
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 서버로부터 응답을 텍스트로 받아옴
      const result = await response.text();
      // 응답 결과를 사용자에게 알림으로 표시
      alert(result);
    } catch (error) {
      // 요청 중 오류가 발생하면 콘솔에 로그를 출력하고, 사용자에게 알림
      console.error("Error adding data:", error);
      alert("데이터 추가 중 오류 발생!");
    }
  };

  const handleUpdateData = async () => {
    if (!testdata.id) {
      alert("수정할 ID를 입력");
      return;
    }
    try {
      // fetch API를 사용하여 서버에 POST 요청을 보냄
      const response = await fetch(
        `http://localhost:4000/testdb/${testdata.id}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" }, // JSON 형식으로 전송할 것을 명시
          body: JSON.stringify(testdata), // 상태 데이터를 JSON 문자열로 변환하여 요청의 본문에 포함
        }
      );

      // 서버 응답이 정상적인지 확인 (HTTP 상태 코드 200-299)
      if (!response.ok) {
        // 응답이 실패했을 경우 에러를 발생시킴
        throw new Error(`HTTP error! status: ${response.status}`);
      } // 서버로부터 응답을 텍스트로 받아옴
      const result = await response.text();
      // 응답 결과를 사용자에게 알림으로 표시
      alert(result);
    } catch (error) {
      // 요청 중 오류가 발생하면 콘솔에 로그를 출력하고, 사용자에게 알림
      console.error("Error adding data:", error);
      alert("데이터 추가 중 오류 발생!");
    }
  };

  const handleDeleteData = async () => {
    try {
      // fetch API를 사용하여 서버에 POST 요청을 보냄
      const response = await fetch("http://localhost:4000/testdb", {
        method: "POST", // HTTP 메서드로 POST를 사용하여 데이터 전송
        headers: { "Content-Type": "application/json" }, // JSON 형식으로 전송할 것을 명시
        body: JSON.stringify(testdata), // 상태 데이터를 JSON 문자열로 변환하여 요청의 본문에 포함
      });
      // 서버 응답이 정상적인지 확인 (HTTP 상태 코드 200-299)
      if (!response.ok) {
        // 응답이 실패했을 경우 에러를 발생시킴
        throw new Error(`HTTP error! status: ${response.status}`);
      } // 서버로부터 응답을 텍스트로 받아옴
      const result = await response.text();
      // 응답 결과를 사용자에게 알림으로 표시
      alert(result);
    } catch (error) {
      // 요청 중 오류가 발생하면 콘솔에 로그를 출력하고, 사용자에게 알림
      console.error("Error adding data:", error);
      alert("데이터 추가 중 오류 발생!");
    }
  };

  return (
    <TestDB>
      <Datainput>
        <h3>데이터베이스 Test</h3>
        <br />
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={testdata.id}
          onChange={handleInputChange}
        />

        <button onClick={handleAddData}>추가</button>
      </Datainput>
      <Dataload>
        <h3>저장된 데이터</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {/* 예시 데이터: 실제 데이터는 이곳에 map을 사용하여 렌더링할 수 있습니다 */}
            <tr>
              <td>exampleID1</td>
              <td>
                <button onClick={handleUpdateData}>수정</button>
              </td>
              <td>
                <button onClick={handleDeleteData}>삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </Dataload>
    </TestDB>
  );
};

export default BoardTest;

const TestDB = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const Datainput = styled.div``;

const Dataload = styled.div``;
