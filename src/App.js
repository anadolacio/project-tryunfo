/* eslint-disable indent */
import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    name: '',
    description: '',
    first: '',
    second: '',
    third: '',
    image: '',
    select: '',
    checkbox: '',
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      name, description, first, second, third, image, select, checkbox } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
        />
        <Card
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ first }
          cardAttr2={ second }
          cardAttr3={ third }
          cardImage={ image }
          cardRare={ select }
          cardTrunfo={ checkbox }
        />
      </div>
    );
  }
}

export default App;
