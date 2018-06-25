import React, { Component } from 'react'
import {
  View,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native'
import { Container, Text, Button, Content } from 'native-base'
import { RkText, RkStyleSheet } from 'react-native-ui-kitten'

const paddingValue = 0

const calculateItemSize = () => {
  let {width} = Dimensions.get('window')
  return (width - paddingValue * 12) * 0.8 / 6
}

class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      smsCode: '',
    }
  }

  handleLogout = () => {
    return this.props.screenProps.changeLoginState(false)
  };

  render() {
    const {smsCode }= this.state

    return (
      <Container>
        <Content>
          <View style={{ alignItems: 'center' }}>
            <View style={[styles.header, styles.bordered]}>
              <RkText
                rkType='hero xxlarge'
                style={{ alignSelf: 'center', width: '90%' }}
              >
                输入验证码
              </RkText>
              <RkText
                rkType='hero xlarge'
                style={{ alignSelf: 'center', alignItems: 'center', width: '90%' }}
              >
                验证码已发送致+86...
              </RkText>
            </View>
            <TextInput
              autoFocus
              style={styles.smsCodeTextInput}
              keyboardType='phone-pad'
              maxLength={6}
              textAlign='center'
              onChangeText={(smsCode) => this.setState({smsCode})}
            >
              <Text style={styles.smsCodeText}>{smsCode}</Text>
            </TextInput>
            <Button
              full
              disabled
              onPress={this.handleLogout}
            >
              <Text>Log Out</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

export default Grid

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.scroll,
    padding: paddingValue,
  },
  smsCodeInputContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 17,
    marginBottom: 20,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  smsCodeInput: {
    width: calculateItemSize(),
    height: calculateItemSize(),
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 5,
    fontSize: 30,
  },
  smsCodeTextInput: {
    // width: calculateItemSize() * 6,
    flex: 1,
    alignSelf: 'center',
    width: '90%',
    height: 50,
    letterSpacing: 10,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
  },
  smsCodeText: {
    textAlign: 'center',
    fontSize: 30,
  }
}))
