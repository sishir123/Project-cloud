const wordText = document.querySelector(".word"); // targeting to css attributes
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
inputField = document.querySelector("input");
refreshbtn = document.querySelector(".refreshword");
checkbtn = document.querySelector(".checkword");

let correctword, timer;

const initTimer = maxTime => {  //maxtime is argument
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0)
        {
            maxTime--;          //decrement maxtime by -1
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time Off! ${correctword.toUpperCase()} was the correct word`);
        initGame();         //calling iniiGame() so the game restart
    },1000);
}

const initGame = () => {
    initTimer(30);      //calling initGame() with passing 30 as maxtime value
    let randomObj = words[Math.floor(Math.random() * words.length)]; //getting random object from words
    let wordArray = randomObj.word.split("");  //splitting each letter of random word
    for (let i = wordArray.length - 1;i > 0; i--)
    {
        let j = Math.floor(Math.random() * (i+1)); //getting random number shuffling and swiping wordArray letters randomly
        let temp = wordArray[i];
        wordArray[i] = wordArray[j];
        wordArray[j] = temp;
    }
    wordText.innerText = wordArray.join("");    //passing shuffle word as a text
    hintText.innerText = randomObj.hint;    //passing random object as a hint text
    correctword = randomObj.word.toLowerCase();     //passing random word to correct word
    inputField.value = "";                      //making input field empty
    inputField.setAttribute("maxlength",correctword.length); //setting input maxlength attr value to word length
    
}
initGame()

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase(); //getting user value
    if(!userWord) return alert("Please enter a word?"); //if user doesnt enter anything

    if(userWord !== correctword) return alert(`Oops! ${userWord.toUpperCase()} is incorrect word`); //if user enter wrong word

     alert(`Congrats! ${userWord.toUpperCase()} is a correct word`); //if user enter correct word
     initGame();
}

refreshbtn.addEventListener("click",initGame);
checkbtn.addEventListener("click",checkWord);