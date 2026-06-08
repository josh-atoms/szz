function Header({ isRandom, toggleMode, resetQuiz, showResults, setShowResults, correctCount, wrongCount, retryMode, subjects, selectedSubject, changeSubject }) {
  return (
    <header className="header">
      <div className="header-top">
        <h1 className="logo">Quiz Master</h1>
        {retryMode && <span className="retry-badge">Retry Mode</span>}
      </div>

      <div className="header-controls">
        <div className="control-row">
          <div className="mode-toggle">
            <span className={!isRandom ? 'mode-label active' : 'mode-label'}>Serial</span>
            <label className="switch">
              <input type="checkbox" checked={isRandom} onChange={toggleMode} />
              <span className="slider" />
            </label>
            <span className={isRandom ? 'mode-label active' : 'mode-label'}>Random</span>
          </div>

          <div className="subject-select">
            <select value={selectedSubject} onChange={(e) => changeSubject(e.target.value)}>
              <option value="All">All Subjects</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="header-actions">
          <button className="btn btn-results" onClick={() => setShowResults(!showResults)}>
            {showResults ? 'Back to Quiz' : 'Results'}
            <span className="badge-group">
              <span className="badge badge-correct">{correctCount}</span>
              <span className="badge badge-wrong">{wrongCount}</span>
            </span>
          </button>
          <button className="btn btn-reset" onClick={resetQuiz}>Reset</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
