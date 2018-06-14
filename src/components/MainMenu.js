import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';

import * as constants from '../constants';

export default class MainMenu extends Component {

    handleClick = (e, {name}) => this.props.updateFunction(name);

    render(){
        return (
            <Menu color='blue'>
                <Menu.Item name={constants.BIG_BOARD} 
                    active={this.props.activeBoard === constants.BIG_BOARD}
                    onClick={this.handleClick}>
                    Big Board 
                </Menu.Item>
                <Menu.Item name={constants.SERIES_BOARD} 
                    active={this.props.activeBoard === constants.SERIES_BOARD}
                    onClick={this.handleClick}>
                    Series Details
                </Menu.Item>
                <Menu.Item name={constants.PIPELINE_BOARD} 
                    active={this.props.activeBoard === constants.PIPELINE_BOARD}
                    onClick={this.handleClick}>
                    Dev Pipeline
                </Menu.Item>
            </Menu>
        )
    }
}