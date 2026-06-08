import { useState, useEffect, useCallback } from 'react';
import { parseMarkdownQuestions, getSubjects } from './parseQuestions';
import QuizCard from './components/QuizCard';
import ResultsPanel from './components/ResultsPanel';
import Header from './components/Header';
import './App.css';

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [questionQueue, setQuestionQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRandom, setIsRandom] = useState(false);
  const [correctQuestions, setCorrectQuestions] = useState([]);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [retryMode, setRetryMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const shuffle = useCallback((arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, []);

  const getFilteredQuestions = useCallback((questions, subject) => {
    if (subject === 'All') return questions;
    return questions.filter((q) => q.subject === subject);
  }, []);

  const buildQueue = useCallback((questions, random) => {
    return random ? shuffle(questions) : [...questions];
  }, [shuffle]);

  useEffect(() => {
    fetch('/questions.md')
      .then((r) => r.text())
      .then((text) => {
        const parsed = parseMarkdownQuestions(text);
        setAllQuestions(parsed);
        setSubjects(getSubjects(parsed));
        const queue = [...parsed];
        setQuestionQueue(queue);
        if (queue.length > 0) {
          setHistory([queue[0]]);
          setHistoryIndex(0);
        }
      });
  }, []);

  const startQuiz = useCallback((questions, random) => {
    const queue = buildQueue(questions, random);
    setQuestionQueue(queue);
    setCurrentIndex(0);
    setCorrectQuestions([]);
    setWrongQuestions([]);
    setRetryMode(false);
    if (queue.length > 0) {
      setHistory([queue[0]]);
      setHistoryIndex(0);
    } else {
      setHistory([]);
      setHistoryIndex(-1);
    }
  }, [buildQueue]);

  const resetQuiz = () => {
    const filtered = getFilteredQuestions(allQuestions, selectedSubject);
    startQuiz(filtered, isRandom);
  };

  const toggleMode = () => {
    const newRandom = !isRandom;
    setIsRandom(newRandom);
    const filtered = getFilteredQuestions(allQuestions, selectedSubject);
    startQuiz(filtered, newRandom);
  };

  const changeSubject = (subject) => {
    setSelectedSubject(subject);
    const filtered = getFilteredQuestions(allQuestions, subject);
    startQuiz(filtered, isRandom);
    setShowResults(false);
  };

  const currentQuestion = history[historyIndex] || null;

  const markCorrect = () => {
    if (!currentQuestion) return;
    setCorrectQuestions((prev) => {
      if (prev.find((q) => q.Q === currentQuestion.Q)) return prev;
      return [...prev, currentQuestion];
    });
    setWrongQuestions((prev) => prev.filter((q) => q.Q !== currentQuestion.Q));
    goNext();
  };

  const markWrong = () => {
    if (!currentQuestion) return;
    setWrongQuestions((prev) => {
      if (prev.find((q) => q.Q === currentQuestion.Q)) return prev;
      return [...prev, currentQuestion];
    });
    setCorrectQuestions((prev) => prev.filter((q) => q.Q !== currentQuestion.Q));
    goNext();
  };

  const goNext = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    } else {
      const nextIdx = currentIndex + 1;
      if (nextIdx < questionQueue.length) {
        setCurrentIndex(nextIdx);
        const nextQ = questionQueue[nextIdx];
        setHistory((prev) => [...prev, nextQ]);
        setHistoryIndex(history.length);
      }
    }
  };

  const goPrev = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const retryWrong = () => {
    if (wrongQuestions.length === 0) return;
    const queue = isRandom ? shuffle(wrongQuestions) : [...wrongQuestions];
    setQuestionQueue(queue);
    setCurrentIndex(0);
    setWrongQuestions([]);
    setRetryMode(true);
    setHistory([queue[0]]);
    setHistoryIndex(0);
    setShowResults(false);
  };

  const goToQuestion = (question) => {
    setHistory((prev) => [...prev, question]);
    setHistoryIndex(history.length);
    setShowResults(false);
  };

  const isFinished = historyIndex >= history.length - 1 && currentIndex >= questionQueue.length - 1;
  const totalAnswered = correctQuestions.length + wrongQuestions.length;

  return (
    <div className="app">
      <Header
        isRandom={isRandom}
        toggleMode={toggleMode}
        resetQuiz={resetQuiz}
        showResults={showResults}
        setShowResults={setShowResults}
        correctCount={correctQuestions.length}
        wrongCount={wrongQuestions.length}
        totalQuestions={questionQueue.length}
        retryMode={retryMode}
        subjects={subjects}
        selectedSubject={selectedSubject}
        changeSubject={changeSubject}
      />

      <main className="main-content">
        {showResults ? (
          <ResultsPanel
            correctQuestions={correctQuestions}
            wrongQuestions={wrongQuestions}
            retryWrong={retryWrong}
            goToQuestion={goToQuestion}
          />
        ) : (
          <QuizCard
            question={currentQuestion}
            questionNumber={historyIndex + 1}
            totalQuestions={questionQueue.length}
            onCorrect={markCorrect}
            onWrong={markWrong}
            onNext={goNext}
            onPrev={goPrev}
            canGoNext={historyIndex < history.length - 1 || currentIndex < questionQueue.length - 1}
            canGoPrev={historyIndex > 0}
            isFinished={isFinished && totalAnswered === questionQueue.length}
            onRetryWrong={retryWrong}
            wrongCount={wrongQuestions.length}
          />
        )}
      </main>
    </div>
  );
}

export default App;
