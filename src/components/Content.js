import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// CSS 스타일 임포트
import '../../src/components/styles/Blog-post.scss';

export const HTMLContent = ({ content, className }) => (
  <>
    <ReactMarkdown className={`${className} markdownStyle`} rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
  </>
);

const Content = ({ content, className }) => (
  <div className={`${className} contentStyle`}>{content}</div>
);

// Prop 타입 정의
Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
