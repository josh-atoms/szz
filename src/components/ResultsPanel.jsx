import { useState } from 'react';

function ResultsPanel({ correctQuestions, wrongQuestions, retryWrong, goToQuestion }) {
  const [activeTab, setActiveTab] = useState('wrong');

  const total = correctQuestions.length + wrongQuestions.length;
  const percentage = total > 0 ? Math.round((correctQuestions.length / total) * 100) : 0;

  return (
    <div className="results-panel">
      <div className="results-summary">
        <div className="score-circle">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" className="score-bg" />
            <circle
              cx="60" cy="60" r="52"
              className="score-fill"
              strokeDasharray={`${percentage * 3.27} 327`}
              strokeDashoffset="0"
            />
          </svg>
          <div className="score-text">
            <span className="score-number">{percentage}%</span>
            <span className="score-label">Score</span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-correct">
            <span className="stat-number">{correctQuestions.length}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="stat-card stat-wrong">
            <span className="stat-number">{wrongQuestions.length}</span>
            <span className="stat-label">Wrong</span>
          </div>
          <div className="stat-card stat-total">
            <span className="stat-number">{total}</span>
            <span className="stat-label">Answered</span>
          </div>
        </div>
      </div>

      {wrongQuestions.length > 0 && (
        <button className="btn btn-retry-big" onClick={retryWrong}>
          Retry Wrong Answers ({wrongQuestions.length})
        </button>
      )}

      <div className="results-tabs">
        <button
          className={`tab ${activeTab === 'wrong' ? 'active' : ''}`}
          onClick={() => setActiveTab('wrong')}
        >
          Wrong ({wrongQuestions.length})
        </button>
        <button
          className={`tab ${activeTab === 'correct' ? 'active' : ''}`}
          onClick={() => setActiveTab('correct')}
        >
          Correct ({correctQuestions.length})
        </button>
      </div>

      <div className="results-list">
        {activeTab === 'wrong' && wrongQuestions.length === 0 && (
          <p className="empty-state">No wrong answers yet. Keep going!</p>
        )}
        {activeTab === 'correct' && correctQuestions.length === 0 && (
          <p className="empty-state">No correct answers yet.</p>
        )}

        {(activeTab === 'wrong' ? wrongQuestions : correctQuestions).map((q, idx) => (
          <div key={idx} className={`result-item ${activeTab}`} onClick={() => goToQuestion(q)}>
            <span className="result-number">{idx + 1}</span>
            <span className="result-question">{q.Q}</span>
            <span className="result-arrow">&#8594;</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsPanel;
