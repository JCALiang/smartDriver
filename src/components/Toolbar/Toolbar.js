import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class toolbar extends React.Component {
  state = {
      isOpen: false
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render() {
  
    const log = this.props.username? 'Logout' : 'Login'

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Link to="/"> Smart Driver </Link> 
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/ranking"><NavLink to>Ranking</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/login"><NavLink>{log}</NavLink></Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  About
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Rules
                  </DropdownItem>
                  <DropdownItem>
                    <a href="https://github.com/JCALiang/smartDriver" > Github </a>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return{
    username: state.user
  }
}


export default connect(mapStateToProps)(toolbar);
