import React from 'react';
import PropTypes from 'prop-types';
import { CommittersTemplatePage  } from '../../templates/committers-page';

const OverViewPagePreview = ({ entry, getAsset, widgetFor }) => {
  // const data = entry.getIn(['data']).toJS();

  const entryPmc = entry.getIn(['data', 'pmc']);
  const pmc = entryPmc ? entryPmc.toJS() : [];

  const entryNonPmc = entry.getIn(['data', 'nonpmc']);
  const nonPmc = entryNonPmc ? entryNonPmc.toJS() : [];

  if (pmc) {
    return (
      <CommittersTemplatePage        
        pmcTitle={entry.getIn(['data', 'pmcTitle'])}
        nonpmcTitle={entry.getIn(['data', 'nonpmcTitle'])}
        video={entry.getIn(['data', 'video'])}
        pmc={pmc}
        nonpmc={nonPmc}
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
