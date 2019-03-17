function scoreToMatch(score) {
  if (score <= 50000) {
    return 'poor';
  } else if (score <= 200000) {
    return 'moderate';
  } else if (score <= 1000000) {
    return 'strong';
  } else {
    return 'verystrong';
  }
}

export default scoreToMatch;
