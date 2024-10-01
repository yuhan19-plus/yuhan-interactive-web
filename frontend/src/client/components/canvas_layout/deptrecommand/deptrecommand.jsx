import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const DeptRecommand = () => {
  const [questions, setQuestions] = useState({});
  const [currentQuestionSet, setCurrentQuestionSet] = useState([]);
  const [rotationCount, setRotationCount] = useState(0);
  const [excludedDepartments, setExcludedDepartments] = useState([]);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [askedQuestions, setAskedQuestions] = useState({});

  const departments = ["공학부", "디자인문화학부", "건강보건학부", "건강생활학부", "비즈니스학부"];

  // 학부 추천 기능이 실행되었을때 데이터베이스에서 학부 질문을 가져옴
  useEffect(() => {
    axios
      .get("/api/deptrec/questions")
      .then((res) => {
        const questionData = res.data.reduce((acc, item) => {
          acc[item.dept_name] = acc[item.dept_name]
            ? [...acc[item.dept_name], item.question]
            : [item.question];
          return acc;
        }, {});
        setQuestions(questionData);
        setScores(Object.fromEntries(departments.map(dept => [dept, 0])));
        setAskedQuestions(Object.fromEntries(departments.map(dept => [dept, new Set()])));
        setLoading(false);
      })
      .catch((err) => {
        console.error("질문 가져오기 실패:", err);
        setLoading(false);
      });
  }, []);

  // 학부 질문이 로딩된 후에 질문 세트를 선택하는 useEffect 추가
  useEffect(() => {
    // questions와 scores가 설정되었고 로테이션이 0일 때 초기 질문 세트를 설정
    if (Object.keys(questions).length > 0 && Object.keys(scores).length > 0 && rotationCount === 0) {
      const initialQuestionSet = getNextQuestionSet(); // 첫 질문 세트 설정
      setCurrentQuestionSet(initialQuestionSet); // 초기 질문 세트 설정
    }
  }, [questions, scores, rotationCount]); // 초기 상태에서만 실행

  useEffect(() => {
    // 학과가 제외된 후에 질문 세트를 선택
    if (rotationCount > 0 && Object.keys(questions).length > 0) {
      const nextQuestionSet = getNextQuestionSet();
      setCurrentQuestionSet(nextQuestionSet); // 새로운 질문 세트 설정
    }
  }, [excludedDepartments, rotationCount, questions]); // excludedDepartments, rotationCount가 변경될 때마다 실행
  

  const getRandomQuestion = (dept) => {
    let availableQuestions = questions[dept].filter(q => !askedQuestions[dept].has(q));
  
    if (availableQuestions.length === 0) {
      console.log(`  ${dept} 질문 목록 초기화`);
      setAskedQuestions(prev => ({
        ...prev,
        [dept]: new Set()
      }));
      availableQuestions = questions[dept];
    }
  
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
  
    setAskedQuestions(prev => ({
      ...prev,
      [dept]: new Set([...prev[dept], selectedQuestion])
    }));
  
    console.log(`  선택된 ${dept} 질문: ${selectedQuestion}`);
    return selectedQuestion;
  };

  // 다음 로테이션의 질문을 선택하는 메서드
  const getNextQuestionSet = () => {
    let remainingDepartments = departments.filter(dept => !excludedDepartments.includes(dept));
    const selectedQuestions = [];

    // 기본 로테이션에서 질문 선택
    remainingDepartments = [...remainingDepartments].sort(() => 0.5 - Math.random());
    for (const dept of remainingDepartments) {
      const randomQuestion = getRandomQuestion(dept);
      if (randomQuestion) {
        selectedQuestions.push({ dept, question: randomQuestion });
      }
    }

    // 제외된 학부가 있으면 질문이 부족할 때 최고 점수 학부의 질문으로 채움
    while (selectedQuestions.length < 5 && remainingDepartments.length > 0) {
      const topDept = remainingDepartments.reduce((a, b) => scores[a] > scores[b] ? a : b);
      const randomQuestion = getRandomQuestion(topDept);
      if (randomQuestion) {
        selectedQuestions.push({ dept: topDept, question: randomQuestion });
      } else {
        remainingDepartments = remainingDepartments.filter(dept => dept !== topDept);
      }
    }
    return selectedQuestions;
  };

  // 최하위 학부 1개를 제외하는 메서드
  const excludeDepartments = () => {
    const currentScores = Object.entries(scores)
      .filter(([dept]) => !excludedDepartments.includes(dept)) // 제외된 학부 필터링
      .sort((a, b) => a[1] - b[1]); // 점수를 기준으로 오름차순 정렬
  
    if (currentScores.length > 0) {
      const lowestScore = currentScores[0][1]; // 최하위 점수 추출
      const lowestScoreDepartments = currentScores.filter(([, score]) => score === lowestScore).map(([dept]) => dept);
  
      if (lowestScoreDepartments.length === 1) {
        const departmentToExclude = lowestScoreDepartments[0];
        setExcludedDepartments(prev => [...prev, departmentToExclude]);
        console.log("제외된 학부:", departmentToExclude);
      } else {
        // 최하위 학부가 여러 개일 때 점수 출력
        console.log(`최하위 학부가 ${lowestScoreDepartments.length}개이므로 제외하지 않음:`, lowestScoreDepartments);
        
        // 각 학부의 점수 출력
        lowestScoreDepartments.forEach(dept => {
          const score = currentScores.find(([department]) => department === dept)[1];
          console.log(`학부: ${dept}, 점수: ${score}`);
        });
      }
    }
  
    // 디버깅용: 현재 학부별 점수 출력
    console.log('현재 학부별 점수:', Object.fromEntries(currentScores));
  };
  
  // 사용자가 답변을 제출했을때 제출처리를 진행하는 메서드
  const handleAnswer = (deptName, question, score) => {
    setAnswers(prev => ({
      ...prev,
      [`${deptName}-${question}`]: score
    }));
  };

  const handleSubmit = () => {
    // 새롭게 업데이트된 점수 정보를 newScores에 저장
    const newScores = { ...scores };
    Object.entries(answers).forEach(([key, score]) => {
      const [deptName] = key.split("-");
      newScores[deptName] = (newScores[deptName] || 0) + score;
    });

    // 새롭게 업데이트된 로테이션 횟수를 업데이트
    const newRotationCount = rotationCount + 1;

    // 3로테이션까지 진행된 상황에서 모든 학부의 점수가 동일하다면?
    if (newRotationCount === 3) {
      const uniqueScores = new Set(Object.values(newScores));
      if (uniqueScores.size === 1) {
        setResult({ recommendation: "자유전공학과" });
        return;
      }
    }

    // 상태를 한꺼번에 업데이트하면서 완료 후에 질문 세트를 선택
    setScores(newScores);
    setRotationCount(newRotationCount);
    setAnswers({});

    console.log(`로테이션 ${newRotationCount} 종료 후 학부별 점수:`, newScores);


    // 로테이션이 3 이상인 경우에만 학부 제외 로직 실행
    if (newRotationCount >= 3) {
      setTimeout(() => {
        excludeDepartments(); // 학부 제외 로직
      }, 0);
    }

    // 2개의 학부만 남고 명확하게 해당 학부의 우위가 구분된다면
    const remainingDepartments = departments.filter(dept => !excludedDepartments.includes(dept));
    if (remainingDepartments.length === 2) {
      const [dept1, dept2] = remainingDepartments;
      if (newScores[dept1] !== newScores[dept2]) {
        const [top1, top2] = remainingDepartments.sort((a, b) => newScores[b] - newScores[a]);
        setResult({ top1, top2 });
        return;
      }
    }

    // 9로테이션까지 명확하게 학부가 구분되지 않는다면 자유전공학과를 같이 추천
    if (newRotationCount >= 9) {
      const sortedScores = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
      const topDepartments = sortedScores.slice(0, 2).map(([dept]) => dept);
      setResult({ recommendation: [...topDepartments, "자유전공학과"].join(", ") });
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (result) return (
    <ResultContainer>
      <h2>추천 결과</h2>
      {result.top1 && <p>1순위: {result.top1}</p>}
      {result.top2 && <p>2순위: {result.top2}</p>}
      {result.recommendation && <p>추천 학부: {result.recommendation}</p>}
    </ResultContainer>
  );

  const allQuestionsAnswered = currentQuestionSet.every(
    question => answers[`${question.dept}-${question.question}`] !== undefined
  );

  return (
    <RecommendContainer>
      <h2>학부 추천 (로테이션 {rotationCount + 1})</h2>
      {currentQuestionSet.map((currentQuestion, index) => (
        <QuestionContainer key={`${currentQuestion.dept}-${currentQuestion.question}-${index}`}>
          <p>{currentQuestion.question}</p>
          <AnswerButtons>
            {[1, 2, 3, 4, 5].map(score => (
              <AnswerButton
                key={`${currentQuestion.dept}-${currentQuestion.question}-${score}-${index}`}
                onClick={() => handleAnswer(currentQuestion.dept, currentQuestion.question, score)}
                selected={answers[`${currentQuestion.dept}-${currentQuestion.question}`] === score}
              >
                {score}
              </AnswerButton>
            ))}
          </AnswerButtons>
        </QuestionContainer>
      ))}
      <SubmitButton onClick={handleSubmit} disabled={!allQuestionsAnswered}>
        다음 질문 세트로
      </SubmitButton>
    </RecommendContainer>
  );
};

export default DeptRecommand;

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const QuestionContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const AnswerButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const AnswerButton = styled.button`
  background-color: ${props => (props.selected ? "#0056b3" : "#007bff")};
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  margin: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;