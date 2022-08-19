import React from 'react';
import PropTypes from 'prop-types';
import { DocsTemplate  } from '../../templates/docs-template';

const OverViewPagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <DocsTemplate        
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}        
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

OverViewPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
  widgetFor: PropTypes.func,
};

export default OverViewPagePreview;
