import React, { Component } from 'react';
import './MemoryCard.css';

class MemoryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isFlipped: false
        };
        
    }

    clickHandler() {
        const isFlipped = this.state.isFlipped
        this.setState({
            isFlipped: !isFlipped
        })
        console.log(isFlipped)
    }

    render() {
        let memoryCardInnerClass = "MemoryCardInner"
        if(this.props.isFlipped) {
             memoryCardInnerClass += " flipped"
        }
    return (
        <div className="MemoryCard" onClick={ () => this.clickHandler()}>
            <div className={memoryCardInnerClass}>
                 <div className="MemoryCardBack">
                    <img src="dc.png"/>
                 </div>
                <div className="MemoryCardFront">
                    {this.props.symbol}
                </div> 
            </div>
        </div>
        

    )
    }
}

export default MemoryCard;