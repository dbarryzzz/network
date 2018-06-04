import React from 'react';
import {Card, List, Label} from 'semantic-ui-react';

const GameInfoCard = ({gameInfo}) => (
    <Card>
        <Card.Header><h4>Game</h4></Card.Header>
        <Card.Meta>{gameInfo? gameInfo.playerId : 0 }</Card.Meta>
        <Card.Description>
                <List floated='left' relaxed >
                    <List.Item>
                        <Label horizontal>Year</Label>
                        {gameInfo ? gameInfo.year : 1999}
                    </List.Item>
                    <List.Item>
                        <Label horizontal>Money</Label>
                        {gameInfo ? gameInfo.money : 0}
                    </List.Item>
                    <List.Item>
                        <Label horizontal>Rank</Label>
                        #X of Y
                    </List.Item>
                    <List.Item>
                        <Label horizontal>Total Weeks</Label>
                        {gameInfo.totalWeeks}
                    </List.Item>

                </List>
         </Card.Description>
    </Card> 
)

export default GameInfoCard;