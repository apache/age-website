import * as React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export const HTMLContent = ({ content, className }) => (
  <>
    <ReactMarkdown className={className} rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
  </>
);

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
