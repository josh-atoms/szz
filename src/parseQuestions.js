export function parseMarkdownQuestions(text) {
  const questions = [];
  let currentSubject = '';

  const subjectPattern = /^## \*\*(.+?)\*\*$/;
  const questionPattern = /^### \*\*(\d+)\\\.\s*(.+?)\*\*$/;

  const lines = text.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    const subjectMatch = line.match(subjectPattern);
    if (subjectMatch) {
      currentSubject = subjectMatch[1].trim();
      i++;
      continue;
    }

    const questionMatch = line.match(questionPattern);
    if (questionMatch) {
      const questionText = questionMatch[2].trim();
      i++;

      const answerLines = [];
      while (i < lines.length) {
        const nextLine = lines[i];
        if (nextLine.match(subjectPattern) || nextLine.match(questionPattern)) {
          break;
        }
        answerLines.push(nextLine);
        i++;
      }

      const answer = answerLines.join('\n').trim();
      if (questionText) {
        questions.push({
          subject: currentSubject,
          Q: questionText,
          A: answer,
        });
      }
      continue;
    }

    i++;
  }

  return questions;
}

export function getSubjects(questions) {
  return [...new Set(questions.map((q) => q.subject))];
}
