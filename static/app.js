// Task 1  Age in a Day

function ageInDays(){

    var birthYear = prompt('Year were you born')
    var daysAge = (2021 - birthYear) * 365
    var h1 = document.createElement('h1')
    var textAnswer = document.createTextNode('You are '+daysAge+ " days old" )
    h1.setAttribute('id','ageInDays')
    h1.appendChild(textAnswer)
    document.getElementById('flex-box-result').appendChild(h1)

}

function reset(){
    document.getElementById('ageInDays').remove()
}

// Task 2: Img appears

function generateCat() {
    var image = document.createElement('img')
    var div = document.getElementById('flex-gen-cat')
    image.src="static/gif.gif"
    div.appendChild(image)
}



// Task 3: Rock,Paper,Scissors

function rpsGame(yourChoice){
     
      var humanChoice, botChoice
      humanChoice = yourChoice.id
      
      botChoice =  numberToChoice(randToRpsInt())
      console.log('pc choice ',botChoice)
      
      result = decideWinner(humanChoice,botChoice)
      console.log(result)
      
      messege = finalMessege(result)
      console.log(messege)
    
      rpsFrontEnd(yourChoice.id,botChoice,messege)
}

function randToRpsInt (){
    return Math.floor(Math.random()*3)
}

function numberToChoice(number){
    return['scissors','paper','rock'][number]
}

function decideWinner(yourChoice,computerChoice){
    var rpsDatabase = {
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    }


    var yourScore = rpsDatabase[yourChoice][computerChoice]
    var computerScore = rpsDatabase[computerChoice][yourChoice]

    return [yourScore,computerScore]

}


function finalMessege([yourScore,computerScore]){
    if(yourScore===0){
        return {'messege': 'You lost', 'color': 'red'}
    }else if(yourScore === 0.5){
        return {'messege': 'You tied', 'color': 'yellow'}
    }else{
        return {'messege': 'You won', 'color': 'green'}
    }
}


function rpsFrontEnd(humanImgChoice,botImgChoice,finalMessege ){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }

    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissors').remove()

    var humanDiv = document.createElement('div')
    var botDiv = document.createElement('div')
    var messegeDiv = document.createElement('div')


    humanDiv.innerHTML = "<img src = '" + imagesDatabase[humanImgChoice] + "'  height=200 width=150 style='box-shadow: 0px 10px 10px goldenrod'>"
    messegeDiv.innerHTML = "<h1 style = 'color:" + finalMessege['color'] + ": font-size:60px ; paddind: 30px;  '>" + finalMessege['messege']+"</h1>"
    botDiv.innerHTML = "<img src = '" + imagesDatabase[botImgChoice] + "'  height=200 width=150 style='box-shadow: 0px 10px 10px red'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv)
    document.getElementById('flex-box-rps-div').appendChild(messegeDiv)
    document.getElementById('flex-box-rps-div').appendChild(botDiv)

}







// Task 4:Change the Color of all button


var all_buttons = document.getElementsByTagName('button')

var copyAllButtons = [];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1])
}

function buttonColorChange(buttonThingy){
    if(buttonThingy.value === 'red'){
        buttonRed()
    }else if(buttonThingy.value==='green'){
        buttonGreen()
    }else if(buttonThingy.value==='reset'){
        buttonReset()
    }else if (buttonThingy.value==='random'){
        randomColor()
    }
}


function buttonRed(){
    for (let i = 0; i < all_buttons.length; i++) {
       all_buttons[i].classList.remove(all_buttons[i].classList[1])
       all_buttons[i].classList.add('btn-danger')
    }
}


function buttonGreen(){
    for (let i = 0; i < all_buttons.length; i++) {
       all_buttons[i].classList.remove(all_buttons[i].classList[1])
       all_buttons[i].classList.add('btn-success')
    }
}


function buttonReset(){
    for (let i = 0; i < all_buttons.length; i++) {
       all_buttons[i].classList.remove(all_buttons[i].classList[1])
       all_buttons[i].classList.add(copyAllButtons[i])
    }
}


function randomColor(){
    var choice = ['btn-primary','btn-danger','btn-success','btn-warning','btn-secondary']
    for (let i = 0; i < all_buttons.length; i++) {
       let randomNumber = Math.floor(Math.random()*4)
       all_buttons[i].classList.remove(all_buttons[i].classList[1])
       all_buttons[i].classList.add(choice[randomNumber])
    }
}







// Task 5: Blackjack

let blackjackGame={
    'you': {'scoreSpan': '#your-blackjack-result' , 'div': '#your-box', 'score': 0 },
    'dealer': {'scoreSpan': '#dealer-blackjack-result' , 'div': '#dealer-box', 'score': 0 },
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a')
const winSound = new Audio('static/sounds/cash.mp3')
const lostSound = new Audio('static/sounds/aww.mp3')



document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit)

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)


function blackjackHit(){
    if(blackjackGame['isStand']===false){
    let card = randomCards()
    console.log(card)
    showCard(card,YOU)
    updateScore(card,YOU)
    showScore(YOU)
    }
}


function randomCards (){
    let randonIndex = Math.floor(Math.random()*13)
    return blackjackGame['cards'][randonIndex]
}


function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    let cardImage = document.createElement('img')
    cardImage.src = `static/images/${card}.png`
    document.querySelector(activePlayer['div']).appendChild(cardImage)
    hitSound.play()
    }
}


function blackjackDeal(){
    
    if(blackjackGame['turnsOver']===true){

        blackjackGame['isStand']=false

    let yourImages = document.querySelector('#your-box').querySelectorAll('img')
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')

    for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove()
    }

    for (let i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove()
    }

    YOU['score']=0
    DEALER['score']=0

    document.querySelector('#your-blackjack-result').textContent = 0
    document.querySelector('#dealer-blackjack-result').textContent = 0

    document.querySelector('#your-blackjack-result').style.color = 'wheat'
    document.querySelector('#dealer-blackjack-result').style.color = 'wheat'

    document.querySelector('blackjack-result').textContent = "Let's Play"
    document.querySelector('blackjack-result').style.color = 'black'

    blackjackGame['turnsOver']=true
    }
}


function updateScore(card,activePlayer){
    if(card==='A'){
    if(activePlayer['score']=blackjackGame['cardMap'][card][1]<=21){
        activePlayer['score'] += blackjackGame['cardMap'][card][1]
    }else{
        activePlayer['score'] += blackjackGame['cardMap'][card][0]
    }
    }else{
        activePlayer['score'] += blackjackGame['cardMap'][card]
    }
}


function showScore (activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
}



function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}



async function dealerLogic(){
    blackjackGame['isStand']=true

    while(DEALER['score']<16 && blackjackGame['isStand']===true){
        let card = randomCards()
        showCard(card,DEALER)
        updateScore(card,DEALER)
        showScore(DEALER)
        await sleep(1000)

    }
   
        blackjackGame['turnsOver']=true
        let winner = computeWinner()
        showResult(winner)
    
    
}


function computeWinner(){
    
    let winner

    if(YOU['score']<=21){

        if(YOU['score']>DEALER['score'] || DEALER['score']>21){
            blackjackGame['wins']++
            winner = YOU
        }else if(YOU['score']<DEALER['score']){
            blackjackGame['losses']++
            winner = DEALER
        }else if (YOU['score'] === DEALER['score']){
            blackjackGame['draws']++
        }

    }else if(YOU['score']>21 && DEALER['score']<= 21){
        blackjackGame['losses']++
        winner = DEALER
    }else if(YOU['score']>21 && DEALER['score']>21){
        blackjackGame['draws']++
    }

    return winner
}



function showResult(winner){
     let messege, messegeColor 


     if(blackjackGame['turnsOver']===true){


     if(winner === YOU){
         document.querySelector('#wins').textContent = blackjackGame['wins']
         messege = 'You WON!'
         messegeColor = 'green'
         winSound.play()
     } else if(winner === DEALER){
        document.querySelector('#losses').textContent = blackjackGame['losses']
        messege = 'You LOST!'
        messegeColor = 'red'
        lostSound.play()
     }else{
        document.querySelector('#draws').textContent = blackjackGame['draws']
        messege = 'You DREW!'
        messegeColor = 'black'
     }

     document.querySelector('#blackjack-result').textContent = messege
     document.querySelector('#blackjack-result').style.color = messegeColor
   
    }

    }

