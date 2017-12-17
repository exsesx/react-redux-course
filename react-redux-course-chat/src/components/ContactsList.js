import React, { Component } from 'react';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import {
    amber500 as amber, blue500 as blue, cyan500 as cyan, deepPurple500 as deepPurple, green500 as green,
    indigo500 as indigo,
    lightBlue500 as lightBlue,
    orange500 as orange, pink500 as pink, purple500 as purple, red500 as red, teal500 as teal, yellow500 as yellow
} from "material-ui/styles/colors";

const colors = [red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, yellow, amber, orange];


export default class  extends Component {
    getConversationName(conversation) {
        if (conversation.name === null) {
            if (conversation.participants[0]._id === this.props.activeUser._id) {
                return conversation.participants[1].username;
            } else if (conversation.participants[1]._id === this.props.activeUser._id) {
                return conversation.participants[0].username;
            }
        } else {
            return conversation.name;
        }
    }

    render() {
        return (
            <List className="dialogs-list">
                <ListItem rightIcon={<ContentAdd color={pink}/>}
                          style={{color: "rgb(255, 64, 129)"}}
                          onClick={e => this.props.createConversation(e)}>Create Conversation</ListItem>
                {this.props.conversations.map((c, index) => {
                    return <ListItem
                        key={c._id}
                        disabled={false}
                        leftAvatar={<Avatar
                            backgroundColor={colors[index]}>{this.getConversationName(c).charAt(0)}</Avatar>}
                        onClick={e => this.props.selectParticipant(e, c, colors[index], "conversation")}>
                        {this.getConversationName(c)}
                    </ListItem>
                })}
            </List>
        )
    }
}