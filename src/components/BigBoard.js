import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Header, Segment, Rail, Button } from 'semantic-ui-react'

import EpisodeCard from './EpisodeCard';
import GameInfoCard from './GameInfoCard';
import * as actions from '../actions';
import * as constants from '../constants';

class BigBoard extends Component{

    componentDidMount(){
        this.props.init();
    }

    processWeek(){
        this.props.runWeek(this.props.episodes, this.props.seriesById, this.props.gameInfo.activeWeek);
    }
    
    buildDailyRow(day, i){
        var episodes = this.props.episodes.filter((ep) => ep.dayOfWeek == i);
        var sortedEps = episodes.sort((a,b) => a.time - b.time);
        return sortedEps.map(ep => 
                        <Grid.Column key={day + ep.time} width={ep.duration * 2} >
                            <EpisodeCard 
                                episode={ep} 
                                series={this.props.seriesById[ep.seriesId]}/>
                        </Grid.Column>   
        );
         
    }

    render() {
        return (
            <div>
                <br/>
                <Header as='h2'>Schedule - Week {this.props.gameInfo.activeWeek} </Header>
                <p className="App-intro">
                Let's look at the big board!
                </p>

                <Button primary onClick={this.processWeek.bind(this)}>Run Week</Button>

                <div>
                    <Segment>
                        <Grid divided celled container>
                            {/* Header line */}
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    {/* <h3>Day</h3> */}
                                </Grid.Column>
                                {constants.times.map(time =>
                                    <Grid.Column key={time} width={2}>
                                        <h3>{time}</h3>
                                    </Grid.Column>
                                )}                     
                            </Grid.Row>

                            {/* Day by Day Line */}
                            {constants.weekdays.map((day, i) =>
                                (
                                <Grid.Row key={day}>
                                    <Grid.Column width={4}>
                                        <h3>{day}</h3>
                                    </Grid.Column>

                                   {this.buildDailyRow(day, i)}
                                </Grid.Row>
                                )
                            )}
                        </Grid>

                        <Rail attached internal position='left'>
                            <br/>
                            <Segment>
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

function selectEpisodes(episodesById, weekInfo){
    return weekInfo.episodes.map(id => episodesById[id]);
}

const mapStateToProps = (state) => {
    return  {
        episodes: selectEpisodes(state.allEpisodes.byId, state.weekInfo[state.gameInfo.activeWeek]),
        gameInfo: state.gameInfo,
        seriesById: state.allSeries.byId,
    }
}

const mapDispatchToProps  = (dispatch) =>{
    return {
        init: () => dispatch(actions.initGame()),
        runWeek: (activeEpisodes, seriesById, week) => dispatch(actions.runWeek(activeEpisodes, seriesById, week)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BigBoard)
