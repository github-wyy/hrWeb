import Mock from 'mockjs'
import FrontMessageEcho from './front/MessageEcho'
import FrontMessageShow from './front/MessageShow'
Mock.mock('/messageApi/message/echo', 'post', () => { // 此处会劫持访问接口，并返回数据
  return FrontMessageEcho.messageEcho()
})
Mock.mock('/messageApi/message/show', 'post', () => { // 此处会劫持访问接口，并返回数据
  return FrontMessageShow.messageShow()
})
