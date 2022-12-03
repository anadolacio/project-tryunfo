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
    isSaveButtonDisabled: true,
  };

  validationFields = () => {
    const { name, image, description, first, second, third } = this.state;
    const maxLength = 90;
    const minLength = 0;
    const totalLength = 210;
   const validationName = name.length !== 0;
   const validationImage = image.length !== 0;
   const validationDescription = description.length !== 0;
   const validationFirst = minLength < first.length || maxLength > first.length;
   const validationSecond = minLength < second.length || maxLength > second.length;
   const validationThird = minLength < third.length || maxLength > third.length;
   const validationTotal = first.length + second.length + third.length < totalLength;

   this.setState({
    isSaveButtonDisabled: !(validationName && validationImage
      && validationDescription && validationFirst && validationSecond
       && validationThird && validationTotal),
   });
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.validationFields);
  };

  render() {
    const {
      name,
      description, first, second, third, image, select, checkbox } = this.state;
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
