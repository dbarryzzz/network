import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Table, Segment, Header, Icon} from 'semantic-ui-react'

class SeriesBoard extends Component{


    render(){

        return (
            <div>
                <Segment>
                    <Header as='h2'>Active Series</Header>
                </Segment>

                <Segment>
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Network</Table.HeaderCell>
                                <Table.HeaderCell>Duration</Table.HeaderCell>
                                <Table.HeaderCell>Seasons</Table.HeaderCell>
                                <Table.HeaderCell>Premier Year</Table.HeaderCell>
                                <Table.HeaderCell>Ep Aired</Table.HeaderCell>
                                <Table.HeaderCell>Ep Ordered</Table.HeaderCell>
                                <Table.HeaderCell>Writing</Table.HeaderCell>
                                <Table.HeaderCell>Cast</Table.HeaderCell>
                                <Table.HeaderCell>Production</Table.HeaderCell>
                                <Table.HeaderCell>Total Quality</Table.HeaderCell>
                                <Table.HeaderCell>Flavors</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {Object.values(this.props.seriesById).map(s =>
                                <Table.Row key={s.id}>
                                    <Table.Cell>{s.name}</Table.Cell>
                                    <Table.Cell>{s.networkId}</Table.Cell>
                                    <Table.Cell>{s.duration * 30}  min</Table.Cell>
                                    <Table.Cell>{s.seasons}</Table.Cell>
                                    <Table.Cell>{s.year}</Table.Cell>
                                    <Table.Cell>{s.episodesAired}</Table.Cell>
                                    <Table.Cell>{s.episodesOrdered}</Table.Cell>
                                    <Table.Cell>{s.stats.writing}</Table.Cell>
                                    <Table.Cell>{s.stats.cast}</Table.Cell>
                                    <Table.Cell>{s.stats.production}</Table.Cell>
                                    <Table.Cell>{s.stats.totalQuality}</Table.Cell>
                                    <Table.Cell>{s.stats.flavors.map((f, i) => <Icon name={f.icon} color={f.color} size='large' key={i} />)}</Table.Cell>                                    
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </Segment>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return  {
        gameInfo: state.gameInfo,
        seriesById: state.allSeries.byId,
        weekInfo: state.weekInfo[state.gameInfo.activeWeek],
    }
}

const mapDispatchToProps  = (dispatch) =>{
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SeriesBoard)
