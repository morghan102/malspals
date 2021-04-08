import React, { Component } from "react";
import Directory from './DirectoryComponent';
import { SERVICES } from '../shared/services';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: SERVICES
        };
    }

    render() {
        return <Directory services={this.state.services} />;
    }
}

export default Main;