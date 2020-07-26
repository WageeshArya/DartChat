import React from 'react';
import './Footer.scss';
import github from '../../icons/github-logo.svg';
export const Footer = () => {
  return (
    <div className="footer">
      <a className="githubLink" href="https://github.com/WageeshArya"><img src={github} alt="Link to github" /></a><span>@ Wageesh Arya</span>
    </div>
  )
}

export default Footer;