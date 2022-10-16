import React from 'react';

import './App.css';
import MemoryCard from './Components/MemoryCard';

function generateDeck() {
  const symbols = ['∆','ß','£','§','•','$','+','ø'];
  let deck = [];
  for (let i = 0; i < 16; i++) {
    const card = {
      isFlipped: false,
      //means i modulus 8
      symbol: symbols[i % 8]
    }
    deck.push(card)
    shuffle(deck)
    console.log(deck)
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
      // deck: generateDeck()
    }
  
  }

  pickCard(cardIndex) {
    if(this.state.deck[cardIndex] === this.state.deck.isFlipped) {
      return
    }
    let cardToFlip = {...this.state.deck[cardIndex]}
  }

  render(){
   const cardsJSX = this.state.deck.map( (card,index) => {
      return (
        <MemoryCard key={index} symbol={card.symbol} isFlipped={card.isFlipped} />
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
