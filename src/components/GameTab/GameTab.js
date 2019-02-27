import React, {Component} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink,  Container} from 'reactstrap';
import Games from './Games/Games';


class LevelTab extends Component {
   state = {
      activeTab: '1'
   };
  

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  
  render() {
      
    const navItems=[];
    const tabItems=[];
    const levels=['Beginner', 'Intermediate', 'Advanced','Expert'];
    const levelColor={

        3: '#ECE2D0',
        1: '#b7d7e8',
        4: 'pink',
        2: '#D5F5E3'
    };

    //to populate 3 level tab links
    for(let i=1; i<5; i++){
      navItems.push(
            <NavItem key={i} style={{backgroundColor: levelColor[i]}}>
            <NavLink style={{backgroundColor: levelColor[i]}}
             
              onClick={() => { this.toggle(String(i)); }}
            >
              {levels[i-1]}
            </NavLink>
          </NavItem>
      )
      
      tabItems.push(
        <TabPane key={i} tabId= {String(i)} style={{backgroundColor: levelColor[i]}}>
          <br />
            <Container style={{width: '100%' , margin: '0 auto'}}>
              <Games key={i} level={i}/>
            </Container>
          <br />
          </TabPane>
      )
    }


    return (
      <Container>
        <Nav tabs>
            {navItems}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
            {tabItems}
        </TabContent>
      </Container>
  
    );
  }
}




export default LevelTab;