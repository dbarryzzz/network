import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

import * as constants from '../constants';

const buildOptions = (optionsArray) => (
    optionsArray.map((o, i) => (
        {
            key: o,
            text: o,
            value: i
        }))
);

const buildSeriesOptions = (seriesArray) => (
    seriesArray.map(s => (
        { key: s.id, text: s.name, value: s.id }
    ))
)

class AddEpisodeForm extends Component {
    //TODO: investigate stateless/redux options 

    state = {seriesId: null, date: null, time: null, incomplete: false, overTime: false};

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value, incomplete: false, overTime: false });
    }


    handleSubmit = () => {
        console.log(this.state);
        if(this.state.seriesId !== null 
                && this.state.date !== null 
                && this.state.time !== null){
            var series = this.props.benchSeries.filter(s => s.id === this.state.seriesId)[0];
            if(series.duration + this.state.time > constants.times.length){
                console.log(series.duration, this.state.time);
                this.setState({overTime: true})
            }else{
                this.props.addFunction(this.state.seriesId, this.state.date, this.state.time);
            }
        }else{
            console.log('bad');
            this.setState({incomplete: true})
        }

    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} error={this.state.overTime || this.state.incomplete} >
                <h3>Add Episode</h3>
                <Form.Select name="seriesId" label="Series"
                    options={buildSeriesOptions(this.props.benchSeries)} 
                    onChange={this.handleChange} />
                <Form.Select name="date" label="Date"
                    options={buildOptions(constants.weekdays)} 
                    onChange={this.handleChange}/>
                <Form.Select name="time" label="Start Time"
                    options={buildOptions(constants.times)} 
                    onChange={this.handleChange}/>
                <Message
                    error
                    header="Scheduling Failed"
                    content={this.state.overTime ? 'Ends Too Late' : 'All Fields Required'}
                     />

                <Button primary>Add</Button>
            </Form>
        )
    }
}

export default AddEpisodeForm;