addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
  })

  async function handleRequest(request) {
	// 解析请求路径是否符合要求
	const url = new URL(request.url)
	const path = url.pathname
  
	// 访问 "https://example.com/lev1s" 返回所有键名
	if (path === '/lev1s') {
	  // 使用辅助函数查询 KV 中的所有键名，并将其作为 JSON 字符串返回
	  const keys = await getKeys()
	  const body = JSON.stringify(keys, null, 2)
	  return new Response(body, { headers: { 'Content-Type': 'application/json' } })
	}
  
	// 存
	const parts = path.split('/')
	if (parts.length !== 3) {
	  return new Response('Invalid URL path', { status: 400 })
	}
	// parts长这样：["", "key", "value"]
	const [yourKey, yourValue] = parts.slice(1)

	if (yourValue === 'lev1s') {
		// 查
		const searchValue = await DB.get(yourKey)
		// 返回响应
		return new Response(searchValue, { status: 200 })
	  }

	if (yourValue === 'delete') {
		// 查
		await DB.delete(yourKey)
		// 返回响应
		return new Response('ok', { status: 200 })
	  }

	const saveValue = await putKey(yourKey, yourValue)
	return new Response(saveValue, { status: 200 })
  }
  



// 定义一个异步函数来存储键名、键值
async function putKey(key, value){
	await DB.put(key, value)
	return value
}

// 定义一个异步函数来查询 KV 中的所有键名
async function getKeys() {
	// 查询 KV 中的所有键名，并返回一个包含这些键名的数组
	const keys = await DB.list()
	if (keys.keys.length === 0) {
		return;
	}
	return keys.keys
  }