// service worker发送的消息会到达这里
self.addEventListener('message', async event => {
    // 获取所有注册了service worker的客户端
    const clients = await self.clients.matchAll()
    clients.forEach(client => {
        client.postMessage(event.data)
    })
})