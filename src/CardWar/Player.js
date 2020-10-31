import React from 'react'
import Card from './Card'


export default class Player extends React.Component{
    render(){
        const {player, flipped} = this.props
        const cardsInPlay = player.cardsInPlay.map((card, index)=><Card key={index} card={card}/>)
        return(
            <div className={flipped ? 'player-row flipped': 'player-row'}>

                <div className='play-area'>
                    {cardsInPlay}
                </div>

                <div className='player-info'>
                    <i className="fas fa-user-circle profile-icon"></i>
                    <div className='name'>{player.name}</div>
                    <div className='card-wrap'>
                        <div className='card'/>
                        <div className='count'>{player.cards.length}</div>
                    </div>
                </div>

            </div>
        )
    }
}