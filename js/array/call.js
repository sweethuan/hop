let obj = {
	name: 'jack Ma'
}
	
function test() {
	console.log(this)
}
test()
test.call(obj)
	console.dir(test)