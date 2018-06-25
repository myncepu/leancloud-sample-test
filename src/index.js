import React from 'react'
import { createStackNavigator } from 'react-navigation'

import RegisterScreen from './screens/Register'
import ProfileScreen from './screens/Profile'
// import RegisterWithMobilePhoneScreen from './screens/RegisterWithMobilePhone'
import { leancloudInit } from './initLeanCloud'
import EStyleSheet from 'react-native-extended-stylesheet'

EStyleSheet.build({
  $primaryBlue: '#4F6D7A',

  $white: '#FFFFFF',
  $lightGray: '#F0F0F0',
  $border: '#979797',
  $inputText: '#797979',
})

const RootStack = createStackNavigator(
  {
    Register: RegisterScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Register',
  }
)

export default class App extends React.Component {
  componentDidMount() {
    leancloudInit()
  }

  render() {
    return (
      <RootStack />
    )
  }
}
