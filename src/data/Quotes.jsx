export const quotes = [
  {
    quote: "Time is the most valuable thing a man can spend.",
    author: "Theophrastus",
  },
  {
    quote: "Don't wait. The time will never be just right.",
    author: "Napoleon Hill",
  },
  {
    quote: "You may delay, but time will not.",
    author: "Benjamin Franklin",
  },
  {
    quote: "The trouble is, you think you have time.",
    author: "Buddha",
  },
  {
    quote: "The future starts today, not tomorrow.",
    author: "Pope John Paul II",
  },
  {
    quote: "Time flies over us, but leaves its shadow behind.",
    author: "Nathaniel Hawthorne",
  },
  {
    quote: "The only time you run out of chances is when you stop taking them.",
    author: "Unknown",
  },
  {
    quote: "Time you enjoy wasting is not wasted time.",
    author: "John Lennon",
  },
  {
    quote:
      "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
    author: "Stephen Covey",
  },
  {
    quote: "Every moment is a fresh beginning.",
    author: "T.S. Eliot",
  },
];

export const generateRandomQuote = (quotes) => {
  const randomNo = Math.floor(Math.random() * quotes.length);
  return quotes[randomNo];
};
