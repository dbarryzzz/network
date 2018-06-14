import React from 'react';
import {Table, Icon, Popup, Header, List} from 'semantic-ui-react';

const MoreInfo = ({series}) => (
    <List>
        <List.Item>
            <List.Content>
                <List.Header>Quality</List.Header>
                <List.Description>{series.stats.totalQuality}</List.Description>
            </List.Content>
        </List.Item>
        <List.Item>
            <List.Content>
                <List.Header>Buzz/Q/Fans</List.Header>
                <List.Description>{series.stats.buzz} / {series.stats.awareness} / {series.stats.fandom}</List.Description>
            </List.Content>
        </List.Item>
        <List.Item>
            <List.Content>
                <List.Header>Flavor</List.Header>
                <List.Description>{series.stats.flavors.map((f, i) => <Icon name={f.icon} color={f.color} size='large' key={i} />)}</List.Description>
            </List.Content>
        </List.Item>
    </List>
)

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
                                    content={<MoreInfo series = {s} />} 
                                />
                            </Table.Cell>
                        </Table.Row>
                    )
                }
            </Table.Body>
        </Table>
    </div>
)

export default SeriesBench;