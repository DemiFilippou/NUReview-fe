import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addPosition, enterPosition, getReviews} from '../../actions';

class PositionFilter extends Component {
  handleChange = (e, {value}) => {
    this.props.filterReviews(this.props.companyId, {positionId: value});
  };

  render() {
    const positions = this.props.positions.map((position) => ({
      key: position.id,
      value: position.id,
      text: position.title
    }));

    return (
      <Dropdown
        clearable
        options={positions}
        placeholder="All Titles"
        search
        selection
        fluid
        onChange={this.handleChange}
        className="position-filter"
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    positions: state.nuReview.positions,
    positionId: state.nuReview.newReview.positionId,
    companyId: state.nuReview.company.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addPosition, enterPosition, filterReviews: getReviews}, dispatch);
};

const PositionFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PositionFilter);

export default PositionFilterContainer;
