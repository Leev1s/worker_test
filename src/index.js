addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
	return new Response('觉得很好玩是吗？幼稚鬼', { status: 200 })
  }
  