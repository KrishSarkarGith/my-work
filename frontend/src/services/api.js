// Demo data for testing the UI
const demoData = {
  recommendations: [
    {
      careerId: 1,
      careerTitle: "Software Engineer",
      matchScore: 0.92,
      why: "Your strong interest in Python and AI/ML, combined with your problem-solving skills and mathematical background, makes you an excellent fit for software engineering.",
      skillGaps: ["System Design", "Database Optimization", "Cloud Architecture", "DevOps", "Testing"],
      courses: [
        { name: "Complete Python Bootcamp", provider: "Udemy", level: "Intermediate" },
        { name: "Machine Learning A-Z", provider: "Coursera", level: "Advanced" },
        { name: "System Design Interview", provider: "Educative", level: "Advanced" }
      ],
      nextSteps: [
        "Build a portfolio project using Python",
        "Learn a frontend framework like React",
        "Practice coding problems on LeetCode",
        "Contribute to open source projects"
      ]
    },
    {
      careerId: 2,
      careerTitle: "Data Scientist",
      matchScore: 0.88,
      why: "Your statistical knowledge, Python skills, and research interests align perfectly with data science requirements.",
      skillGaps: ["Deep Learning", "Big Data Tools", "Statistical Modeling", "Business Acumen", "Data Visualization"],
      courses: [
        { name: "Data Science Specialization", provider: "Coursera", level: "Intermediate" },
        { name: "Python for Data Analysis", provider: "DataCamp", level: "Intermediate" },
        { name: "Statistics for Data Science", provider: "edX", level: "Advanced" }
      ],
      nextSteps: [
        "Learn pandas and numpy libraries",
        "Practice with real datasets on Kaggle",
        "Build a data analysis project",
        "Learn SQL for data extraction"
      ]
    },
    {
      careerId: 3,
      careerTitle: "UX/UI Designer",
      matchScore: 0.85,
      why: "Your visual design interests, creativity, and wireframing skills indicate a natural talent for user experience design.",
      skillGaps: ["User Research", "Prototyping Tools", "Design Systems", "Accessibility", "User Testing"],
      courses: [
        { name: "UX Design Fundamentals", provider: "Interaction Design Foundation", level: "Beginner" },
        { name: "Figma Masterclass", provider: "Udemy", level: "Intermediate" },
        { name: "User Research Methods", provider: "Nielsen Norman Group", level: "Advanced" }
      ],
      nextSteps: [
        "Learn Figma or Sketch",
        "Create a design portfolio",
        "Study user psychology",
        "Practice with design challenges"
      ]
    }
  ]
}

export const submitAssessment = async (payload) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Return demo data for now
  return demoData
}

export async function listCareers(){
  const res = await fetch(`${API_BASE}/api/careers`)
  return await res.json()
}
