import React from 'react';
import * as actions from '../../store/actions'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

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




class toolbar extends React.Component {
  state = {
      isOpen: false
  };

  toggle=()=> {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render() {
  
    const log = this.props.username? <NavLink onClick={this.props.logout}>Logout</NavLink> : <NavLink tag={Link} to="/login"> Login</NavLink>;

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={Link} to="/"> Smart Driver </NavbarBrand> 
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/ranking">Ranking</NavLink>
              </NavItem>
              <NavItem>
                {log}
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
    username: state.localUID
  }
}

const mapDispatchToProps = dispatch=>{
  return{
    logout: ()=> dispatch({type: actions.Logout})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toolbar);
