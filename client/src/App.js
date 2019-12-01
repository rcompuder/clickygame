import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import BigMouth from "./BigMouth.json";

class App extends Component {
  state = {
    BigMouth,
    score: 0,
    topScore: 0,
    message: "Click a Character, the cards will switch order, careful not to pick the same one twice!",
  };


  handleClick = (id, clicked) => {

    const changeOrder = this.state.BigMouth;

    if (clicked) {
      changeOrder.forEach((image, index) => {
        changeOrder[index].clicked = false;
      });
      return this.setState({
        image: changeOrder.sort(() => Math.random() - 0.5),
        message: "NO!",
        score: 0
      })
    }
    else {
      changeOrder.forEach((image, index) => {
        if (id === image.id) {
          changeOrder[index].clicked = true;
        }
      });

      const { topScore, score } = this.state;
      const newScore = score + 1;
      const newTopScore = newScore > topScore ? newScore : topScore;

      return this.setState({
        image: changeOrder.sort(() => Math.random() - 0.5),
        message: "YES!",
        score: newScore,
        topScore: newTopScore,
      })
    }
  };
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Wrapper>
          <Title>
            <div className="text-center">
              <h1 id="message-title">{this.state.message}</h1>
            </div>
            <div className="gameScores text-center">
              <p><strong>Score:</strong> {this.state.score} | <strong>Top Score:</strong> {this.state.topScore}</p>
            </div>
          </Title>

          {this.state.BigMouth.map(BigMouth => (
            <Card
              id={BigMouth.id}
              key={BigMouth.id}
              name={BigMouth.name}
              image={BigMouth.image}
              clicked={BigMouth.clicked}
              handleClick={this.handleClick}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default App;