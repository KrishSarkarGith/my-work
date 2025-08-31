import React, { useState } from 'react';
import { submitAssessment } from '../services/api';

// Assessment sections and questions data
const assessmentSections = [
  {
    id: 'start',
    title: 'START',
    description: '30 minutes career test',
    questions: [
      {
        id: 'intro',
        type: 'intro',
        title: 'Welcome back!',
        description: 'Discover your top career matches and why they\'re right for you.',
      },
      {
        id: 'name',
        type: 'text',
        question: 'What is your full name?',
        fieldName: 'name',
        placeholder: 'Enter your full name',
        required: true,
      },
      {
        id: 'education',
        type: 'select',
        question: 'What is your highest level of education?',
        fieldName: 'education_level',
        options: [
          { value: 'Class 10', label: 'Class 10' },
          { value: 'Class 12', label: 'Class 12' },
          { value: 'BTech', label: 'BTech' },
          { value: 'BSc', label: 'BSc' },
          { value: 'Any Bachelor\'s', label: 'Any Bachelor\'s' },
        ],
        defaultValue: 'BTech',
      },
      {
        id: 'language',
        type: 'multiselect',
        question: 'Which languages are you comfortable with?',
        description: 'Select all that apply',
        fieldName: 'preferred_languages',
        options: ['English', 'Hindi', 'Kashmiri'],
        defaultValue: ['English'],
      },
    ],
  },
  {
    id: 'personality',
    title: 'YOUR PERSONALITY ARCHETYPE',
    description: '~2 mins',
    questions: [
      {
        id: 'personality-intro',
        type: 'intro',
        title: 'Discover Your Personality Archetype',
        description: 'Answer a few questions to help us understand your personality traits.',
      },
      {
        id: 'personality-q1',
        type: 'scale',
        question: 'I prefer working with ideas rather than people.',
        fieldName: 'personality_q1',
        min: 1,
        max: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree',
      },
      {
        id: 'personality-q2',
        type: 'scale',
        question: 'I enjoy taking leadership roles in group settings.',
        fieldName: 'personality_q2',
        min: 1,
        max: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree',
      },
      {
        id: 'personality-q3',
        type: 'scale',
        question: 'I prefer having a structured plan rather than being spontaneous.',
        fieldName: 'personality_q3',
        min: 1,
        max: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree',
      },
    ],
  },
  {
    id: 'career',
    title: 'YOUR CAREER MATCHES',
    description: '~3 mins',
    questions: [
      {
        id: 'career-intro',
        type: 'intro',
        title: 'Find Your Career Matches',
        description: 'Tell us about your interests and strengths to find the best career matches.',
      },
      {
        id: 'interests',
        type: 'multiselect',
        question: 'What are your areas of interest?',
        description: 'Select all that apply to you',
        fieldName: 'interests',
        options: [
          'python',
          'design',
          'public policy',
          'business',
          'mechanics',
          'ai/ml',
          'visual design',
          'sql',
          'research'
        ],
        required: true,
      },
      {
        id: 'strengths',
        type: 'multiselect',
        question: 'What are your key strengths?',
        description: 'Select your top strengths',
        fieldName: 'strengths',
        options: [
          'communication',
          'problem solving',
          'statistics',
          'leadership',
          'creativity',
          'wireframing',
          'maths'
        ],
        required: true,
      },
    ],
  },
  {
    id: 'degree',
    title: 'YOUR DEGREE MATCHES',
    description: '~1 min',
    questions: [
      {
        id: 'degree-intro',
        type: 'intro',
        title: 'Find Your Degree Matches',
        description: 'Let\'s find educational paths that align with your career goals.',
      },
      {
        id: 'degree-interest',
        type: 'multiselect',
        question: 'Which fields of study interest you?',
        description: 'Select all that apply',
        fieldName: 'degree_interests',
        options: [
          'Computer Science',
          'Engineering',
          'Business',
          'Arts',
          'Science',
          'Humanities',
          'Medicine',
          'Law'
        ],
      },
    ],
  },
  {
    id: 'results',
    title: 'YOUR RESULTS',
    description: '~20 mins',
    questions: [
      {
        id: 'final',
        type: 'final',
        title: 'Ready to discover your career path?',
        description: 'We have all the information we need to generate your personalized career recommendations.',
      },
    ],
  },
];

export default function AssessmentQuiz({ onDone }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    education_level: 'BTech',
    interests: [],
    strengths: [],
    preferred_languages: ['English'],
    values: ['impact', 'growth', 'stability'], // Default values
    age: 18, // Default age
    personality_q1: 3,
    personality_q2: 3,
    personality_q3: 3,
    degree_interests: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentSection = assessmentSections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  
  // Calculate section progress
  const sectionProgress = Math.round((currentQuestionIndex / (currentSection.questions.length - 1)) * 100) || 0;
  
  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const toggleMultiSelect = (fieldName, value) => {
    setFormData(prev => {
      const currentValues = prev[fieldName] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [fieldName]: newValues
      };
    });
  };

  const handleScaleChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: parseInt(value, 10)
    }));
  };

  const canProceed = () => {
    if (!currentQuestion) return true;
    
    if (currentQuestion.required) {
      if (currentQuestion.type === 'text' && !formData[currentQuestion.fieldName]?.trim()) {
        return false;
      }
      if (currentQuestion.type === 'multiselect' && (!formData[currentQuestion.fieldName] || formData[currentQuestion.fieldName].length === 0)) {
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      // Move to next question in current section
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < assessmentSections.length - 1) {
      // Move to first question of next section
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Move to previous question in current section
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      // Move to last question of previous section
      setCurrentSectionIndex(prev => prev - 1);
      const prevSection = assessmentSections[currentSectionIndex - 1];
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await submitAssessment(formData);
      onDone(data);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setError('There was an error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'intro':
        return (
          <div className="assessment-intro">
            <h2>{currentQuestion.title}</h2>
            <p>{currentQuestion.description}</p>
          </div>
        );

      case 'text':
        return (
          <div className="assessment-question">
            <h3>{currentQuestion.question}</h3>
            <input
              type="text"
              className="form-input"
              value={formData[currentQuestion.fieldName] || ''}
              onChange={(e) => handleInputChange(currentQuestion.fieldName, e.target.value)}
              placeholder={currentQuestion.placeholder}
              required={currentQuestion.required}
            />
          </div>
        );

      case 'select':
        return (
          <div className="assessment-question">
            <h3>{currentQuestion.question}</h3>
            <select
              className="form-select"
              value={formData[currentQuestion.fieldName] || currentQuestion.defaultValue}
              onChange={(e) => handleInputChange(currentQuestion.fieldName, e.target.value)}
            >
              {currentQuestion.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'multiselect':
        return (
          <div className="assessment-question">
            <h3>{currentQuestion.question}</h3>
            {currentQuestion.description && <p className="question-description">{currentQuestion.description}</p>}
            <div className="chips-container">
              {currentQuestion.options.map(option => (
                <span
                  key={option}
                  className={`chip ${(formData[currentQuestion.fieldName] || []).includes(option) ? 'selected' : ''}`}
                  onClick={() => toggleMultiSelect(currentQuestion.fieldName, option)}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        );

      case 'scale':
        return (
          <div className="assessment-question">
            <h3>{currentQuestion.question}</h3>
            <div className="scale-container">
              <span className="scale-label">{currentQuestion.minLabel}</span>
              <div className="scale-options">
                {Array.from({ length: currentQuestion.max - currentQuestion.min + 1 }, (_, i) => i + currentQuestion.min).map(value => (
                  <label key={value} className="scale-option">
                    <input
                      type="radio"
                      name={currentQuestion.fieldName}
                      value={value}
                      checked={formData[currentQuestion.fieldName] === value}
                      onChange={() => handleScaleChange(currentQuestion.fieldName, value)}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
              <span className="scale-label">{currentQuestion.maxLabel}</span>
            </div>
          </div>
        );

      case 'final':
        return (
          <div className="assessment-final">
            <h2>{currentQuestion.title}</h2>
            <p>{currentQuestion.description}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="assessment-container">
      <div className="vertical-progress">
        {assessmentSections.map((section, index) => (
          <div 
            key={section.id} 
            className={`progress-section ${index === currentSectionIndex ? 'active' : ''} ${index < currentSectionIndex ? 'completed' : ''}`}
          >
            <div className="progress-indicator">
              <div className="progress-dot"></div>
              {index < assessmentSections.length - 1 && <div className="progress-line"></div>}
            </div>
            <div className="progress-content">
              <div className="progress-title">{section.title}</div>
              <div className="progress-description">{section.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="assessment-content">
        {renderQuestion()}

        {error && <div className="error-message">{error}</div>}

        <div className="assessment-navigation">
          {(currentQuestionIndex > 0 || currentSectionIndex > 0) && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}

          {(currentSectionIndex < assessmentSections.length - 1 || currentQuestionIndex < currentSection.questions.length - 1) ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Generating Your Career Plan...' : 'Get My Career Plan'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}