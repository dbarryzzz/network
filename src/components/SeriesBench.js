import React from 'react';
import {Card, List, Label} from 'semantic-ui-react';

const SeriesBench = ({benchSeries}) => (
    <Card>
        <Card.Header><h4>Series Bench</h4></Card.Header>
        <Card.Meta>{benchSeries ?  benchSeries.length : 0} Shows</Card.Meta>
        <Card.Description>
                <List relaxed >
                    {benchSeries &&
                        benchSeries.map((s) => 
                            <List.Item key={s.id} >
                                <List.Content floated="left">
                                    <Label horizontal>Name</Label>
                                </List.Content>
                                <List.Content floated="left">
                                    {s.name}
                                </List.Content>
                            </List.Item>
                        )}
                </List>
         </Card.Description>
    </Card> 
)

export default SeriesBench;