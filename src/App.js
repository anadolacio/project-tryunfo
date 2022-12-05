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
    select: 'normal',
    checkbox: '',
    isSaveButtonDisabled: true,
    savedCards: [],
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    console.log(target);
    this.setState({
      [name]: value,
    }, this.validationFields);
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

    this.setState((oldState) => ({
      savedCards: [...oldState.savedCards,
        { name,
          description,
          first,
          second,
          third,
          image,
          select,
          checkbox },
      ],
      name: '',
      description: '',
      first: '0',
      second: '0',
      third: '0',
      image: '',
      checkbox: false,
      select: 'normal',
      isSaveButtonDisabled: true,
    }));

    this.setState({ cardName: '' });
    this.setState({ cardDescription: '' });
    this.setState({ cardAttr1: '0' });
    this.setState({ cardAttr2: '0' });
    this.setState({ cardAttr3: '0' });
    this.setState({ cardImage: '' });
    this.setState({ cardRare: '' });
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
        <div>
          {
            savedCards.length > 0 && savedCards.map((element) => (
              <section key={ element.name }>
                <Card
                  cardName={ element.name }
                  cardDescription={ element.description }
                  cardAttr1={ element.first }
                  cardAttr2={ element.second }
                  cardAttr3={ element.third }
                  cardImage={ element.image }
                  cardRare={ element.select }
                  cardTrunfo={ element.checkbox }
                />
              </section>
            ))
          }
        </div>

      </main>
    );
  }
}

export default App;
