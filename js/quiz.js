// Initialize Lucide Icons
lucide.createIcons();

// --- Quiz App Logic ---
const quizData = {
    science: [
        { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "NaCl"], answer: "H2O" },
        { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondrion", "Chloroplast"], answer: "Mitochondrion" },
        { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], answer: "300,000 km/s" },
        { question: "What force pulls objects towards the center of the Earth?", options: ["Magnetism", "Gravity", "Friction", "Tension"], answer: "Gravity" },
        { question: "How many bones are in the adult human body?", options: ["206", "212", "198", "220"], answer: "206" },
        { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" },
        { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
        { question: "What is the main component of the sun?", options: ["Oxygen & Nitrogen", "Hydrogen & Helium", "Carbon & Oxygen", "Iron & Nickel"], answer: "Hydrogen & Helium" },
        { question: "What is the study of earthquakes called?", options: ["Seismology", "Geology", "Volcanology", "Meteorology"], answer: "Seismology" }
    ],
    history: [
        { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"], answer: "George Washington" },
        { question: "In which year did World War II end?", options: ["1942", "1945", "1950", "1939"], answer: "1945" },
        { question: "The ancient city of Rome was built on how many hills?", options: ["Five", "Seven", "Ten", "Three"], answer: "Seven" },
        { question: "Who discovered America in 1492?", options: ["Ferdinand Magellan", "Christopher Columbus", "Vasco da Gama", "Marco Polo"], answer: "Christopher Columbus" },
        { question: "The Renaissance began in which country?", options: ["France", "Spain", "Italy", "England"], answer: "Italy" },
        { question: "What was the name of the ship that sank in 1912?", options: ["Mayflower", "Britannic", "Titanic", "Lusitania"], answer: "Titanic" },
        { question: "Who wrote the 'I Have a Dream' speech?", options: ["Malcolm X", "Martin Luther King Jr.", "Nelson Mandela", "Rosa Parks"], answer: "Martin Luther King Jr." },
        { question: "The Great Wall of China was primarily built to protect against whom?", options: ["The Mongols", "The Japanese", "The Russians", "The Koreans"], answer: "The Mongols" },
        { question: "Who was the queen of ancient Egypt known for her beauty?", options: ["Hatshepsut", "Nefertiti", "Cleopatra", "Sobekneferu"], answer: "Cleopatra" },
        { question: "The Battle of Waterloo was fought in which modern-day country?", options: ["France", "Germany", "Belgium", "Netherlands"], answer: "Belgium" }
    ],
    tech: [
        { question: "What does 'CPU' stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Core Processing Unit"], answer: "Central Processing Unit" },
        { question: "Which company developed the first graphical user interface (GUI)?", options: ["Microsoft", "Apple", "IBM", "Xerox"], answer: "Xerox" },
        { question: "What does 'HTML' stand for?", options: ["HyperText Markup Language", "High-Level Text Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], answer: "HyperText Markup Language" },
        { question: "Who is known as the founder of Amazon?", options: ["Elon Musk", "Bill Gates", "Jeff Bezos", "Mark Zuckerberg"], answer: "Jeff Bezos" },
        { question: "What was the first commercially successful video game?", options: ["Space Invaders", "Pac-Man", "Pong", "Donkey Kong"], answer: "Pong" },
        { question: "Which programming language is often used for web development, especially with the React library?", options: ["Python", "Java", "JavaScript", "C++"], answer: "JavaScript" },
        { question: "What does 'URL' stand for?", options: ["Uniform Resource Locator", "Universal Resource Link", "Uniform Record Locator", "Universal Record Link"], answer: "Uniform Resource Locator" },
        { question: "What is the name of the world's largest social media network?", options: ["Instagram", "Twitter (X)", "TikTok", "Facebook"], answer: "Facebook" },
        { question: "In computing, what is a 'byte' typically composed of?", options: ["4 bits", "8 bits", "16 bits", "2 bits"], answer: "8 bits" },
        { question: "Which company created the Android operating system?", options: ["Apple", "Microsoft", "Google", "Samsung"], answer: "Google" }
    ]
};

let currentQuizTopic = '';
let currentQuestionIndex = 0;
let score = 0;

const quizTopicSelection = document.getElementById('quiz-topic-selection');
const quizContainer = document.getElementById('quiz-container');
const scoreCard = document.getElementById('quiz-score-card');
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score-display');
const nextBtn = document.getElementById('next-btn');

function startQuiz(topic) {
    currentQuizTopic = topic;
    currentQuestionIndex = 0;
    score = 0;
    quizTopicSelection.classList.add('hidden');
    scoreCard.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    scoreDisplay.textContent = `Score: 0`;
    showQuestion();
}

function showQuestion() {
    resetQuestionState();
    const questionData = quizData[currentQuizTopic][currentQuestionIndex];
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} / ${quizData[currentQuizTopic].length}`;
    questionTextEl.textContent = questionData.question;

    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('quiz-option', 'w-full', 'p-4', 'border-2', 'rounded-lg', 'text-left', 'hover:bg-indigo-100', 'hover:border-indigo-400');
        button.addEventListener('click', () => selectAnswer(button, option, questionData.answer));
        optionsContainer.appendChild(button);
    });
}

function resetQuestionState() {
    nextBtn.classList.add('hidden');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(selectedButton, selectedOption, correctAnswer) {
    const allOptions = optionsContainer.children;
    let isCorrect = selectedOption === correctAnswer;

    if (isCorrect) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
    }
    
    scoreDisplay.textContent = `Score: ${score}`;

    Array.from(allOptions).forEach(button => {
        button.disabled = true;
        if (button.innerText === correctAnswer) {
            button.classList.add('correct');
        }
    });

    if (currentQuestionIndex < quizData[currentQuizTopic].length - 1) {
        nextBtn.classList.remove('hidden');
    } else {
        setTimeout(showScoreCard, 1000);
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

function showScoreCard() {
    quizContainer.classList.add('hidden');
    scoreCard.classList.remove('hidden');
    const totalQuestions = quizData[currentQuizTopic].length;
    document.getElementById('final-score').textContent = `You scored ${score} out of ${totalQuestions}!`;
    
    const percentage = (score / totalQuestions) * 100;
    let message = '';
    if (percentage === 100) message = "Perfect Score! You're a genius!";
    else if (percentage >= 75) message = "Great job! You really know your stuff.";
    else if (percentage >= 50) message = "Not bad! A little more practice and you'll be an expert.";
    else message = "Keep trying! Knowledge is a journey.";
    document.getElementById('score-message').textContent = message;
}

function resetQuiz() {
    quizContainer.classList.add('hidden');
    scoreCard.classList.add('hidden');
    quizTopicSelection.classList.remove('hidden');
}
