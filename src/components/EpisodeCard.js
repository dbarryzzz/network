import React from 'react'

import { Card, Icon, Label, Button, Popup } from 'semantic-ui-react'

const episodeAired = (ep) => {return ep.rating != null ? true : false};

const EpisodeCard = ({ episode, series, removeFunction }) => (
    <Card>
        <Card.Content>
            <Card.Header><h4>{series.name}</h4></Card.Header>
            <Card.Meta>Ep # {episode.number} of {series.episodesOrdered} </Card.Meta>
            <Card.Description>
                {/* <Label basic color='blue'>Quality</Label>
                {series.stats.totalQuality} */}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div>
                {series.stats.flavors.map((f, i) => <Icon name={f.icon} color={f.color} size='large' key={i} />)}
            </div>
        </Card.Content>
        <Card.Content extra>
            <div>
                <Label basic color='blue'>Rating/Share</Label>
                {episode.rating} / {episode.share}
            </div>
            <div>
                <Label basic color='blue'>Buzz/Q/Fans</Label>
                {series.stats.buzz} / {series.stats.awareness} / {series.stats.fandom}
                <br />
            </div>
        </Card.Content>

        <Card.Content>
            <Popup
                trigger={<Button basic icon='trash' color='black' 
                    disabled={episodeAired(episode)} 
                    onClick={() => removeFunction(episode)} />}               
                content='Remove from week'
            />
            <Popup
                trigger={<Button basic icon='recycle' color='green'
                disabled={episodeAired(episode)} />}
                content='Air a rerun'
            />        
            
        </Card.Content>
    </Card>
)

export default EpisodeCard;
