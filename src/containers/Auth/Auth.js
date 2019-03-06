import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import classes from './Login.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import * as actions from '../../store/actions'


class login extends Component{
	state={
		username: '',
		password: '',
		localUID:''
	}


	inputChange=(event)=>{
		this.setState({[event.target.id]: event.target.value});
	}


	login=()=>{
		const signinURL='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC3_TY8oeL7ROyJK45ZwUponfp4KZDeXKs';
		const retrieveURL='https://smartdriverreact.firebaseio.com/user/'

		const data={
			email: this.state.username,
			password: this.state.password,
			returnSecureToken: true
		}


		axios.post(signinURL, data)
			.then(response=> {
				console.log(response.data);
				console.log('onAuth');
				alert('Successfully logged in');
				this.setState({localUID:response.data.localId});
				axios.get(retrieveURL+response.data.localId+'.json')
					.then(response=>{
						this.props.onAuth(this.state.localUID, response.data.levels);
					})
					.catch(err=>{
						console.log(err);
					})

				
			})
			.catch(err=>{
				alert(err.response.data.error.message);
			})

	}

	render(){
		return(
			<Container style={{width:"50%"}} >
		<Form >
        <FormGroup>
          <Label for="exampleEmail">Username</Label>
          <Input type="email" name="username" id="username" 
          			onChange={(event, name)=>{this.inputChange(event, name)}}
          			placeholder='Please enter your email'
          			value={this.state.username}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="password" 
          			placeholder="Please enter password"
          			onChange={(event, name)=>{this.inputChange(event, name)}}
          			value={this.state.password}/>
        </FormGroup>
        </Form>
		<div style={{'text-align':'center'}}>
          			<br /> 
        <Button  color="primary" onClick={this.login}>Login </Button> </div>
        
        <br /> <br /> <br /> 
       



        <p className={classes.register} > Do not have an account? Register <Link to="/register"> Here! </Link></p>
        </Container>
		)
	}
}



const mapDispatchToProps = dispatch => {
	return{
		onAuth: (user, levels)=> dispatch({type:actions.Login, user:user, levels:levels})
	};
}


export default connect(null,mapDispatchToProps)(login);