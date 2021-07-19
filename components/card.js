import React from 'react';

import { Card, Button, Title, Paragraph } from 'react-native-paper';

import { images, SIZES, COLORS } from '../constants';

function card(props) {
    return (
        <Card style={{margin:5}}>
          <Card.Cover source={props.img} />
          <Card.Title title={props.title} subtitle={props.name} />
          <Card.Content>
            <Paragraph>{props.contents}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>More</Button>
          </Card.Actions>
        </Card>
    );
}

export default card;