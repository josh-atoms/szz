import { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

function cleanMarkdown(md) {
  if (!md) return '';
  return md
    .replace(/\r\n/g, '\n')
    // Collapse 2+ blank lines into 1
    .replace(/\n{3,}/g, '\n\n')
    // Remove blank lines between a list item and its nested content
    .replace(/(\*\s.*)\n\n(\s+\*)/g, '$1\n$2')
    // Remove blank lines between consecutive list items
    .replace(/(\*\s.*)\n\n(\*\s)/g, '$1\n$2')
    // Remove standalone spaces on lines
    .replace(/^\s+$/gm, '')
    .trim();
}

function QuizCard({ question, questionNumber, totalQuestions, onCorrect, onWrong, onNext, onPrev, canGoNext, canGoPrev, isFinished, onRetryWrong, wrongCount }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const cleanedAnswer = useMemo(() => cleanMarkdown(question?.A), [question]);

  useEffect(() => {
    setShowAnswer(false);
  }, [question]);

  if (!question) {
    return (
      <div className="card empty-card">
        <p>Loading questions...</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="card finished-card">
        <div className="finished-icon">&#10003;</div>
        <h2>All Done!</h2>
        <p>You've gone through all the questions.</p>
        {wrongCount > 0 && (
          <button className="btn btn-retry-big" onClick={onRetryWrong}>
            Retry Wrong Answers ({wrongCount})
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <span className="question-counter">
          Question {questionNumber} of {totalQuestions}
        </span>
        {question.subject && (
          <span className="question-subject">{question.subject}</span>
        )}
      </div>

      <div className="card-body">
        <h2 className="question-text">{question.Q}</h2>

        <div className={`answer-section ${showAnswer ? 'visible' : ''}`}>
          <div className="answer-content markdown-body">
            <ReactMarkdown>{cleanedAnswer}</ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="nav-buttons">
          <button className="btn btn-nav" onClick={onPrev} disabled={!canGoPrev}>
            &#8592; Previous
          </button>
          <button
            className="btn btn-show"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
          <button className="btn btn-nav" onClick={onNext} disabled={!canGoNext}>
            Next &#8594;
          </button>
        </div>

        <div className="mark-buttons">
          <button className="btn btn-correct" onClick={onCorrect}>
            <span className="btn-icon">&#10003;</span> I Got It Right
          </button>
          <button className="btn btn-wrong" onClick={onWrong}>
            <span className="btn-icon">&#10007;</span> I Got It Wrong
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
