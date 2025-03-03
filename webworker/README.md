HTML5的web worker是运行在后台的JavaScript，它可以执行一些耗时的任务而不影响页面的正常运行。使用web worker可以创建一个后台运行的线程worker。

web worker的特点：
- 通过加载一个 JS 文件来进行大量复杂的计算，而不挂起主进程。通过 postMessage 和 onMessage 进行通信。

- 可以在 Worker 中通过 importScripts(url) 方法来加载 JavaScript 脚本文件。

- 可以使用 setTimeout( )，clearTimeout( )，setInterval( ) 和 clearInterval( ) 等方法。

- 可以使用 XMLHttpRequest 进行异步请求。

- 可以访问 navigator 的部分属性。

- 可以使用 JavaScript 核心对象。

web Worker 的局限性：

- 不能跨域加载 JavaScript

- Worker 内代码不能访问 DOM

- 使用 Web Worker 加载数据没有 JSONP 和 Ajax 加载数据高效。