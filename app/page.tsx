"use client"

import { useState, useEffect } from "react"
import { quizData } from "@/lib/quiz-data"

interface Question {
  question: string
  answers: string[]
  correctAnswer: string
}

export default function QuizApp() {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [errors, setErrors] = useState(0)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const topics = Object.keys(quizData)
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    setCurrentTopic(randomTopic)
  }, [])

  useEffect(() => {
    if (currentTopic) {
      const generatedQuestions = generateQuestions(currentTopic)
      setQuestions(generatedQuestions)
      setCurrentQuestionIndex(0)
      setScore(0)
      setErrors(0)
      setShowResults(false)
    }
  }, [currentTopic])

  const generateQuestions = (topic: string): Question[] => {
    const topicData = quizData[topic] || []

    return topicData.map((subtopic) => {
      // Safe content access with fallback
      const content = subtopic?.content || subtopic?.title || "No content available"

      // Create question
      const question = `What best describes "${subtopic?.title || "this topic"}"?`

      // Get correct answer (first sentence or title)
      const correctAnswer = content.split(". ")[0] || subtopic?.title || "Correct answer"

      // Generate incorrect answers
      const incorrectAnswers = generateIncorrectAnswers(topic, subtopic?.title || "", 3)

      // Combine and shuffle answers
      const allAnswers = shuffleArray([correctAnswer, ...incorrectAnswers])

      return {
        question,
        answers: allAnswers,
        correctAnswer,
      }
    })
  }

  const generateIncorrectAnswers = (topic: string, currentSubtopicTitle: string, count: number): string[] => {
    const topicData = quizData[topic] || []
    const otherSubtopics = topicData.filter(subtopic =>
      subtopic?.title !== currentSubtopicTitle
    )

    const incorrectAnswers: string[] = []

    // Fallback if no other subtopics
    if (otherSubtopics.length === 0) {
      return Array(count).fill("Incorrect option")
    }

    for (let i = 0; i < count; i++) {
      const randomSubtopic = otherSubtopics[Math.floor(Math.random() * otherSubtopics.length)]
      const content = randomSubtopic?.content || randomSubtopic?.title || "Incorrect option"
      const sentences = content.split(". ")
      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
      incorrectAnswers.push(randomSentence)
    }

    return incorrectAnswers
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return

    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    if (isCorrect) {
      setScore(score + 1)
    } else {
      setErrors(errors + 1)
    }

    setIsAnswered(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowResults(true)
    }
  }

  const handleChangeTopic = () => {
    const topics = Object.keys(quizData)
    const filteredTopics = topics.filter(topic => topic !== currentTopic)
    const newTopic = filteredTopics[Math.floor(Math.random() * filteredTopics.length)]
    setCurrentTopic(newTopic)
  }

  if (!currentTopic || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Loading Quiz...</h1>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center mb-4">Quiz Results</h2>
          <p className="text-center mb-2">Topic: {currentTopic}</p>
          <div className="text-center mb-6">
            <p className="text-xl">Your Score</p>
            <p className="text-3xl font-bold">
              {score} / {questions.length}
            </p>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <p>Correct: {score}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <p>Incorrect: {errors}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setCurrentQuestionIndex(0)
                setScore(0)
                setErrors(0)
                setShowResults(false)
                setSelectedAnswer(null)
                setIsAnswered(false)
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
            <button
              onClick={handleChangeTopic}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Change Topic
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <div className="flex justify-between mb-4">
          <span>Topic: {currentTopic}</span>
          <span>
            Question {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>

        <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>

        <div className="space-y-3 mb-6">
          {currentQuestion.answers.map((answer, index) => (
            <div
              key={index}
              onClick={() => !isAnswered && handleAnswerSelect(answer)}
              className={`p-3 border rounded-lg cursor-pointer ${!isAnswered
                ? "hover:bg-gray-50"
                : answer === currentQuestion.correctAnswer
                  ? "bg-green-100 border-green-500"
                  : answer === selectedAnswer
                    ? "bg-red-100 border-red-500"
                    : ""
                }`}
            >
              {answer}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm">
            Score: <span className="font-bold">{score}</span>
          </div>
          {isAnswered ? (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`px-4 py-2 rounded ${!selectedAnswer
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
