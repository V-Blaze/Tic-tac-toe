const gameBoard = document.querySelector<HTMLDivElement>('#game-board');
const boxes = document.querySelectorAll('.box') as NodeListOf<Element>
const winner = document.querySelector<HTMLElement>('.winner');
const button = document.querySelector<HTMLButtonElement>('.btn')
const playerX = document.querySelector<HTMLDivElement>('.player-x');
const playerO = document.querySelector<HTMLDivElement>('.player-o');
const mins = document.querySelector<HTMLSpanElement>('#mins');
const tens = document.querySelector<HTMLSpanElement>('#tens');
const sec = document.querySelector<HTMLSpanElement>('#sec');

type Turn = 'X' | 'O'

let turn: Turn = 'X'
let Xscore:number = 0
let Oscore:number = 0
let minsCount:number = 0;
let tensCount:number = 0;
let secCount:number = 0;
let tensInterval: number | undefined;
let secInterval: number | undefined;


const main = (): void => {
    playGame()
}


const playGame = (): void => {
    const controller = new AbortController()
    winner?.classList.add('invisible')
    timmer()

    console.log('Game Started!')
        for(let box of boxes){

            box.textContent = ''
            box.classList.remove('no-hover', 'x-bg', 'o-bg');

        box.addEventListener('click', (e)=>{
            box.classList.add('no-hover')
            const curBox: HTMLDivElement | null = document.querySelector(`#${box.id}`)
            if(curBox && curBox.innerText == '') {
                curBox.innerText = turn;
                
            if(turn == "X"){
                if(curBox) curBox.classList.add('x-bg')
            } else{
                if(curBox) curBox.classList.add('o-bg')
            }
            
            let boardFilled: boolean = checkBoard()
            if(boardFilled){
                controller.abort()
                gameOver()
                pausTime()
                // console.log('Game box is filled')
            }

            let winner: boolean = checkWinner()
            if(!winner) switchTurn()
            else{
                wonGame()
                pausTime()
                controller.abort()
            }
            currentPlayer()
        }
        },{signal: controller.signal})
    }
}

const wonGame = ():void =>{

    if(turn == 'X') Xscore++
    else{
        Oscore++
    }
    
    // console.log(`this is x-score ${Xscore} - this is o-score ${Oscore}`)
    const winningMsg = document.querySelector<HTMLElement>('.winner-message');
    if(winningMsg) winningMsg.textContent = `PLAYER ${turn} WON THE GAME!!!`
    winner?.classList.remove('invisible')

    const playerXScore = document.querySelector<HTMLElement>('.x-score');
    const playerOScore = document.querySelector<HTMLElement>('.o-score');

    if(playerXScore) playerXScore.textContent = `${Xscore}`
    if(playerOScore) playerOScore.textContent = `${Oscore}`

    boxes.forEach((elem)=>{
        // console.log(elem.textContent)
        elem.classList.add('no-hover')
    })
}

const gameOver = ():void => {
    const winningMsg = document.querySelector<HTMLElement>('.winner-message');
    if(winningMsg) winningMsg.textContent = `GAME OVER!!! NO WINNER`
    winner?.classList.remove('invisible')
}

const switchTurn = (): void =>{
    if (turn == 'X'){
        turn = 'O'
    }else if(turn == 'O'){
        turn = 'X'
    }
}

const currentPlayer = ():void =>{
    if(turn == 'X'){
                
        playerX?.classList.add('x-bg')
        playerO?.classList.remove('o-bg')
    } else{
        playerX?.classList.remove('x-bg')
        playerO?.classList.add('o-bg')
    }
}

const checkWinner = ():boolean =>{
    const boxes:Array<string> = getBoxes()

    return (
        (boxes[0] == boxes[1] && boxes[1] == boxes[2] && boxes[0] != '') ||
        (boxes[3] == boxes[4] && boxes[4] == boxes[5] && boxes[3] != '') ||
        (boxes[6] == boxes[7] && boxes[7] == boxes[8] && boxes[6] != '') ||
        (boxes[0] == boxes[3] && boxes[3] == boxes[6] && boxes[0] != '') ||
        (boxes[1] == boxes[4] && boxes[4] == boxes[7] && boxes[1] != '') ||
        (boxes[2] == boxes[5] && boxes[5] == boxes[8] && boxes[2] != '') ||
        (boxes[0] == boxes[4] && boxes[4] == boxes[8] && boxes[0] != '') ||
        (boxes[2] == boxes[4] && boxes[4] == boxes[6] && boxes[2] != '')
        )
    // console.log(boxes)

}

const checkBoard = ():boolean =>{
    const boxes: Array<string> = getBoxes()

    return (boxes.includes('') !== true) 
    
    
}

const getBoxes = ():Array<string> =>{
    const boxesContent:Array<string> =[]
    for (let i = 0; i <= boxes.length -1; i++){
        const curBox = document.querySelector(`#${boxes[i].id}`) as HTMLElement
        const boxText: string | null = curBox?.innerText;
        if(boxText == null){
            boxesContent.push('')
        }else {
            boxesContent.push(boxText)
        }
    }
    return boxesContent
}

const timmer = ():void =>{
    tensInterval = setInterval((e: Event)=>{
        tensCount++;
        if(tens) tens.innerText = tensCount.toString();

        if(tensCount <= 9){
            if(tens) tens.innerText = '0' + tensCount
        } 

        if(tensCount == 60){
            minsCount++
            if(mins) mins.innerText = minsCount.toString()
            tensCount = 0
            if(tens) tens.innerText = tensCount.toString();
        }
    }, 1000);

    secInterval = setInterval((e: Event)=>{
        secCount++;
        if(sec) sec.innerText = secCount.toString();

        if(secCount >= 99) {
            secCount = 0;
        }
        
        if (secCount <= 9){
            if(sec) sec.innerText = '0' + secCount;
        }
    })

  
}  
const pausTime = ():void =>{
        clearInterval(tensInterval);
		clearInterval(secInterval);
}

button?.addEventListener('click', playGame)

main()