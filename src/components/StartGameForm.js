import React, { Component } from 'react';
import { Form, Button, Message, Container } from 'semantic-ui-react';

const opponentOptions = [
    {key: '0', text:'0', value: 0},
    {key: '1', text:'1', value: 1},
    {key: '2', text:'2', value: 2},
    {key: '3', text:'3', value: 3},
    {key: '4', text:'4', value: 4},
]

class StartGameForm extends Component {
    //TODO: investigate stateless/redux options 

    state = {playerId: null,  startYear: 2000, numOpponents: 3, incomplete: false};

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value, incomplete: false });
    }

    handleSubmit = () => {
        console.log(this.state);
        if(this.state.playerId !== null 
                && this.state.numOpponents !== null 
                && this.state.startYear !== null){
                    this.props.startGame(this.state.playerId, this.state.startYear, this.state.numOpponents);
        }else{
            this.setState({incomplete: true})
        }
    }

    render() {
        return (
            <Container textAlign='left'>
                <Form onSubmit={this.handleSubmit} error={this.state.incomplete} >
                    <h3>Start a New Game</h3>
                    <Form.Input name="playerId" label="Player Network" inline
                        onChange={this.handleChange} />
                    <Form.Select name="numOpponents" label="Number of Opponents" inline
                        options={opponentOptions} 
                        onChange={this.handleChange}/>
                    <Message
                        error
                        header="Failure"
                        content='All Fields Required'
                        />

                    <Button primary>Start</Button>
                </Form>
            </Container>
        )
    }
}

export default StartGameForm;