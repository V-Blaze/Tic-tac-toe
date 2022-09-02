const gameBoard = document.querySelector('#game-board') as HTMLElement


const main = (): void => {
    makeGame()
}

const makeGame = (): void => {
    const div = document.createElement('div') as HTMLDivElement
    div.textContent = 'HEllo'
    console.log(div)
}

main()