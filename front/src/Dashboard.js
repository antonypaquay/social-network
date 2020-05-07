import React, {Component, Fragment} from "react";
import axios from "axios";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feeds: ""
        }

    }

    componentDidMount() {
        axios.get('http://localhost:3003/dashboard')
            .then(res => this.setState({feeds: res.data}))
    }

    sendPost = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3003/dashboard', {
            data: {
                content: e.target.content.value,
                token: this.props.location.state.token
            },
            status: 201,
            statusText: "Ok"
        })
            .then((res) => console.log(res));
    }

    render(){
        const obj = this.state.feeds;
        const feedlist = Object.keys(obj).map((key, index) => {
            return (
                <li key={key}>{obj[key].content}</li>
            )
        })

        return(
            <Fragment>
                <h2>Dashboard</h2>
                <p>{JSON.stringify(this.props.location)}</p>
                <form onSubmit={this.sendPost}>
                    <textarea name="content" placeholder="écrire un post"></textarea>
                    <input type="submit" name="send"/>
                </form>
                <ul>
                    {feedlist}
                </ul>
            </Fragment>
        )
    }
}

export default Dashboard;