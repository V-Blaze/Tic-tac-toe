const gameBoard = document.querySelector<HTMLDivElement>('#game-board');
const boxes = document.querySelectorAll('.box') as NodeListOf<Element>
const winner = document.querySelector<HTMLElement>('.winner');
const button = document.querySelector<HTMLButtonElement>('.btn')
const playerX = document.querySelector<HTMLDivElement>('.player-x');
const playerO = document.querySelector<HTMLDivElement>('.player-o');

type Turn = 'X' | 'O'

let turn: Turn = 'X'


const main = (): void => {
    playGame()
}


const playGame = (): void => {
    const controller = new AbortController()
    winner?.classList.add('invisible')

    console.log('Game Started!')
        for(let box of boxes){

            box.textContent = ''
            box.classList.remove('no-hover')

        box.addEventListener('click', (e)=>{
            box.classList.add('no-hover')
            const curBox: HTMLDivElement | null = document.querySelector(`#${box.id}`)
            if(curBox && curBox.innerText == '') curBox.innerText = turn;
            
            let boardFilled: boolean = checkBoard()
            if(boardFilled){
                controller.abort()
                gameOver()
                console.log('Game box is filled')
            }

            let winner: boolean = checkWinner()
            if(!winner) switchTurn()
            else{
                wonGame()
                controller.abort()
            }
            currentPlayer()
            
        },{signal: controller.signal})
    }
}

const wonGame = ():void =>{
    
    const winningMsg = document.querySelector<HTMLElement>('.winner-message');
    if(winningMsg) winningMsg.textContent = `${turn} WON THE GAME!!!`
    winner?.classList.remove('invisible')

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
                
        playerX?.classList.add('active-player')
        playerO?.classList.remove('active-player')
    } else{
        playerX?.classList.remove('active-player')
        playerO?.classList.add('active-player')
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

button?.addEventListener('click', playGame)

main()