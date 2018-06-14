import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Header, Segment, Rail, Button, Icon } from 'semantic-ui-react'

import EpisodeCard from './EpisodeCard';
import GameInfoCard from './GameInfoCard';
import EmptyTimeSlotCard from './EmptyTimeSlotCard';
import SeriesBench from './SeriesBench';
import AddEpisodeForm from './AddEpisodeForm';

import * as actions from '../actions';
import * as constants from '../constants';

class BigBoard extends Component{

    // componentDidMount(){
    //     this.props.init();
    // }

    processWeek(){
        this.props.runWeek(this.props.episodes, this.props.seriesById, this.props.gameInfo.activeWeek);
    }

    decrementWeek(){
        var newWeek = Math.max(this.props.gameInfo.activeWeek - 1, 1);
        this.props.changeWeek(newWeek);
    }

    incrementWeek(){
        var newWeek = Math.min(this.props.gameInfo.activeWeek + 1, this.props.gameInfo.totalWeeks);
        this.props.changeWeek(newWeek);
    }

    removeEpisode(episode){
        var week = this.props.gameInfo.activeWeek;
        this.props.clickRemoveEpisode(episode, week);
    }

    addEpisode(seriesId, day, time){
        var week = this.props.gameInfo.activeWeek;
        console.log(seriesId, day, time);
        var series = this.props.seriesById[seriesId];
        console.log(this.props.episodes);
        this.props.clickAddEpisode(series, week, day, time, this.props.episodes);
    }

    findBench(){
        var activeSeriesIds = this.props.episodes.map(e => e.seriesId);
        var allSeriesArray = Object.values(this.props.seriesById);
        return  allSeriesArray.filter(s => !activeSeriesIds.includes(s.id));
    }

    findOpenSpots(){
        // var slotMap = {};
        // this.props.episodes.forEach(ep => {
        //     var start = ep.time;
        //     for(var i = 0; i < ep.duration; i++){
        //         Object.assign(slotMap, {[ep.dayofWeek]: {[start + i] : true }});
        //     }
        // })
        // console.log(slotMap);
    }
    
    buildDailyRow(day, i){
        // TODO: make this less fugly
        var episodes = this.props.episodes.filter((ep) => ep.dayOfWeek == i);
        var epObj = {};
        var displayArray = [];
        episodes.forEach(ep => {           
            Object.assign(epObj, {[ep.time] : ep});
        });

        var t = 0;
        while(t < constants.times.length){
            var ep = epObj[t];
            if(ep !== undefined){
                displayArray[t] = <Grid.Column key={day + t} width={ep.duration * 2} >
                                    <EpisodeCard 
                                        episode={ep} 
                                        series={this.props.seriesById[ep.seriesId]}
                                        removeFunction = {this.removeEpisode.bind(this)}
                                        />
                                </Grid.Column>;
                t = t + ep.duration;        
            }else{
                displayArray[t] = <Grid.Column key={day + t} width={2}><EmptyTimeSlotCard /></Grid.Column>
                t = t+ 1;
            }
        }

        return displayArray;
    }

    render() {
        return (
            <div>
                <Segment>
                    <Header as='h2'>Schedule - Week {this.props.gameInfo.activeWeek}</Header>

                    <p className="App-intro">
                        Let's look at the big board!
                    </p>

                    <div>
                        <Button secondary icon labelPosition='left'
                            onClick={this.decrementWeek.bind(this)} 
                            disabled={this.props.gameInfo.activeWeek > 1 ? false : true}>
                            <Icon color='yellow' name="chevron left" />
                            Prev
                        </Button>

                        <Button primary 
                            onClick={this.processWeek.bind(this)}
                            disabled={this.props.weekInfo.aired ? true : false}>
                            Run Week # {this.props.gameInfo.activeWeek}
                        </Button>

                        <Button secondary icon labelPosition='right'
                            onClick={this.incrementWeek.bind(this)}
                            disabled={this.props.gameInfo.activeWeek < this.props.gameInfo.totalWeeks ? false : true} >
                            <Icon color='yellow' name="chevron right" />
                            Next
                        </Button>
                    </div>
                </Segment>

                <Segment>
                    <Grid divided celled container>
                        {/* Header line */}
                        <Grid.Row>
                            <Grid.Column width={2}>
                                {/* <h3>Day</h3> */}
                            </Grid.Column>
                            {constants.times.map(time =>
                                <Grid.Column key={time} width={2}>
                                    <h3>{time}</h3>
                                </Grid.Column>
                            )}   
                            <Grid.Column width={2}>
                                <h3>Totals</h3>
                             </Grid.Column>                   
                        </Grid.Row>

                        {/* Day by Day Line */}
                        {constants.weekdays.map((day, i) =>
                            (
                            <Grid.Row key={day}>
                                <Grid.Column width={2}>
                                    <h3>{day}</h3>
                                </Grid.Column>

                                {this.buildDailyRow(day, i)}

                                <Grid.Column width={2}>
                                    <h3>Stats Here</h3>
                                </Grid.Column>
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
                        <Segment>
                            <SeriesBench benchSeries={Object.values(this.findBench())} />
                        </Segment>
                        <Segment>
                            <AddEpisodeForm benchSeries={Object.values(this.findBench())} addFunction={this.addEpisode.bind(this)} />
                        </Segment>
                    </Rail>
                </Segment>      
            </div>
        )
    }
}

function selectEpisodes(episodesById, weekInfo){
    var episodes = [];
    if(weekInfo.episodes){
        episodes = weekInfo.episodes.map(id => episodesById[id]);
    }
    return episodes;
}

const mapStateToProps = (state) => {
    return  {
        episodes: selectEpisodes(state.allEpisodes.byId, state.weekInfo[state.gameInfo.activeWeek]),
        gameInfo: state.gameInfo,
        seriesById: state.allSeries.byId,
        weekInfo: state.weekInfo[state.gameInfo.activeWeek],
    }
}

const mapDispatchToProps  = (dispatch) =>{
    return {
        init: () => dispatch(actions.initGame()),
        runWeek: (activeEpisodes, seriesById, week) => dispatch(actions.runWeek(activeEpisodes, seriesById, week)),
        changeWeek: (newWeek) => dispatch(actions.changeWeek(newWeek)), 
        clickRemoveEpisode: (episode, week) => dispatch(actions.removeEpisode(episode, week)),
        clickAddEpisode: (series, week, day, time, fullWeekEpisodes) => dispatch(actions.addEpisode(series, week, day, time, fullWeekEpisodes)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BigBoard)
