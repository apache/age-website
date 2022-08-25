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
                <Link className="navbar-item" to="/download">
                  Download
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link className="navbar-item" to="/release-notes">
                  Release Notes
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Community">
              <Menu.Item>
                <Link className="navbar-item" to="/joinus">
                  Join AGE Community
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
                  Developer Guideline
                </Link>
              </Menu.Item>
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
            <Menu.SubMenu title="Documentation">
              <Menu.Item>
                <a href="/age-manual/master/index.html" className="navbar-item">
                  Apache AGE Manual
                </a>
              </Menu.Item>
            </Menu.SubMenu>
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
                <Link className="navbar-item" to="/download">
                  Download
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link className="navbar-item" to="/release-notes">
                  Release Notes
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Community">
              <Menu.Item>
                <Link className="navbar-item" to="/joinus">
                  Join AGE Community
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
                  Developer Guideline
                </Link>
              </Menu.Item>
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
            <Menu.SubMenu title="Documentation">
              <Menu.Item>
                {/* <Link className="navbar-item" to="/age-manual">
                  Apache AGE Manual
                </Link> */}
                <a href="/age-manual/master/index.html" className="navbar-item">
                  Apache AGE Manual
                </a>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
        <div className={styles.Right}>
          <Link className={styles.Download} to="/download">
            Download AGE
          </Link>
        </div>
        <div className={styles.MenuToggle}>
          <button
            className={`${styles.Toggle} ${
              menuToggle === 'toggled' ? styles.Toggled : ''
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
      </div>
    </nav>
  );
};

export default Navbar;
