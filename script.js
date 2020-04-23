const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/image.jpg",
    text: "Yukihiro Matsumoto - Founder ruby programming language",
  },
  {
    image: "./img/image-1.jpg",
    text: "Brendan Eich - Founder JavaScript programming language",
  },
  {
    image: "./img/image-2.jpg",
    text: "Rasmus Lerdorf - Founder php programming language",
  },
  {
    image: "./img/image-3.jpg",
    text: "James Gosling - Founder java programming language",
  },
  {
    image: "./img/image-4.jpg",
    text: "larry wall - Founder perl programming language",
  },
  {
    image: "./img/image-5.jpg",
    text: "Niklaus Wirth - Founder Pascal programming language",
  },
  {
    image: "./img/image-6.jpg",
    text: "John McCarthy - Founder Lisp programming language",
  },
  {
    image: "./img/image-7.jpg",
    text: "Guido van Rossum - Founder Python progrmming language",
  },
  {
    image: "./img/image-8.jpg",
    text: "Bjarne Stroustrup - Founder C++ programming language",
  },
  {
    image: "./img/image-9.jpg",
    text: "Dennis Ritchie - Founder C programming language",
  },
  {
    image: "./img/image-10.jpg",
    text: "Chris Lattner - Founder Swift programming language",
  },
  {
    image: "./img/image-11.jpg",
    text: "Anders Hejlsberg - Founder C# programming language",
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// Close button
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

// Change voice
voicesSelect.addEventListener("change", setVoice);

// Read text button
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
