"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { quizData } from "@/lib/quiz-data"

export default function QuizApp() {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [errors, setErrors] = useState(0)
  const [showResults, setShowResults] = useState(false)

  // Initialize with a random topic
  useEffect(() => {
    const topics = Object.keys(quizData)
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    setCurrentTopic(randomTopic)
  }, [])

  // Generate questions when topic changes
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

  const generateQuestions = (topic: string) => {
    const topicData = quizData[topic]

    return topicData.map((subtopic: any) => {
      // Create a question based on the subtopic
      const question = `O que melhor descreve "${subtopic.titulo}"?`

      // Correct answer is from the subtopic content
      const correctAnswer = subtopic.conteudo.split(". ")[0]

      // Generate incorrect answers from other subtopics
      const incorrectAnswers = generateIncorrectAnswers(topic, subtopic.titulo, 4)

      // Shuffle all answers
      const allAnswers = shuffleArray([correctAnswer, ...incorrectAnswers])

      return {
        question,
        answers: allAnswers,
        correctAnswer,
      }
    })
  }

  const generateIncorrectAnswers = (topic: string, currentSubtopicTitle: string, count: number) => {
    const topicData = quizData[topic]
    const otherSubtopics = topicData.filter((subtopic: any) => subtopic.titulo !== currentSubtopicTitle)

    const incorrectAnswers = []

    // Get random sentences from other subtopics
    for (let i = 0; i < count; i++) {
      const randomSubtopic = otherSubtopics[Math.floor(Math.random() * otherSubtopics.length)]
      const sentences = randomSubtopic.conteudo.split(". ")
      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
      incorrectAnswers.push(randomSentence)
    }

    return incorrectAnswers
  }

  const shuffleArray = (array: any[]) => {
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
    const filteredTopics = topics.filter((topic) => topic !== currentTopic)
    const newTopic = filteredTopics[Math.floor(Math.random() * filteredTopics.length)]
    setCurrentTopic(newTopic)
    setSelectedAnswer(null)
    setIsAnswered(false)
  }

  if (!currentTopic || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center">Carregando Quiz...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Resultados do Quiz</CardTitle>
            <CardDescription className="text-center text-lg">Tópico: {currentTopic}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-xl">Pontuação Final</p>
              <p className="text-3xl font-bold">
                {score} de {questions.length}
              </p>
              <Progress value={(score / questions.length) * 100} className="h-4 mt-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                <p className="text-lg font-medium">Acertos</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{score}</p>
              </div>
              <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                <p className="text-lg font-medium">Erros</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{errors}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              onClick={() => {
                setCurrentQuestionIndex(0)
                setScore(0)
                setErrors(0)
                setShowResults(false)
                setSelectedAnswer(null)
                setIsAnswered(false)
              }}
              className="w-full"
            >
              Tentar Novamente
            </Button>
            <Button onClick={handleChangeTopic} variant="outline" className="w-full">
              Mudar Tópico
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">Tópico: {currentTopic}</div>
            <div className="text-sm font-medium">
              Questão {currentQuestionIndex + 1} de {questions.length}
            </div>
          </div>
          <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
          <CardTitle className="mt-4 text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswer || ""} className="space-y-3">
            {currentQuestion.answers.map((answer: string, index: number) => {
              const isCorrect = answer === currentQuestion.correctAnswer
              let className = "border p-4 rounded-lg"

              if (isAnswered) {
                if (isCorrect) {
                  className += " bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-700"
                } else if (answer === selectedAnswer) {
                  className += " bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-700"
                }
              } else {
                className += " hover:bg-muted"
              }

              return (
                <div key={index} className={className}>
                  <div className="flex items-start">
                    <RadioGroupItem
                      value={answer}
                      id={`answer-${index}`}
                      disabled={isAnswered}
                      onClick={() => handleAnswerSelect(answer)}
                      className="mt-1"
                    />
                    <Label htmlFor={`answer-${index}`} className="ml-2 cursor-pointer">
                      {answer}
                    </Label>
                  </div>
                </div>
              )
            })}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-4">
            <div className="text-green-600 dark:text-green-400 font-medium">Acertos: {score}</div>
            <div className="text-red-600 dark:text-red-400 font-medium">Erros: {errors}</div>
          </div>
          {isAnswered ? (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? "Próxima Questão" : "Ver Resultados"}
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!selectedAnswer}>
              Responder
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

