import React, {Component} from 'react';
import {Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios'
import {Alert} from 'reactstrap'

export default class register extends Component{
	state={
		message: null,
		aColor: null,
		username: "",
		password: "",
		password2: "",
	}

	

	register=()=>{
		if(this.state.password !== this.state.password2){
		    this.setState({message:'Please check your password', aColor: 'danger'});
			return 
		}

		const data={
			email: this.state.username,
			password: this.state.password,
			returnSecureToken: true
		};



		axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC3_TY8oeL7ROyJK45ZwUponfp4KZDeXKs', data)
			.then( response => {
						this.setState({message: 'Success fully registered, please login now!', aColor: 'success'});

						const data={levels:[0]};
						const setURL= 'https://smartdriverreact.firebaseio.com/user/'+response.data.localId+'.json';
						axios.patch(setURL, data)
							.then(response=> console.log(response))
							.catch(err=> console.log('error'))
						
			})

			.catch(err=>{
				console.log(err.response);
				this.setState({message:  err.response.data.error.message, aColor:'danger'});
			});
			

	}

	inputChange=(event)=>{
		this.setState({[event.target.name]: event.target.value})
	}

	render(){

		const banner= this.state.message ? <Alert color={this.state.aColor}> {this.state.message} </Alert> : null;

		return(
			<Container style={{width:"50%"}} >
			{banner}
		<Form action={this.login} >
        <FormGroup>
          <Label for="email">Username</Label>
          <Input type="email" name="username" id="user" 
          			onChange={(event, name)=>{this.inputChange(event, name)}}
          			placeholder='Please enter your email as username'
          			value={this.state.username}/>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" 
          			placeholder='Please set a password'
          			onChange={(event, name)=>{this.inputChange(event, name)}}
          			value={this.state.password}/>
          			<br/>
          <Input type="password" name="password2" id="password2" 
 					placeholder="Please enter your password again here"
          			onChange={(event, name)=>{this.inputChange(event, name)}}
          			value={this.state.password2}/>
          
         </FormGroup>
			</Form>
         <div style={{'text-align':'center'}}>
          			<br /> <br/> <br/>
        <Button  color="primary" onClick={this.register}>Register </Button> </div>
        
        
        
        
        <br />
        <br />
        </Container>
		)
	}
}
