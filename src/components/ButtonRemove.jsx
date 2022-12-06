import React from 'react';
import PropTypes from 'prop-types';

class ButtonRemove extends React.Component {
  render() {
    const { removeCard } = this.props;
    return (
      <button type="button" data-testid="delete-button" onClick={ removeCard }>
        Excluir
      </button>
    );
  }
}

ButtonRemove.propTypes = {
  removeCard: PropTypes.func.isRequired,
};

export default ButtonRemove;
