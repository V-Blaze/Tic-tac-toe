const gameBoard = document.querySelector<HTMLDivElement>('#game-board');
const boxes = document.querySelectorAll('.box') as NodeListOf<Element>
const winner = document.querySelector<HTMLElement>('.winner');
const button = document.querySelector<HTMLButtonElement>('.btn')

type Turn = 'X' | 'O'

let turn: Turn = 'X'


const main = (): void => {
    playGame()
}


const playGame = (): void => {
    const controller = new AbortController()
    winner?.classList.add('invisible')

    console.log('started')
        for(let box of boxes){
            box.textContent = ''
        box.addEventListener('click', (e)=>{
            const curBox: HTMLDivElement | null = document.querySelector(`#${box.id}`)
            if(curBox && curBox.innerText == '') curBox.innerText = turn;
            let winner: boolean = checkWinner()
            checkBoard()
            if(!winner) switchTurn()
            else{
                wonGame()
                controller.abort()
            }
            
        },{signal: controller.signal})
    }
}

const wonGame = ():void =>{
    
    const winningMsg = document.querySelector<HTMLElement>('.winner-message');
    if(winningMsg) winningMsg.textContent = `${turn} WON THE GAME!!!`
    winner?.classList.remove('invisible')

    boxes.forEach((elem)=>{
        console.log(elem)
    })
}

const switchTurn = (): void =>{
    if (turn == 'X'){
        turn = 'O'
    }else if(turn == 'O'){
        turn = 'X'
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

const checkBoard = ():void =>{
    const boxes: Array<string> = getBoxes()

    if(boxes.includes('') == true) return
    console.log('All boxes filled')
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
    console.log(boxesContent)
    return boxesContent
}

button?.addEventListener('click', playGame)

main()