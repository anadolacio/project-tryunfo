import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCards: [],
  };

  // componentDidMount() {
  //   const getLocalStorage = JSON.parse(localStorage.getItem('myCards'));
  //   if (getLocalStorage !== null) {
  //     this.setState({
  //       savedCards: getLocalStorage,
  //     });
  //   }
  // }

  onInputChange = ({ target }) => {
    const { value, name } = target;
    // console.log(target);
    this.setState({
      [name]: value,
    }, this.validationFields);
  };

  validationFields = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;
    const maxLength = 90;
    const minLength = 0;
    const totalLength = 210;
    const validationName = cardName.length !== 0;
    const validationImage = cardImage.length !== 0;
    const validationSelect = cardRare.length !== '';
    const validationDescription = cardDescription.length !== 0;
    const validationFirst = minLength <= Number(cardAttr1)
    && maxLength >= Number(cardAttr1);
    const validationSecond = minLength <= Number(cardAttr2)
    && maxLength >= Number(cardAttr2);
    const validationThird = minLength <= Number(cardAttr3)
    && maxLength >= Number(cardAttr3);
    const validationTotal = Number(cardAttr1)
    + Number(cardAttr2) + Number(cardAttr3) <= totalLength;

    this.setState({
      isSaveButtonDisabled: !(validationName && validationImage
     && validationDescription && validationFirst && validationSecond
        && validationThird && validationSelect && validationTotal),
    });
  };

  // saveLocalStorage = () => {
  //   const { savedCards } = this.setState;
  //   localStorage.setItem('myCards', JSON.stringify(savedCards));
  // };

  findHasTrunfo = () => {
    const { savedCards } = this.state;
    const isAnyTrunfoCard = savedCards.some((element) => element.cardTrunfo === true);
    this.setState({ hasTrunfo: isAnyTrunfoCard });
  };

  onSaveButtonClick = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      savedCards,
    } = this.state;

    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }

    this.setState({
      savedCards: [...savedCards,
        { cardName,
          cardDescription,
          cardAttr1,
          cardAttr2,
          cardAttr3,
          cardImage,
          cardRare,
          cardTrunfo },
      ],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    }, this.findHasTrunfo);
  };

  removeCard = ({ target }) => {
    const { id } = target;
    // console.log(target);
    const { savedCards } = this.state;

    const filterCards = savedCards.filter((element) => element.cardName !== id);
    this.setState({
      savedCards: filterCards,
    });
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
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
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
        </section>
        <div>
          {
            savedCards.length > 0 && savedCards.map((element) => (
              <section key={ element.cardName }>
                <Card
                  cardName={ element.cardName }
                  cardDescription={ element.cardDescription }
                  cardAttr1={ element.cardAttr1 }
                  cardAttr2={ element.cardAttr2 }
                  cardAttr3={ element.cardAttr3 }
                  cardImage={ element.cardImage }
                  cardRare={ element.cardRare }
                  cardTrunfo={ element.cardTrunfo }
                />
                <button
                  type="button"
                  data-testid="delete-button"
                  id={ element.cardName }
                  onClick={ this.removeCard }
                >
                  Excluir
                </button>

              </section>
            ))
          }
        </div>

      </main>
    );
  }
}

export default App;
