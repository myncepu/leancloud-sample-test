/*
 * leancloud-register-error-alert.js
 * Copyright (C) 2018 yanpengqiang <yan2010@live.com>
 *
 * Distributed under terms of the MIT license.
 */
import { Alert } from 'react-native'

export const registerErrorAlert = (errorCode) => {
  let title = '注册失败'
  let message = ''
  let buttons = [ {text: '确定', onPress: () => console.log('OK Pressed')} ]

  switch (errorCode) {
    case 125:
      message = '邮箱地址无效'
      break
    case 202:
      message = '用户名已经被占用'
      break
    case 203:
      message = '此电子邮箱已经被占用'
      break
  }
  Alert.alert(title, message, buttons)
}
