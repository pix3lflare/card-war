import React from 'react'
import shuffle from 'shuffle-array'
import Player from './Player'


export default class CardWar extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isRunning: false,
            timeElapsed: 0,
            cardDeck: [],
            player1: {
                name: 'Player 1',
                cards: [],
                cardsInPlay: [],
            },
            player2: {
                name: 'Player 2',
                cards: [],
                cardsInPlay: [],
            },
        }
    }

    componentDidMount(){
        this.buildCardDeck()
    }

    buildCardDeck = () => {
        const cardValues = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
        const cardSuits = ['diamond', 'club', 'heart', 'spade']
        let cardDeck = []
        for( let i = 0; i < cardValues.length; i++ ){
            for( let j = 0; j < cardSuits.length; j ++ ){
                cardDeck.push({
                    value: cardValues[i],
                    suit: cardSuits[j],
                    flipped: false,
                })
            }
        }
        this.setState({cardDeck})
    }

    startNewGame = () => {
        console.log('Start New Game')

        // Shuffle Cards
        let shuffledCards = shuffle([...this.state.cardDeck]);
        let player1 = Object.assign({}, this.state.player1, {cards: shuffledCards.slice(0, 26), cardsInPlay: []})
        let player2 = Object.assign({}, this.state.player2, {cards: shuffledCards.slice(26), cardsInPlay: []})

        // Initialize Game State
        clearInterval(this.timerInterval)
        clearInterval(this.gameUpdateInterval)
        this.setState({timeElapsed: 0, player1, player2}, ()=>{

            // Start Game Timer
            this.timerInterval = setInterval(()=>{
                this.setState((state, props) => {
                  return {timeElapsed: state.timeElapsed + 1};
                })
            }, 1000);

            // Start Game Update Loop
            this.gameUpdateInterval = setInterval(()=>{
                if( player1.cards.length > 0 && player2.cards.length > 0 ){
                    this.updateGame();
                }else{
                    this.endGame()
                }
            }, 4000);

        })
    }

    updateGame = () => {
        console.log('Update Game')

        let p1Cards = this.state.player1.cards
        let p1CardsInPlay = [...this.state.player1.cardsInPlay]
        p1CardsInPlay.push(p1Cards[0])

        let p2Cards = this.state.player2.cards
        let p2CardsInPlay = [...this.state.player2.cardsInPlay]
        p2CardsInPlay.push(p2Cards[0])

        const player1 = Object.assign({}, this.state.player1, {cards: p1Cards.slice(1), cardsInPlay: p1CardsInPlay})
        const player2 = Object.assign({}, this.state.player2, {cards: p2Cards.slice(1), cardsInPlay: p2CardsInPlay})
        this.setState({player1, player2})

        setTimeout(()=>{
            console.log('Evaluate Hand')
            const cardValues = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
            if( cardValues.indexOf(p1Cards[0].value) < cardValues.indexOf(p2Cards[0].value) ){
                console.log('player 1 wins')
                this.setState((state, props) => {
                  p1Cards = state.player1.cards.concat(p1CardsInPlay, p2CardsInPlay)
                  return {
                      player1: Object.assign({}, state.player1, {cards: p1Cards, cardsInPlay: []}),
                      player2: Object.assign({}, state.player2, {cardsInPlay: []}),
                  };
                })
            }else if( cardValues.indexOf(p2Cards[0].value) < cardValues.indexOf(p1Cards[0].value) ){
                console.log('player 2 wins')
                this.setState((state, props) => {
                  p2Cards = state.player2.cards.concat(p1CardsInPlay, p2CardsInPlay)
                  return {
                      player1: Object.assign({}, state.player1, {cardsInPlay: []}),
                      player2: Object.assign({}, state.player2, {cards: p2Cards, cardsInPlay: []}),
                  };
                })

            }else{
                console.log('Its a tie')
            }
        }, 2000)
    }

    endGame = () => {
        console.log('End Game')
        clearInterval(this.timerInterval)
        clearInterval(this.gameUpdateInterval)
    }

    render(){
        const {player1, player2, timeElapsed} = this.state
        return (
            <div className='card-war'>

                <div className='timer'>{timeElapsed} Secs</div>
                <div className='new-btn' onClick={this.startNewGame}>New Game</div>

                <Player player={player1} flipped={true}/>
                <Player player={player2}/>

            </div>
        )
    }

}