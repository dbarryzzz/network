import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Header, Segment, Rail } from 'semantic-ui-react'

import EpisodeCard from './EpisodeCard';
import GameInfoCard from './GameInfoCard';
import * as actions from '../actions';
import * as constants from '../constants';

class BigBoard extends Component{

    componentDidMount(){
        this.props.init();
        this.props.buildSlate();
    }
    
    buildNewSlate(){
        this.props.buildSlate();
    }

    getEpisodeCard(day, time) {
        var episode = this.props.episodes.filter((ep) => ep.dayOfWeek == day && ep.time == time);
        if(episode[0] != null){
            return  <EpisodeCard episode={episode[0]}/>
        }
        else {
            return (<div><h3>Open</h3></div>);
        }
    }

    render() {
        return (
            <div>
                <br/>
                <Header as='h2'>Schedule - Week {this.props.gameInfo.activeWeek} </Header>
                <p className="App-intro">
                Let's look at the big board!
                </p>

                {/* {this.props.episodes.length === 0 &&
                    <div className="container btn-toolbar">
                        <button className="btn btn-primary" type="button" onClick={this.buildNewSlate.bind(this)}>Start</button>
                    </div>
                } */}



                <div>
                    <Segment>
                        <Grid columns={7} divided celled container>
                            {/* Header line */}
                            <Grid.Row>
                                <Grid.Column>
                                    {/* <h3>Day</h3> */}
                                </Grid.Column>
                                {constants.times.map(time =>
                                    <Grid.Column key={time}>
                                        <h3>{time}</h3>
                                    </Grid.Column>
                                )}                     
                            </Grid.Row>

                            {/* Day by Day Line */}
                            {constants.weekdays.map((day, i) =>
                                <Grid.Row key={day}>
                                    <Grid.Column>
                                        <h3>{day}</h3>
                                    </Grid.Column>

                                    {constants.times.map((time, j) =>
                                        <Grid.Column key={day + time} >
                                            {this.getEpisodeCard(i,j)}
                                        </Grid.Column>
                                    )}
                                </Grid.Row>
                            )}
                        </Grid>

                        <Rail attached internal position='left'>
                            <br/>
                            <Segment>
                                Game Info
                                <GameInfoCard gameInfo={this.props.gameInfo} />
                            </Segment>
                        </Rail>
                        <Rail attached internal position='right'>
                            <br/>
                            <Segment>Other Shows</Segment>
                        </Rail>
                    </Segment>
                    
                </div>

               
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return  {
        episodes: state.episodes,
        gameInfo: state.gameInfo,
    }
}

const mapDispatchToProps  = (dispatch) =>{
    return {
        // functions here
        //randomShow: () => dispatch(actions.addRandomEpisode()),
        buildSlate: () => dispatch(actions.buildWholeNetwork()),
        init: () => dispatch(actions.initGame()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BigBoard)
