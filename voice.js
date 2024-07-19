const Myname = 'Sier';
const btn = document.querySelector('.talk');
const content = document.querySelector('.cntnt');

const responses = {
    idk: ['I don\'t know what you\'re saying', 'Sorry, I don\'t know. I am still learning', 'I don\'t know what you\'re saying, I am still under development'],
    greetings: [`I'm good, what about you ${Myname}?`, 'Awesome and waiting for you', `Feeling energetic ${Myname}`, 'Trying to learn to be more human', `I'm happy to meet you, Mr. ${Myname}`],
    self: ['I\'m Mr. Ayan\'s voice, here to help you through this website.', 'I am your voice assistant, here to help you. Let me know if you need any help regarding this website'],
    purpose: ['This website is designed to showcase the skills and projects developed by me'],
    special: ['This website has an inbuilt voice assistant to enhance user experience', 'This website has a special ability to enhance your experience, and that\'s me, your voice assistant'],
    owner: ['I was created by the owner of this website, Mr. Ayan Halder. He is pursuing a Bachelor\'s degree in Electronics and Communication from the University of Engineering and Management, Kolkata. He is a photographer by hobby, a web developer by passion, and an IoT developer in the seek of future. He loves to learn more and more from the world. I believe he is a knowledge seeker'],
    me: ['Did I forget to introduce myself? Hi, I am your voice assistant. Name? Ummm, you can call me Ayan', 'I am Mr. Ayan\'s voice. Isn\'t that a cool name?'],
    help: ['You can ask me about this website, as well as myself and my creator. I can also help you navigate through the page. Just tell me what you want to see!'],
    weather: ['The weather around ', ' is ', ' and the temperature is around ', ' °C'],
    photography: ['I am a photographer by hobby. I believe that captures are the story of life that holds moments to realize later. I use Nikon D3400 to capture life'],
    webdev: ['I am a web developer and I am passionate about web designing. Being creative has helped me a lot to make attractive user interfaces'],
    iot: ['I was influenced by the fictional character Tony Stark, or you can say Iron Man. Then I realized the need for automation and human-machine cooperation for a greater and healthier future. I am trying to meet the future with my projects'],
    execute: ['Navigating to destination', 'As you wish'],
    projects: ['Ayan has developed various projects including web applications, IoT systems, and more. You can find detailed information on the projects page of this website.'],
    technologies: ['Ayan uses various technologies including Python, SQL, FastAPI, GIT, Figma, Adobe XD, SAP DI, SAP HANA, PostgreSQL, and many more.'],
    futureWebDev: ['The future of web development lies in AI integration, progressive web apps, serverless architectures, and enhanced user experiences.'],
    contact: ['You can contact Ayan via email at ayan@example.com.'],
    favoriteLang: ['Ayan\'s favorite programming languages include Python, JavaScript, SQL, Java, and more.']
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => console.log(`Voice is activated, you can start ${Myname}`);

recognition.onresult = event => {
    const transcript = event.results[event.resultIndex][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);
};

btn.addEventListener('click', () => recognition.start());

const speech = new SpeechSynthesisUtterance();
speech.onend = () => recognition.start();

function readOutLoud(message) {
    let response = responses.idk[Math.floor(Math.random() * responses.idk.length)];

    const checkIncludes = (msg, words) => words.every(word => msg.includes(word));

    if (message.includes('how are you')) {
        response = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    } else if (message.includes('who are you')) {
        response = responses.self[Math.floor(Math.random() * responses.self.length)];
    } else if (checkIncludes(message, ['purpose', 'website'])) {
        response = responses.purpose;
    } else if (checkIncludes(message, ['special', 'website'])) {
        response = responses.special[Math.floor(Math.random() * responses.special.length)];
    } else if (checkIncludes(message, ['about', 'owner']) || checkIncludes(message, ['about', 'creator'])) {
        response = responses.owner;
    } else if (checkIncludes(message, ['your name', 'what'])) {
        response = responses.me[Math.floor(Math.random() * responses.me.length)];
    } else if (checkIncludes(message, ['help', 'me'])) {
        response = responses.help;
    } else if (checkIncludes(message, ['photography', 'about'])) {
        response = responses.photography;
    } else if (checkIncludes(message, ['web', 'developer', 'about']) || checkIncludes(message, ['web', 'development', 'about'])) {
        response = responses.webdev;
    } else if (checkIncludes(message, ['iot', 'about', 'developer']) || checkIncludes(message, ['iot', 'about', 'development'])) {
        response = responses.iot;
    } else if (checkIncludes(message, ['go', 'to'])) {
        response = responses.execute[Math.floor(Math.random() * responses.execute.length)];
        const destination = message.split('to ').pop().trim();
        document.getElementById(destination)?.click();
    } else if (checkIncludes(message, ['weather', 'of'])) {
        const location = message.split('of ').pop().trim();
        fetchWeather(location);
        return;
    } else if (message.includes('about Ayan\'s projects')) {
        response = responses.projects;
    } else if (message.includes('technologies does Ayan use')) {
        response = responses.technologies;
    } else if (message.includes('future of web development')) {
        response = responses.futureWebDev;
    } else if (message.includes('contact Ayan')) {
        response = responses.contact;
    } else if (message.includes('Ayan\'s favorite programming language')) {
        response = responses.favoriteLang;
    } else if (message.match(/\d+ [\+\-\*\/] \d+/)) {
        response = solveMath(message);
    }

    speak(response);
}

function speak(text) {
    speech.text = text;
    speech.volume = 0.6;
    speech.rate = 0.8;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            const temp = Math.round(data.main.temp - 273.15);
            const desc = data.weather[0].description;
            const response = `${responses.weather[0]}${location}${responses.weather[1]}${desc}${responses.weather[2]}${temp}${responses.weather[3]}`;
            speak(response);
        })
        .catch(() => {
            speak('Sorry, I couldn\'t fetch the weather information.');
        });
}

function solveMath(expression) {
    try {
        const result = eval(expression);
        return `The result is ${result}`;
    } catch {
        return 'Sorry, I couldn\'t calculate that.';
    }
}
