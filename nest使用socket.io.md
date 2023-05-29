# nest 使用 WebSockets

## 创建

### 创建资源

```bash
nest g res chat --no-spec
```

### 选择资源类型 ：WebSockets

D:\01-zhanglp\product\quick\新建文件夹>nest g res role1
? What transport layer do you use? (Use arrow keys)

> REST API
> GraphQL (code first)
> GraphQL (schema first)
> Microservice (non-HTTP)
> WebSockets

### 选择是否创建 crud：y

? What transport layer do you use? WebSockets
? Would you like to generate CRUD entry points? (Y/n) y

### 创建完成后如下：

CREATE chat/chat.gateway.ts (1018 bytes)
CREATE chat/chat.gateway.spec.ts (515 bytes)
CREATE chat/chat.module.ts (221 bytes)
CREATE chat/chat.service.ts (621 bytes)
CREATE chat/chat.service.spec.ts (453 bytes)
CREATE chat/dto/create-chat.dto.ts (31 bytes)
CREATE chat/dto/update-chat.dto.ts (188 bytes)
CREATE chat/entities/chat.entity.ts (22 bytes)

### 安装 websockets 插件

```bash
npm i --save @nestjs/websockets @nestjs/platform-socket.io
```

### 配置网关

- 自定义端口，默认监听的是项目端口

```ts
//chat/chat.gateway.ts
@WebSocketGateway(3000)
export class ChatGateway {
  ...
}
```

- 配置跨域

```ts
//chat/chat.gateway.ts
@WebSocketGateway({cors:true})
export class ChatGateway {
  ...
}
```
