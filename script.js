let stagesOfGame = 0;

let lives = 6;
let wordToFindToPrint = "";
let foundLetters = 0;
let wordToFind = "";
let man = ["leftarm", "rightarm", "leftleg", "rightleg", "manBody", "head"];
let wrongs = [];

let keyboardKeys = {
    lettersTopRow : "qwertyuiop",
    lettersMiddleRow : "asdfghjkl1",
    lettersLowerRow : "zxcvbnm2"
};
let letters = "qwertyuiopasdfghjklzxcvbnm";

let myWords = {
    rivers : ["Yangtze", "Mississippi", "Yenisei", "Brahmaputra", "Zambezi"],
    cities : ["Mumbai", "Bangkok", "Chicago", "Santiago", "Jerusalem"]
};

let gallowParts = ["first", "second", "third", "forth", "fifth", "sixs", "seventh"];
//rendering Keyboard
let keyboardRows = document.getElementsByClassName("keyboardRow");
let keyboardRowCounter = 0;
for(key in keyboardKeys){
    for(letter in keyboardKeys[key]){
        let text;
        let letterKey = document.createElement("div");
        letterKey.setAttribute("class", "letterKey");
        if(keyboardKeys[key][letter] == 1){
            text = document.createTextNode("Del");
            letterKey.setAttribute("id", "Backspace");
            letterKey.style.fontSize = "350%";
            // letterKey.addEventListener("click", deleteLetter);
        }else if(keyboardKeys[key][letter] == 2){
            text = document.createTextNode("Enter");
            letterKey.setAttribute("id", "Enter");
            letterKey.style.width = "12%";
            // letterKey.addEventListener("click", enter);
        }else{
            text = document.createTextNode(keyboardKeys[key][letter]);
            letterKey.setAttribute("id", keyboardKeys[key][letter]);
            // letterKey.addEventListener("click", addLetter);
        }
        letterKey.addEventListener("mousedown", animationDown);
        letterKey.addEventListener("mouseup", animationUp);
        letterKey.addEventListener("click", inputMouse);
        letterKey.appendChild(text);
        keyboardRows[keyboardRowCounter].appendChild(letterKey);
        
    }
    ++keyboardRowCounter;
}
function inputMouse(event){
    if(stagesOfGame == 1){
        // console.log(event.target.innerText);
        if(letters.includes(event.target.innerText)){
        
            if(divQuestion.textContent.length > 28){
                divQuestion.nextSibling.textContent = "The word is too long";
                divQuestion.nextSibling.style.color = "red";
            }else if(divQuestion.textContent.length < 21){
                divQuestion.nextSibling.textContent = "The word is too short";
                divQuestion.nextSibling.style.color = "red";
                divQuestion.textContent += event.target.innerText;
            }else{
                divQuestion.textContent += event.target.innerText;
                divQuestion.nextSibling.textContent = "The word is OK";
                divQuestion.nextSibling.style.color = "lightblue";
            }
            
        }else if(event.target.textContent == "Del" && divQuestion.textContent.length > 17){
            let screen = divQuestion.textContent.split("");
            screen.pop();
            screen = screen.join("");
            divQuestion.textContent = screen;
            if(divQuestion.textContent.length > 28){
                divQuestion.nextSibling.textContent = "The word is too long";
                divQuestion.nextSibling.style.color = "red";
            }else if(divQuestion.textContent.length < 21){
                divQuestion.nextSibling.textContent = "The word is too short";
                divQuestion.nextSibling.style.color = "red";
            }else{
                divQuestion.nextSibling.textContent = "The word is OK";
                divQuestion.nextSibling.style.color = "lightblue";
            }
        }else{
            wordToFind = divQuestion.textContent.split(" ")[divQuestion.textContent.split(" ").length-1].split("");
            wordToFindToPrint = "*".repeat(wordToFind.length).split("");
            actualGame(divQuestion.textContent.split(" ")[divQuestion.textContent.split(" ").length-1]);
        }
    }else if(stagesOfGame == 2){
        checkLetter(event.target.innerText);
    }
    
}
//animation of screen's keyboard when mouse down
function animationDown(event){
    event.target.style.color = "red";
    event.target.style.borderColor = "red";//can make a function!!!!!!!!!!!!!
    event.target.style.fontSize = "500%";
}
//animation of screen's keyboard when mouse up
function animationUp(event){
    event.target.style.color = "lightblue";
    event.target.style.borderColor = "lightblue";//can make a function!!!!!!!!!!!!!
    event.target.style.fontSize = "400%";
}

//animation of real keyboard
document.addEventListener("keydown", push);
document.addEventListener("keyup", pull);
document.addEventListener("keypress", inputFromKeyboard);

function inputFromKeyboard(event){
    // console.log(event.key);
    if(stagesOfGame == 1){
        if(divQuestion.textContent.length > 28){
            divQuestion.nextSibling.textContent = "The word is too long";
            divQuestion.nextSibling.style.color = "red";
        }else if(divQuestion.textContent.length < 21){
            divQuestion.nextSibling.textContent = "The word is too short";
            divQuestion.nextSibling.style.color = "red";
            if(letters.includes(event.key)){
                divQuestion.textContent += event.key;
            }
        }else if(letters.includes(event.key)){
            divQuestion.textContent += event.key;
            divQuestion.nextSibling.textContent = "The word is OK";
            divQuestion.nextSibling.style.color = "lightblue";
        }else if(event.key == "Enter"){
            wordToFind = divQuestion.textContent.split(" ")[divQuestion.textContent.split(" ").length-1].split("");
            wordToFindToPrint = "*".repeat(wordToFind.length).split("");
            actualGame(divQuestion.textContent.split(" ")[divQuestion.textContent.split(" ").length-1])
        }
    }else if(stagesOfGame == 2){
        if(letters.includes(event.key)){
            checkLetter(event.key);
        }
    }
}

function push(event){
    let tmp = divQuestion.textContent;
    let tempLetter = document.getElementById(event.key);
    tempLetter.style.color = "red";
    tempLetter.style.borderColor = "red";//can make a function!!!!!!!!!!!!!
    tempLetter.style.fontSize = "500%";
    if(stagesOfGame == 1 && event.key == "Backspace" && tmp.length > 17){
        let screen = divQuestion.textContent.split("");
        screen.pop();
        screen = screen.join("");
        divQuestion.textContent = screen;
        if(tmp.length > 28){
            divQuestion.nextSibling.textContent = "The word is too long";
            divQuestion.nextSibling.style.color = "red";
        }else if(tmp.length < 21){
            divQuestion.nextSibling.textContent = "The word is too short";
            divQuestion.nextSibling.style.color = "red";
        }else{
            divQuestion.nextSibling.textContent = "The word is OK";
            divQuestion.nextSibling.style.color = "lightblue";
        }
    }
}

function pull(event){
    let tempLetter = document.getElementById(event.key);
    tempLetter.style.color = "lightblue";
    tempLetter.style.borderColor = "lightblue";//can make a function!!!!!!!!!!!!!
    tempLetter.style.fontSize = "400%";
}
//**************************************************************************** */
//"do you want to play the game" - window
let playground = document.getElementsByClassName("playground")[0];//playground area

let questionWindow = document.createElement("div");//window for messages
questionWindow.style.display = "grid";
questionWindow.style.gridTemplateRows = "2fr 1fr";
questionWindow.style.width = "70%";
questionWindow.style.height = "40%";
questionWindow.style.border = "solid lightblue 5px";

let divQuestion = document.createElement("div");//part of window for messages
createFlexCenter(divQuestion);
let textQuestion = document.createTextNode("Do you want to play The Game?");
divQuestion.appendChild(textQuestion);
divQuestion.style.fontSize = "300%";
divQuestion.style.color = "lightblue";

let divChoises = document.createElement("div");
createFlexCenter(divChoises);
divChoises.style.justifyContent = "space-around";

let yesNo = ["Yes", "No"];
for(let i = 0; i < 2; i++){
    let choise = document.createElement("div");
    choise.setAttribute("class", "letterKey");
    choise.addEventListener("click", playOrNot);   
    let textYesNo = document.createTextNode(yesNo[i]);
    choise.appendChild(textYesNo);
    choise.style.width = "30%";
    divChoises.appendChild(choise);
    choise.addEventListener("mousedown", animationDown);
    choise.addEventListener("mouseup", animationUp);
}

questionWindow.appendChild(divQuestion);
questionWindow.appendChild(divChoises);
playground.appendChild(questionWindow);


function createFlexCenter(someDiv){
    someDiv.style.width = "100%";
    someDiv.style.height = "100%";
    someDiv.style.display = "flex";
    someDiv.style.justifyContent = "center";
    someDiv.style.alignItems = "center";
}

function playOrNot(event){
    if(event.target.innerText == "No"){
        window.location.href = 'http://learn.di-learning.com/courses/';
    }else if(event.target.innerText == "To input"){
        ++stagesOfGame;
        getWordInput();       
    }else if(event.target.innerText == "To choose"){
        let answers = divQuestion.nextSibling.children;
        divQuestion.innerText = "What do you prefer?"
        answers[0].innerText = "cities";
        answers[1].innerText = "rivers";
        ++stagesOfGame;
    }else if(event.target.innerText == "Yes"){
        divQuestion.innerText = "Do you prefer to input word by yourself or to choose just theme?"
        let answers = divQuestion.nextSibling.children;
        answers[0].innerText = "To input";
        answers[1].innerText = "To choose";
    }else{
        let index = Math.floor(Math.random() * 4);
        actualGame(myWords[event.target.innerText][index]);
    }
}

function getWordInput(){
    divQuestion.textContent = "Input your word: ";
    divsToRemove = divQuestion.nextSibling.children;
    divQuestion.nextSibling.removeChild(divsToRemove[0]);
    divQuestion.nextSibling.removeChild(divsToRemove[0]);
    divQuestion.nextSibling.textContent = "The word has to be between 5 and 12 letters included";
    divQuestion.nextSibling.style.color = "lightblue";
}
function actualGame(secretWord){
    rendrerGame(secretWord);
}

function rendrerGame(userWord){
    wordToFind = userWord.split("");
    wordToFindToPrint = "*".repeat(wordToFind.length).split("");
    playground.removeChild(playground.firstChild);
    let gallows = document.createElement("div");// div where gallows will be situated
    gallows.style.height = "85%";
    gallows.style.width = "100%";
    gallows.setAttribute("class", "gallows");

    let tablo = document.createElement("div");
    tablo.style.height = "15%";
    tablo.style.width = "40%";
    tablo.style.border = "lightblue solid 4px";
    tablo.style.borderBottom = "0"
    tablo.style.position = "relative";
    tablo.style.top = "0";
    tablo.style.color = "lightblue";
    tablo.style.alignItems = "center";
    tablo.style.fontSize = "450%";
    tablo.style.letterSpacing = "25px";
    tablo.setAttribute("class", "gallows");
    tablo.setAttribute("id", "tablo");
    tablo.textContent = "*".repeat(userWord.length);
    document.getElementsByClassName("keyboard")[0].style.borderTop = "lightblue solid 4px";

    playground.appendChild(gallows);
    playground.appendChild(tablo);

    for(let i = 0; i < 7; ++i){
        let part = document.createElement("div");
        part.setAttribute("class", gallowParts[i]);
        gallows.appendChild(part);
    }
    let arrayRowsKeyBoard = document.getElementsByClassName("keyboard")[0].children;
    for(row of arrayRowsKeyBoard){
        for(button of row.children){
            if(button.textContent == "Enter" || button.textContent == "Del"){
                row.removeChild(button);
            }
        }
    }

    stagesOfGame++;


}

function checkLetter(letterToCheck){
    let tablo = document.getElementById("tablo");
    let found = false;
    for(i = 0; i < wordToFind.length; i++){
        if(wordToFind[i].toLowerCase() == letterToCheck){
            foundLetters++;
            wordToFindToPrint[i] = wordToFind[i];
            found = true;
        }
    }

    if(found == false){
        lives--;
        let body = document.createElement("div");
        body.style.position = "absolute";
        body.setAttribute("class", man[lives]);
        playground.appendChild(body);
        wrongs.push(man[lives]);
        
    }else{
        playground.children[1].textContent = wordToFindToPrint.join("");
        
    }

    if(lives < 1){
        ++stagesOfGame;
        tablo.innerText = "You lose";

    }else if(foundLetters == wordToFind.length){
        ++stagesOfGame;
        tablo.innerText = "You winner";
        myWin();
    }
}


function myWin(){
    for(item of gallowParts){
        document.getElementsByClassName("gallows")[0].removeChild(document.getElementsByClassName(item)[0]);
    }
    for(wrong of wrongs){
        playground.removeChild(document.getElementsByClassName(wrong)[0]);
    }

    for(item of man){
        let body = document.createElement("div");
        body.style.position = "absolute";
        body.setAttribute("class", item);
        playground.appendChild(body);
    }
    let angle = 0;
    let counter = 98;
    let id = setInterval(function(){
        for(item of man){
            let myBody = document.getElementsByClassName(item)[0];
            myBody.style.top = `${myBody.offsetTop + 1}px`;
        }
        --counter;
        if(counter == 0){
            clearInterval(id);
        }
    }, 10);
    fireworks();
}

function fireworks(){
    let listColors = ["coral", "crimson", "cyan", "blueviolet", "aqua", "aquamarine", "darkred", "gold", "hotpink", "indianred"];
    let toDelete = [];
    let end = setInterval(function(){
    let amountFire = Math.floor(Math.random() * 15);

        for(let i = 0; i < amountFire; ++i){
            let fire = document.createElement("div");

            let colorIndex = listColors[Math.floor(Math.random() * listColors.length)];
            fire.style.borderTopColor = colorIndex;
            fire.style.borderLeftColor = colorIndex;
            fire.style.borderRightColor = colorIndex;
            fire.style.backgroundColor = listColors[Math.floor(Math.random() * listColors.length)];
            // fire.style.backgroundColor = colorIndex;
            fire.style.borderBottomColor = colorIndex;
            let top = Math.floor(Math.random() * 300);
            let left = Math.floor(Math.random() * 1500);
            fire.style.top = `${top}px`;
            fire.style.left = `${left}px`;
            fire.setAttribute("class", "firework");
            fire.setAttribute("id", colorIndex);
            toDelete.push(colorIndex);


            playground.appendChild(fire);
        }
        let borderWidth = 1;
        let id = setInterval(function(){
            console.log(borderWidth);
            borderWidth++;
            for(boom of toDelete){
                document.getElementById(boom).style.borderTopWidth = `${borderWidth}px`;
                document.getElementById(boom).style.borderLeftWidth = `${borderWidth}px`;
                document.getElementById(boom).style.borderRightWidth = `${borderWidth}px`;
            }
            if(borderWidth > 25){
                for(deleted of toDelete){
                    playground.removeChild(document.getElementById(deleted));
                }
                toDelete = [];
                clearInterval(id)
            }
        },70)
    },2000)
    
}


