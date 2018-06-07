import React from 'react';
import {Card, List, Label} from 'semantic-ui-react';

const GameInfoCard = ({gameInfo}) => (
    <Card>
        <Card.Header><h4>Game</h4></Card.Header>
        <Card.Meta>{gameInfo? gameInfo.playerId : 0 }</Card.Meta>
        <Card.Description>
                <List relaxed >
                    <List.Item>
                        <List.Content floated='left'>
                            <Label horizontal>Year</Label>
                            {gameInfo ? gameInfo.year : 1999}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content floated='left'>
                            <Label horizontal>Cash</Label>
                            {gameInfo ? gameInfo.money : 0}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content floated='left'>
                            <Label horizontal>Rank</Label>
                            #X of Y
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content floated='left'>
                            <Label horizontal>Weeks</Label>
                            {gameInfo.totalWeeks}
                        </List.Content>
                    </List.Item>

                </List>
         </Card.Description>
    </Card> 
)

export default GameInfoCard;