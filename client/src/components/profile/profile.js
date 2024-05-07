import React from 'react';
import { View, Text } from 'react-native';
import { Appbar, Avatar, Card, Title, Paragraph } from 'react-native-paper';

const ProfilePage = () => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <Card style={{ marginVertical: 16, padding: 16 }}>
        <Card.Content>
          <Title>Natalie Vimmer</Title>
          <Paragraph>Vimalie@gmail.com</Paragraph>
          <Paragraph>Ⓡ 10 000</Paragraph>
        </Card.Content>
      </Card>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>Manage Addresses</Text>
        <Text>Chats</Text>
        <Text>Confidentiality</Text>
        <Text>Exit</Text>
      </View>
    </View>
  );
};

export default ProfilePage;