# ISSUE

## 问题

- 将 firebase.User 类型作为属性的实例作为 ngrx 的 state 后，出现无法冻结 state 的错误，应该是 signInSuccessData.authResult.user 变量存在什么问题。当前的解决方式是暂时去掉了必须冻结的限制，毕竟只是为了正确开发所做的规范；
