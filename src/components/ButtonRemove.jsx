import React from 'react';

class ButtonRemove extends React.Component {
  render() {
    return (
      <button type="button" data-testid="delete-button" onClick={ removeCard }>
        Excluir
      </button>
    );
  }
}

export default ButtonRemove;
