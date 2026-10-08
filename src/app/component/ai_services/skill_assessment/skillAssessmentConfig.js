/**
 * AI Skill Assessment Configuration & Fallback Mock Data
 * Stores skill categories, popular skill cards, and standard fallback question sets.
 */

export const categories = [
  "Programming & Development",
  "Design & Creative",
  "Marketing & Sales",
  "Finance & Accounting",
  "Business & Management"
];

export const skillsByCategory = {
  "Programming & Development": ["JavaScript", "Python", "React", "SQL Database", "Node.js", "HTML & CSS"],
  "Design & Creative": ["UI/UX Design", "Figma Prototyping", "Adobe Illustrator", "Graphic Design"],
  "Marketing & Sales": ["Digital Marketing", "SEO Optimization", "Content Strategy", "Social Media"],
  "Finance & Accounting": ["Financial Analysis", "Excel Modeling", "Bookkeeping", "Tax Auditing"],
  "Business & Management": ["Agile Project Management", "Business Strategy", "Product Management", "Team Leadership"]
};

export const popularSkills = [
  { id: 1, name: "JavaScript", questions: "15 Questions", level: "Intermediate", category: "Programming & Development", logo: "JS", bg: "bg-amber-100 text-amber-600 border-amber-200" },
  { id: 2, name: "Python", questions: "15 Questions", level: "Intermediate", category: "Programming & Development", logo: "PY", bg: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: 3, name: "React", questions: "15 Questions", level: "Advanced", category: "Programming & Development", logo: "RE", bg: "bg-sky-100 text-sky-600 border-sky-200" },
  { id: 4, name: "SQL Database", questions: "15 Questions", level: "Beginner", category: "Programming & Development", logo: "SQL", bg: "bg-emerald-100 text-emerald-600 border-emerald-200" }
];

export const fallbackMockQuestions = [
  {
    id: "q-1",
    question: "Which of the following is the correct way to declare a variable in JavaScript?",
    options: { A: "variable x = 10;", B: "var x = 10;", C: "declare x = 10;", D: "x := 10;" },
    correct: "B",
    category: "Variables & Data Types",
    explanation: "In JavaScript, variables are declared using var, let, or const. 'var x = 10;' is valid standard syntax."
  },
  {
    id: "q-2",
    question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
    options: { A: "var", B: "let", C: "const", D: "Both let and const" },
    correct: "D",
    category: "Variables & Data Types",
    explanation: "ES6 introduced 'let' and 'const', both of which provide block scope unlike function-scoped 'var'."
  },
  {
    id: "q-3",
    question: "Which of the following is used to add a single-line comment in JavaScript?",
    options: { A: "// This is a comment", B: "<!-- This is a comment -->", C: "# This is a comment", D: "/* This is a comment */" },
    correct: "A",
    category: "Best Practices",
    explanation: "// starts a single-line comment in JavaScript."
  },
  {
    id: "q-4",
    question: "Which strict equality operator is used to compare both value and type?",
    options: { A: "==", B: "===", C: "=", D: "!=" },
    correct: "B",
    category: "ES6+ Features",
    explanation: "The strict equality operator (===) checks whether two operands are equal in both value and type."
  },
  {
    id: "q-5",
    question: "What will be the output of: console.log(typeof null);",
    options: { A: "\"null\"", B: "\"undefined\"", C: "\"object\"", D: "\"number\"" },
    correct: "C",
    category: "Variables & Data Types",
    explanation: "In JavaScript, typeof null returns 'object'. This is a historical bug in JavaScript design preserved for compatibility."
  }
];
