import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from "axios";

class Explore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            allowed: false,
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3003/auth/users')
            .then(res => this.setState({data: res.data}))
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3003/auth/signup', {
            user_email: e.target.email.value,
            user_firstname: e.target.firstname.value,
            user_lastname: e.target.lastname.value,
            user_pwd: e.target.pwd.value
        })
            .then((res) => console.log(res.data));

    }

    onLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3003/auth/login', {
            data: {
                user_email: e.target.email.value,
                user_pwd: e.target.pwd.value,
            },
            status: 200,
            statusText: 'Ok',
        })
            .then(res => {
                this.setState({
                    userId: res.data.userId,
                    token: res.data.token,
                    allowed: true
                });
                let authToken = res.data.token;
                this.setAuthToken(authToken);
            })


    }

    setAuthToken = (authToken) => {
        axios.interceptors.request.use(function (config) {

            config.headers.Authorization =  'Bearer ' + authToken;
            return config;
        });
    }






    render() {

         if(this.state.allowed && this.state.userId != null){
            return (
             <Redirect push to={{
                pathname: '/dashboard',
                state: {
                    userId: this.state.userId,
                    token: this.state.token,
                }
            }}>Redirection</Redirect>
            )
        }

        return(
            <div className="container">
                <h1>Bienvenue sur Social</h1>
                <div className="row">
                    <div className="col">
                        <label>S'inscrire</label>
                        <form
                            className="form__signup"
                            onSubmit={this.onSubmit}
                        >
                            <input placeholder="Email" type="text" name="email"/>
                            <input placeholder="First name" type="text" name="firstname"/>
                            <input placeholder="Last name" type="text" name="lastname"/>
                            <input placeholder="Password" type="password" name="pwd"/>
                            <input className="btn btn-primary" type="submit" name="Signup"/>
                        </form>
                    </div>
                    <div className="col">
                        <label>Se connecter</label>
                        <form
                            className="form__login"
                            onSubmit={this.onLogin}
                        >
                            <input placeholder="Email" type="text" name="email"/>
                            <input placeholder="Password" type="password" name="pwd"/>
                            <input className="btn btn-primary" type="submit" name="Login"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Explore;

