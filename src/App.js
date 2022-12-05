import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    name: '',
    description: '',
    first: 0,
    second: 0,
    third: 0,
    image: '',
    select: '',
    checkbox: false,
    isSaveButtonDisabled: true,
    savedCards: [],
  };

  validationFields = () => {
    const { name, image, description, first, second, third, select } = this.state;
    const maxLength = 90;
    const minLength = 0;
    const totalLength = 210;
    const validationName = name.length !== 0;
    const validationImage = image.length !== 0;
    const validationSelect = select.length !== '';
    const validationDescription = description.length !== 0;
    const validationFirst = minLength <= Number(first) && maxLength >= Number(first);
    const validationSecond = minLength <= Number(second) && maxLength >= Number(second);
    const validationThird = minLength <= Number(third) && maxLength >= Number(third);
    const validationTotal = Number(first) + Number(second) + Number(third) <= totalLength;

    this.setState({
      isSaveButtonDisabled: !(validationName && validationImage
     && validationDescription && validationFirst && validationSecond
        && validationThird && validationSelect && validationTotal),
    });
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { name, description, first, second,
      third, image, select, checkbox } = this.state;
    const newCard = { name,
      description,
      first,
      second,
      third,
      image,
      select,
      checkbox };

    this.setState((oldState) => ({
      savedCards: [...oldState.savedCards, newCard],
      name: '',
      description: '',
      first: 0,
      second: 0,
      third: 0,
      image: '',
      checkbox: '',
      isSaveButtonDisabled: true,
    }));
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    console.log(target);
    this.setState({
      [name]: value,
    }, this.validationFields);
  };

  render() {
    const {
      name,
      description, first, second, third, image, select, checkbox,
      savedCards } = this.state;
    return (
      <main>
        <h1>Tryunfo</h1>
        <section>
          <Form
            { ...this.state }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
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
        </section>
        <section>
          {
            savedCards.map((element) => (
              <Card
                key={ element.name }
                cardName={ element.name }
                cardDescription={ element.description }
                cardAttr1={ element.first }
                cardAttr2={ element.second }
                cardAttr3={ element.third }
                cardImage={ element.image }
                cardRare={ element.select }
                cardTrunfo={ element.checkbox }
              />
            ))
          }
        </section>
      </main>
    );
  }
}

export default App;
