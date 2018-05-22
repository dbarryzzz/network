import React from 'react'
import { Card } from 'semantic-ui-react'

const EpisodeCard = ({episode}) => (
    <Card>
        <Card.Header><h4>{episode.series.name}</h4></Card.Header>
        <Card.Meta>Ep # {episode.number}</Card.Meta>
        <Card.Description>
            {episode.prevRating} Rating
            <br/>
            {episode.prevShare} Share
         </Card.Description>
    </Card> 
)

export default EpisodeCard
