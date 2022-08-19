import React from 'react';
import PropTypes from 'prop-types';
import { OverviewTemplate } from '../../templates/overview-page';

const OverViewPagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <OverviewTemplate
        bannerImg={data.bannerImg}
        bannerContents={widgetFor('bannerContents')}
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
        subcontent={widgetFor('subcon')}
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
