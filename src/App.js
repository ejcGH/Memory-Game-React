import React from 'react';

import './App.css';
import MemoryCard from './Components/MemoryCard';

function generateDeck() {
  const symbols = ['∆','ß','£','§','•','$','+','ø'];
  let deck = [];
  for (let i = 0; i < 16; i++) {
    let card = {
      isFlipped: false,
      //means i modulus 8
      symbol: symbols[i % 8]
    }
    deck.push(card)
    shuffle(deck)
    // console.log(deck)
  }
  return deck
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: generateDeck(),
      pickedCards: [],
    }
  
  }

  pickCard(cardIndex) {
    if(this.state.deck[cardIndex].isFlipped) {
      return
    }
    let cardToFlip = {...this.state.deck[cardIndex]}
    cardToFlip.isFlipped = true
    let newPickedCards = this.state.pickedCards.concat(cardToFlip)
    let newDeck = this.state.deck.map( (card,index) => {
      if(cardIndex === index) {
        return cardToFlip
      }
      return card
    });
    
    if(newPickedCards.length === 2) {
      console.log(newPickedCards)
      let card1Index = newPickedCards[0]
      let card2Index = newPickedCards[1]
      console.log(card1Index)
      console.log(card2Index)
      newPickedCards = []
      if (card1Index.symbol !== card2Index.symbol) {
        
        setTimeout(this.unflipCards.bind(this, card1Index, card2Index), 1000)
      }
      
    } 
    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards
    })
  }

  unflipCards(card1Index, card2Index) {
    console.log(card1Index)
    console.log(card2Index)
    console.log(this.state.deck)
    let card1 = this.state.deck.find(card => card.symbol === card1Index.symbol && card.isFlipped === card1Index.isFlipped)
    let card2 = this.state.deck.find(card => card.symbol === card2Index.symbol && card.isFlipped === card2Index.isFlipped)
    console.log(card1)
    console.log(card2)
    card1.isFlipped = false
    card2.isFlipped = false
    let newDeck = this.state.deck.map( (card, index) => {
      if(index === 0) {
        return card1
      } else if (index === 1) {
        return card2
      } else {
        return card
      }
      })
      console.log(newDeck)
    this.setState({deck: newDeck})
  }

  render(){
   const cardsJSX = this.state.deck.map( (card,index) => {
      return (
        <MemoryCard key={index} symbol={card.symbol} isFlipped={card.isFlipped} pickCard={this.pickCard.bind(this, index)}/>
      )   
   })

  return (
    <div className="App">
      <header className="App-header">
        <h2>Memory Game</h2>
        <h3 className="Sub-Title">Match Cards To Win</h3>
      </header>
      <div>
      {cardsJSX.slice(0,4)}
      </div>
      <div>
      {cardsJSX.slice(4,8)}
      </div>
      <div>
      {cardsJSX.slice(8,12)}
      </div>
      <div>
      {cardsJSX.slice(12,16)}
      </div>
    </div>
  );
  }
}

export default App;
