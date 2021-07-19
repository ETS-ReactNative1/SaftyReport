import React from 'react';
import { List } from 'react-native-paper';

function list(props) {
    return (
        <List.Section>
             <List.Item 
             title={props.name} 
             left={() => <List.Icon icon="rename-box" />} 
             />
            <List.Item
                title={props.email}
                left={() => <List.Icon icon="email" />}
            />
            <List.Item
                title={props.phone}
                left={() => <List.Icon icon="phone" />}
            />
            </List.Section>
    );
}

export default list;