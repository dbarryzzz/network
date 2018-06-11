import React from 'react';
import {Table, Icon, Popup, Header} from 'semantic-ui-react';

const SeriesBench = ({benchSeries}) => (   
    <div>   
        <Header as='h3'>Series Bench</Header>
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Duration</Table.HeaderCell>
                    <Table.HeaderCell>Ep Count</Table.HeaderCell>
                    <Table.HeaderCell>Info</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {benchSeries && 
                    benchSeries.map(s =>
                        <Table.Row key={s.id}>
                            <Table.Cell>{s.name}</Table.Cell>
                            <Table.Cell>{s.duration * 30}  min</Table.Cell>
                            <Table.Cell>{s.episodesAired} of {s.episodesOrdered}</Table.Cell>
                            <Table.Cell>
                                <Popup 
                                    trigger={<Icon name="info circle" color="blue" />}
                                    content="More info about the show" />
                            </Table.Cell>
                        </Table.Row>
                    )
                }
            </Table.Body>
        </Table>
    </div>
)

export default SeriesBench;