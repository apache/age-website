import * as React from "react";
import PropTypes from "prop-types";
import { index } from './styles/Title.module.scss';

const Content = ({ title }) => (
  <div className={index}>{title}</div>
);

Content.propTypes = {
 title: PropTypes.string
};


export default Content;
