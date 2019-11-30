import React, { Component } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import BigMouth from "./BigMouth.json";

class App extends Component {
  state = {
    BigMouth,
    score: 0,
    topScore: 0,
    message: "Click on a character to earn points, but don't select a character more than once!",
  };


  handleClick = (id, clicked) => {

    const imageOrder = this.state.BigMouth;

    if (clicked) {
      imageOrder.forEach((image, index) => {
        imageOrder[index].clicked = false;
      });
      return this.setState({
        image: imageOrder.sort(() => Math.random() - 0.5),
        message: "That was wrong!",
        score: 0
      })
    }
    else {
      imageOrder.forEach((image, index) => {
        if (id === image.id) {
          imageOrder[index].clicked = true;
        }
      });

      const { topScore, score } = this.state;
      const newScore = score + 1;
      const newTopScore = newScore > topScore ? newScore : topScore;

      return this.setState({
        image: imageOrder.sort(() => Math.random() - 0.5),
        message: "You Guessed Correctly!",
        score: newScore,
        topScore: newTopScore,
      })
    }
  };
  // Map over this.state.BigMouth and render a FriendCard component for each friend object
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