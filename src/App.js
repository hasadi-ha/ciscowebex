import React, {Component} from 'react';
import './App.css';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import SpaceWidget from './SpaceWidget.jsx';

function getUrlVars() {
    var vars = {};
    var parts = window
        .location
        .href
        .replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
    return vars;
}

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            ready: false,
            token: null
        };

        this.handleOnClick = this
            .handleOnClick
            .bind(this);
    }

    componentDidMount() {
        // this     .callBackendAPI()     .then(res => this.setState({data:
        // res.express}))     .catch(err => console.log(err));
    }

    // callBackendAPI = async() => {     const response = await
    // fetch('/express_backend');     const body = await response.json();     if
    // (response.status !== 200) {         throw Error(body.message)     } return
    // body; }

    handleOnClick() {
        this.setState(prevState => ({
            ready: !prevState.ready,
            token: getUrlParam('access_token', 'Empty')
        }));

    }

    render() {
        return (
            <div className="App">
                <Button
                    type="primary"
                    shape="circle"
                    icon="wechat"
                    onClick={this.handleOnClick}/> {this.state.ready && (< SpaceWidget token = {
                    this.state.token
                } />)
}
            </div>
        );
    }
}
export default App;