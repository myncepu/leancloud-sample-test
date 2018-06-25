import React from 'react'
import { Text, TextInput, View, Dimensions, StyleSheet } from 'react-native'
import { Container, Header, Body, Title, Button, Content, Form, Item, Input, Label } from 'native-base'
import { RkText } from 'react-native-ui-kitten'
import Toast from 'react-native-root-toast'
import { User, Query } from 'leancloud-storage'

import CountdownView from '../components/timer'
import { randomString } from '../utils/randomString'
import { InputWithButton } from './components/TextInput'

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      passwordError: false,
      mobilePhoneNumber: '',
      mobilePhoneNumberError: false,
      isPhoneNumberLegal: false,
      smsCode: null,
      isSmsCodeLegal: false,
      disabledLoginButton: true,
      isShowIcon: false,
    }
  }

  static navigationOptions = {
    headerTitle: '登陆',
    headerLeft: (
      <Button
        onPress={() => alert('This is a button!')}
        title='Info'
        color='black'
      />
    ),
  }

  shouldStartCountdown = () => {
    const { mobilePhoneNumber, isPhoneNumberLegal } = this.state
    if (isPhoneNumberLegal) {
      // 检索该手机号码是否已经注册
      var query = new Query('_User')
      query.equalTo('mobilePhoneNumber', mobilePhoneNumber).find().then(user => {
        // 成功获得实例
        console.log('user', user)
        console.log('user.length', user.length)
        if (user.length === 0) {
          // 手机号码未注册，注册
          const user = new User()
          user.set('username', mobilePhoneNumber)
          user.set('password', randomString(5))
          user.setMobilePhoneNumber(mobilePhoneNumber)
          user.signUp().then(success => {
            console.log('注册成功', success)
            user.requestMobilePhoneVerify(mobilePhoneNumber).then(function(){
              //调用成功
              console.log('验证码发送成功', success)
            }, function(error){
              //调用失败
              console.log('发送失败', error)
            })
          }, error => {
            console.log('注册失败', error)
          })
        }
        this.setState({ mobilePhoneNumberError: true })
      }, error => {
        // 异常处理
        console.log('error', error)
      })

      // 请求发送验证码
      console.log('mobilePhoneNumber', this.state.mobilePhoneNumber)
      return true
    }

    alert('电话号码不能为空!')
    return false
  };

  handleNetworkFailed = () => alert('network failed');

  handleChangeMobilePhoneNumber = mobilePhoneNumber => {
    
    // 手机号码非空，则显示删除手机号码Icon按钮
    if (mobilePhoneNumber) {
      this.setState({ isShowIcon: true })
    }

    if (!mobilePhoneNumber) {
      this.setState({ isShowIcon: false })
    }

    // 手机号正则表达式
    if (mobilePhoneNumber.length > 0) {
      this.setState({ disabledLoginButton: false })
    }
    if (mobilePhoneNumber.length === 0) {
      this.setState({ disabledLoginButton: true })
    }
    const re = /^1[34578]\d{9}$/
    let isPhoneNumberLegal = re.test(mobilePhoneNumber)
    this.setState({ isPhoneNumberLegal, mobilePhoneNumber })
    if (isPhoneNumberLegal) {
      this.setState({ mobilePhoneNumber })
    }
  };

  handleClearMobilePhoneNumber = () => {
    this.setState({ mobilePhoneNumber: '', isShowIcon: false, disabledLoginButton: true })
    console.log('mobilePhoneNumber', this.state.mobilePhoneNumber)
  }

  handleSmsCode = smsCode => {
    // 6位短信验证码
    const re = /^\d{6}$/
    let isSmsCodeLegal = re.test(smsCode)
    this.setState({ isSmsCodeLegal, smsCode })
  }

  handleSubmit = () => {
    const { disabledLoginButton, isPhoneNumberLegal, mobilePhoneNumber, smsCode, isSmsCodeLegal } = this.state

    if (disabledLoginButton ) {
      return
    }

    const isPhoneNumberIllegal = !isPhoneNumberLegal
    if (isPhoneNumberIllegal) {
      let toast = Toast.show('请输入正确的手机号', {
        duration: Toast.durations.LONG,
        position: 0, // 0 will position the toast to the middle of screen
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: '#E9E9E9',
        textColor: 'black',
      })
      setTimeout(function () {
        Toast.hide(toast)
      }, 1000)

      return
    }

    console.log('mobilePhoneNumber', mobilePhoneNumber)
    this.props.navigation.navigate('Profile')

    if (isPhoneNumberLegal && isSmsCodeLegal) {
      User.verifyMobilePhone(smsCode).then(function(){
        //验证成功
        console.log('验证成功')
      }, function(error){
        //验证失败
        console.log('验证失败', error)
      })
    }
  };

  render() {
    const { navigation } = this.props
    let { isShowIcon, mobilePhoneNumber, disabledLoginButton } = this.state
    const style = this.state.isPhoneNumberLegal ? {backgroundColor: '#3BA086', borderWidth: 0} : {}
    const title = this.state.isPhoneNumberLegal ? {color: '#fff'} : {}

    return (
      <Container>
        <Content>
          <Form style={{ alignItems: 'center' }}>
            <RkText
              rkType='hero xxlarge'
              style={{ width: '90%', fontSize: 30, marginTop: 100, marginBottom: 30 }}
            >
              手机号登陆
            </RkText>
            <InputWithButton
              editable={true}
              buttonText='+86'
              onChangeText={this.handleChangeMobilePhoneNumber}
              onPress={() => null}
              closeIconOnPress={this.handleClearMobilePhoneNumber}
              placeholder='手机号'
              value={mobilePhoneNumber}
              keyboardType='numeric'
              isShowIcon={isShowIcon}
            />
            <View style={styles.phoneCell}>
              <View style={styles.phoneInfo}>
                <Text>账号:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="请输入手机号码"
                  underlineColorAndroid="transparent"
                  onChangeText={this.handleChangeMobilePhoneNumber}
                />
              </View>
              <CountdownView
                ref={r => this.countdown = r}
                time={10}
                title="发送验证码"
                overTitle="重新发送"
                style={[styles.countdown, style]}
                titleStyle={[styles.countdownTitle, title]}
                countingTitleTemplate="发送中({time})"
                countingStyle={styles.countingdown}
                countingTitleStyle={styles.countingTitle}
                shouldStartCountdown={this.shouldStartCountdown}
                onNetworkFailed={this.handleNetworkFailed}
              />
            </View>
            <View style={styles.phoneCell}>
              <View style={styles.phoneInfo}>
                <Text>验证码:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="输入6位短信验证吗"
                  underlineColorAndroid="transparent"
                  onChangeText={this.handleSmsCode}
                />
              </View>
            </View>
          </Form>
          <Button
            block
            onPress={this.handleSubmit}
            style={disabledLoginButton ? styles.disabledButton : styles.button}
            disabled={disabledLoginButton}
          >
            <Text style={{ color: 'white' }}>登陆</Text>
          </Button>
          <Button block transparent onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'gray' }}>未注册手机验证后自动登陆</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#3BA086',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30 
  },
  disabledButton: {
    backgroundColor: '#9ACDC0',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30 
  },
  phoneCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ebebeb',
    width: Dimensions.get('window').width,
    backgroundColor: '#fff'
  },
  phoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 30,
    width: Dimensions.get('window').width * 0.4,
    marginLeft: 10,
    padding: 0,
    fontSize: 14
  },
  countdown: {
    borderRadius: 15,
  },
  countingdown: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth
  },
  countdownTitle: {color: '#ccc'},
  countingTitle: {color: '#ccc'}
})
