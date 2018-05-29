import React from 'react'
import { Card, Icon, Label } from 'semantic-ui-react'

const EpisodeCard = ({episode, series}) => (
    <Card>
        <Card.Content>
            <Card.Header><h4>{series.name}</h4></Card.Header>
            <Card.Meta>Ep # {episode.number} of {series.episodeCount} </Card.Meta>
            <Card.Description>
                <Label>Quality</Label>
                {series.stats.totalQuality}
            </Card.Description>
         </Card.Content>
         <Card.Content extra>
            <div>
                <Label>Rating/Share</Label>
                {episode.rating} / {episode.share}
            </div>
            <div>
                <Label>Buzz/Q/Fans</Label>
                {series.stats.buzz} / {series.stats.awareness} / {series.stats.fandom}
                <br/>
            </div>
         </Card.Content>
         <Card.Content extra>
            <div>
                {series.stats.flavors.map((f, i) => <Icon name={f.icon} color={f.color} size='large' key={i}/> )}
            </div>
         </Card.Content>
    </Card> 
)

export default EpisodeCard
