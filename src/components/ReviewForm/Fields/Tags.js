import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectTag} from '../../../actions';
import {Label} from 'semantic-ui-react';
import classNames from 'classnames';

class Tag extends Component {
  render() {
    return this.props.tags.map((tag) => {
      const classes = classNames({tag: true, selected: tag.isSelected});

      // wrap each tag in a button for accessibility purporses
      return (
        <Label className={classes} key={tag.id} onClick={() => this.props.selectTag(tag.id)}>
          <button className="unstyled-btn" key={tag.id}>
            {tag.tag}
          </button>
        </Label>
      );
    });
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.nuReview.tags
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({selectTag}, dispatch);
};

const TagContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tag);

export default TagContainer;
