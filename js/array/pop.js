Array.prototype.myPop = function() {
	
	let endValue = this[this.length-1]
	
	this.length = this.length-1
	
	return endValue
}
let arr = [3,6,9,0,12]

let arr1 = arr.myPop()
// let arr2 = arr.pop()

console.log('arr1:',arr1)
// console.log('arr2:',arr2)
console.log('arr:',arr)