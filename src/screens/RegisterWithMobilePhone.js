/*
 * RegisterWithMobilePhone.js
 * Copyright (C) 2018 yanpengqiang <yan2010@live.com>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Content,
  View,
  Title,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text
} from 'native-base'

class FloatingLabel extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Floating Label</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.content}>
          <Content padder>
            <Form>
              <Item floatingLabel>
                <Label>输入手机号码</Label>
                <Input />
              </Item>
            </Form>
            <Button block style={{ margin: 15, marginTop: 50 }}>
              <Text>Sign In</Text>
            </Button>
          </Content>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default FloatingLabel
