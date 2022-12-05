import React from 'react';

class ButtonRemove extends React.Component {
  render() {
    return (
      <div>
        <button type="submit" data-testid="delete-button">
          Excluir
        </button>
      </div>
    );
  }
}

export default ButtonRemove;
