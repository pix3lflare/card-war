import React from 'react'


export default class Card extends React.Component{
    render(){
        const {card} = this.props
        return (
            <div className='card flipped'>
                <div className='card-info'>
                    <div className='value'>{card.value}</div>
                    <div className='suit'>{card.suit}</div>
                </div>
            </div>
        )
    }
}
