import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Menu } from 'antd';
import { MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// img
import logoImage from '../../static/img/logo.png';

// styles
import * as styles from './styles/Navbar.module.scss';

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState('untogle');
  return (
    <nav className={styles.root} role="navigation" aria-label="main-navigation">
      <div className={styles.Nav}>
        <div className={styles.Left}>
          <Link to="/" className={styles.Logo} title="Logo">
            <img src={logoImage} alt="age logo"></img>
          </Link>
        </div>
        <div className={styles.Menu}>
          <Menu
            mode="horizontal"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Menu.SubMenu title="Get Started">
              <Menu.Item>
                  <Link className="navbar-item" to="/getstarted/quickstart">
                    Quick Start
                  </Link>
                </Menu.Item>
                <Menu.Item>
                <Link className="navbar-item" to="/faq">
                  F A Q
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Apache AGE">
              <Menu.Item>
                <Link className="navbar-item" to="/overview">
                  Overview
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link className="navbar-item" to="/team">
                  Team
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link className="navbar-item" to="/release-notes">
                  Release Notes
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link className="navbar-item" to="/blog">
                  Blog
                  </Link>
              </Menu.Item>

            </Menu.SubMenu>
            <Menu.SubMenu title="Community">
              <Menu.Item>
                <Link className="navbar-item" to="/joinus">
                  Join AGE Community
                </Link>
              </Menu.Item>
              {/*<Menu.Item>
                <Link
                  className="navbar-item"
                  target="_blank"
                  to="https://discord.com/invite/NMsBs9X8Ss/"
                >
                  AGE Discord
                </Link>
              </Menu.Item>*/}
              <Menu.Item>
                <Link
                  className="navbar-item"
                  target="_blank"
                  to="https://www.reddit.com/r/apacheage/"
                  rel="noopener noreferrer"
                >
                  AGE Forum
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className="navbar-item"
                  target="_blank"
                  to="https://github.com/apache/age/projects"
                >
                  AGE Project
                </Link>
              </Menu.Item>

            </Menu.SubMenu>
            <Menu.SubMenu title="Contribution">
              <Menu.Item>
                <Link className="navbar-item" to="/contribution/how">
                  How to contribute
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link className="navbar-item" to="/contribution/guide">
                  Code Convention
                </Link>
              </Menu.Item>
              {/* 더 이상 운영 안함
              <Menu.Item>
                <Link className="navbar-item" to="/contribution/volunteers">
                  Volunteer Guideline
                </Link>
              </Menu.Item>*/}
              <Menu.Item>
                <Link className="navbar-item" to="/contribution/requirements">
                  Committer Requirements
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link className="navbar-item" to="/contribution/process">
                  Release Process
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Doc">
              <Menu.Item>
                <a href="https://age.apache.org/age-manual/master/intro/overview.html" target="_blank" className="navbar-item">
                  Introduction
                </a>
              </Menu.Item>
              <Menu.Item>
                <a href="https://age.apache.org/age-manual/master/intro/setup.html" target="_blank" className="navbar-item">
                  Setup
                </a>
              </Menu.Item>
              <Menu.Item>
                <a href="https://age.apache.org/age-manual/master/clauses/match.html" target="_blank" className="navbar-item">
                  Clauses
                </a>
              </Menu.Item>
              <Menu.Item>
                <a href="https://age.apache.org/age-manual/master/functions/predicate_functions.html" target="_blank" className="navbar-item">
                  Functions
                </a>
              </Menu.Item>
              <Menu.Item>
                <a href="https://age.apache.org/age-manual/master/advanced/advanced_overview.html" target="_blank" className="navbar-item">
                  AGE Beyond Cypher
                </a>
              </Menu.Item>
            </Menu.SubMenu>

            {/* 블로그 페이지:임시 제외
            <Menu.Item key="Blog">
              <a className="navbar-item" href="https://apache-age.medium.com/" target="_blank" rel="noopener noreferrer">
                Blog
              </a>
            </Menu.Item>
            */}



            {/* 상단 메뉴 변경: Apache AGE GitHub 
            <Menu.SubMenu title={<a href="https://github.com/apache/age" target="_blank" rel="noopener noreferrer">Apache AGE GitHub</a>}>
            {/* GitHub 메뉴
              <Menu.Item>
                <a href="https://github.com/apache/age" target="_blank">                  
                  AGE
                </a>        
              </Menu.Item>
              <Menu.Item>
                <a href="https://github.com/apache/age-viewer" target="_blank">                  
                  AGE Viewer
                </a>        
              </Menu.Item>
            </Menu.SubMenu> */}
          </Menu>
        </div>

        <div className={styles.HamburgerMenu}>
          <Menu
            className={styles.InlineMenu}
            style={{
              width: '100%',
              display: menuToggle === 'toggled' ? 'inline' : 'none',
            }}
            mode="inline"
          >
           <Menu.SubMenu title="Get Started">
              <Menu.Item>
                  <Link className="navbar-item" to="/getstarted/quickstart">
                    Quick Start
                  </Link>
                </Menu.Item>
                <Menu.Item>
                <Link className="navbar-item" to="/faq">
                  F A Q
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Apache AGE">
              <Menu.Item>
                <Link className="navbar-item" to="/overview">
                  Overview
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link className="navbar-item" to="/team">
                  Team
                </Link>
              </Menu.Item>
              <Menu.Item> 
                <Link className="navbar-item" to="/release-notes">
                  Release Notes
                </Link>
              </Menu.Item>
              <Menu.Item> 
                <Link className="navbar-item" to="/blog">
                  Blog
                  </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Community">
              <Menu.Item>
                <Link className="navbar-item" to="/joinus">
                  Join AGE Community
                </Link>
              </Menu.Item>
              {/*<Menu.Item>
                <Link
                  className="navbar-item"
                  target="_blank"
                  to="https://discord.com/invite/NMsBs9X8Ss/"
                >
                  AGE Discord
                </Link>
              </Menu.Item>*/}
              <Menu.Item>
                <Link
                  className="navbar-item"
                  target="_blank"
                  to="https://www.reddit.com/r/apacheage/"
                  rel="noopener noreferrer"
                >
                  AGE Forum
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className="navbar-item"
                  target="_blank"
                  to="https://github.com/apache/age/projects"
                >
                  AGE Project
                </Link>
              </Menu.Item>

            </Menu.SubMenu>
            <Menu.SubMenu title="Contribution">
              <Menu.Item>
                <Link className="navbar-item" to="/contribution/how">
                  How to contribute
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link className="navbar-item" to="/contribution/guide">
                  Code Convention
                </Link>
              </Menu.Item>
              {/* 더 이상 운영 안함
              <Menu.Item>
                <Link className="navbar-item" to="/contribution/volunteers">
                  Volunteer Guideline
                </Link>
              </Menu.Item>*/}
              <Menu.Item>
                <Link className="navbar-item" to="/contribution/requirements">
                  Committer Requirements
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link className="navbar-item" to="/contribution/process">
                  Release Process
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Doc">
              <Menu.Item>
                <a href="https://age.apache.org/age-manual/master/intro/overview.html" target="_blank" className="navbar-item">
                  Introduction
                </a>
              </Menu.Item>
              <Menu.Item>
                <a href="https://age.apache.org/age-manual/master/intro/setup.html" target="_blank" className="navbar-item">
                  Setup
                </a>
              </Menu.Item>
              <Menu.Item>
                <a href="https://age.apache.org/age-manual/master/clauses/match.html" target="_blank" className="navbar-item">
                  Clauses
                </a>
              </Menu.Item>
              <Menu.Item>
                <a href="https://age.apache.org/age-manual/master/functions/predicate_functions.html" target="_blank" className="navbar-item">
                  Functions
                </a>
              </Menu.Item>
              <Menu.Item>
                <a href="https://age.apache.org/age-manual/master/advanced/advanced_overview.html" target="_blank" className="navbar-item">
                  AGE Beyond Cypher
                </a>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item>
                <Link
                  className="navbar-item"
                  target="_blank"
                  to="/download"
                >
                  Downloads
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className="navbar-item"
                  target="_blank"
                  to="https://github.com/apache/age"
                  rel="noopener noreferrer"
                >
                  Apache AGE GitHub
                </Link>
              </Menu.Item>
          </Menu>
        </div>

        <div className={styles.Right}>
          <Link className={styles.Download} to="/download">
            Downloads
          </Link>
        </div>
        <div className={styles.MenuToggle}>
          <button
            className={`${styles.Toggle} ${menuToggle === 'toggled' ? styles.Toggled : ''
              }`}
            onClick={() => {
              const state = menuToggle === 'toggled' ? 'untogle' : 'toggled';
              setMenuToggle(state);
            }}
          >
            {menuToggle === 'toggled' ? (
              <MenuUnfoldOutlined />
            ) : (
              <MenuOutlined />
            )}
          </button>
        </div>
        
        <div className={styles.Right}>
        <a className={styles.Link} href="https://github.com/apache/age" target="_blank" rel="noopener noreferrer">
          <img src="/img/icon-github.png" alt="GitHub" style={{ marginRight: '8px' }} />
            Apache AGE GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
