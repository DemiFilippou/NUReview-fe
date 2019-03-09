import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {enterEnjoyment, enterLearning, enterRecommend} from '../../../actions';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

class AnonymousCheckbox extends Component {
  render() {
    return (
      <div className="slider-group">
        <div className="rating">
          <div className="question"> I enjoyed this co-op </div>
          <Slider
            {...this.props.sliderProps}
            value={this.props.enjoyment}
            onChange={(value) => this.props.enterEnjoyment(value)}
          />
        </div>
        <div className="rating">
          <div className="question"> I learned a lot on this co-op </div>
          <Slider
            {...this.props.sliderProps}
            value={this.props.learning}
            onChange={(value) => this.props.enterLearning(value)}
          />
        </div>
        <div className="rating">
          <div className="question"> I would recommend this co-op to a friend </div>
          <Slider
            {...this.props.sliderProps}
            value={this.props.recommend}
            onChange={(value) => this.props.enterRecommend(value)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const newReview = state.nuReview.newReview;
  return {
    enjoyment: newReview.enjoyment,
    learning: newReview.learning,
    recommend: newReview.recommend
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({enterEnjoyment, enterLearning, enterRecommend}, dispatch);
};

const AnonymousCheckboxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnonymousCheckbox);

export default AnonymousCheckboxContainer;
