const Myname = 'sier';
const btn =document.querySelector('.talk');
const content = document.querySelector('.cntnt');
var m;

const idk = ['dont know what you saying', 'Sorry I dont know. I am still learning', 'I dont know what you are saying, I am still under development']

const greetings = ['Im good, what about you ' + Myname, 'awsome and waiting for you', 'feeling energetic ' + Myname, 'Trying to learn to be more human', 'am happy to meet you, Mr.' + Myname];
const self = ['Im Mr. Ayans voice, to help you through this website.', 'I am your voice assistant, I am here to help you. Let me know if you need any help regarding this website'];
const purpose = ['This website is designed to showcase the skills and projects, that are developed by me'];
const special = ['This website has an inbuilt voice assistant to enhance user experience', 'this website has a special abilty to enhance your experience, and thats me, your voice assistant'];
const owner = ['I was created by the owner of this website, Mr. Ayan Halder. He is persuing a Bachelors degree in Electronics and communication from University of Engineering and Management, kolkata. He is a photographer by hobby, a web developer by passion, and a IOT developer in the seek of future. He loves to learn more and more from the world. I believe he is a knowledge seeker'];
const me = ['Did I forgot to introduce my self? Hi, I am your voice assistant, name? ummm, you can call me Ayan','I am Mr. Ayans voice, is not that a cool name?'];
const help = ['You can ask me about this website as well as my self and my creator. I can also help you to navigate through the page, just tell me, what you want to see!'];
const weather = ['weather around ',' is ',' and temperature is around ',' °C'];
const photography = ['I am a photographer by hobby, I believe that captures are the story of life that holds moments to realize later. I use Nikon D3400 to capture the life'];
const webdev = ['I am a web developer also and I am passionate about web designing, being creative helped me a lot to make attractive user interfaces'];
const iot = ['I was influenced by the fictional charecter tony stark or you can say the IRON Man. Then I realized the need of automation and human-machine co-operation for a greater and healthier future. I am trying to meet the future with my projects'];
const execute = ['navigateing to destination', 'As you wish'];


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = function () {
    console.log('Voice is activated, you can start ' + Myname);
};

recognition.onresult = function(event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);
    
};

btn.addEventListener('click', () => {
    recognition.start();
});



    const speech = new SpeechSynthesisUtterance();
    speech.onend = () => {
        recognition.start();
    }




    function readOutLoud(massage){
        speech.text = idk[Math.floor(Math.random() * idk.length)];
    

    if(massage.includes('how are you')){
        recognition.stop();
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
        console.log(speech.text);

    }
    if(massage.includes('who are you')){
        recognition.stop();
        speech.text = self[Math.floor(Math.random() * self.length)];
        console.log(speech.text);
        
        
    }
    if(massage.includes('what is the purpose of this website') || massage.includes('why is this website')){
        recognition.stop();
        speech.text = purpose;
        console.log(speech.text);
        
    }

    if(massage.includes('what') && massage.includes('special')  && massage.includes('website')  ){
        recognition.stop();
        speech.text = special[Math.floor(Math.random() * special.length)];
        console.log(speech.text);
    }

    if(massage.includes('about') && (massage.includes('owner') || massage.includes('creator'))){
        recognition.stop();
        speech.text = owner;
        console.log(speech.text);
    }

    if(massage.includes('your') && massage.includes('name') && massage.includes('what') ){
        recognition.stop();
        speech.text = me[Math.floor(Math.random() * me.length)];
        console.log(speech.text);
    }

    if(massage.includes('help') && massage.includes('me')){
        recognition.stop();
        speech.text = help;
        console.log(speech.text);
    }

    if(massage.includes('photography') && massage.includes('about') ){
        recognition.stop();
        speech.text = photography;
        console.log(speech.text);
    }

    if(massage.includes('web') && (massage.includes('developer') || massage.includes('development') ) && massage.includes('about')){
        recognition.stop();
        speech.text = webdev;
        console.log(speech.text);
    }

    if(massage.includes('iot') && massage.includes('about') && (massage.includes('developer') || massage.includes('development') )){
        recognition.stop();
        speech.text = iot;
        console.log(speech.text);
    }

    if(massage.includes('go') && massage.includes('to')){
        recognition.stop();
        speech.text = execute[Math.floor(Math.random() * execute.length)];
        let a = (massage.split('to '));
        let b = a[(a.length)-1];   
        console.log(b);
        document.getElementById(b).click();
    }

    if(massage.includes('weather') && massage.includes('of')){
        recognition.stop();
        let w = (massage.split('of '));
        let c = w[(w.length)-1];
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+ c +'&appid=e71330fbccf88b238310159ad2030a93')
        .then(response => response.json())
        .then(data => {
            let tempValue = data['main']['temp'];
            let descValue = data['weather'][0]['description'];

            let tvalue = Math.round(tempValue - 273);
            m = [weather[0] + c + weather[1] + descValue + weather[2] + tvalue + weather[3]];
            
            
            c = '';
            })
            speech.text = m;
            console.log(speech.text);
    }



    speech.volume = 0.6;
    speech.rate = 0.8;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
    
}
