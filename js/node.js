const dns = require('dns');
dns.lookup('juejin.im', (err, address, family) => {
  console.log(`域名对应ip地址==>${address}类型：${family}`);
}

Function.prototype.myCall= context=globalThis => {
	const key = Symbol()
	context[key] = this
	
	let res = context[key](...arguments[1])
	delete context[key] 
	return res
}