Array.prototype.myShift = function() {
	
	let startValue = this[0]
	
	for (let i=0;i<this.length-1;i++) {
		this[i] = this[i+1]
	}
	this.length = this.length - 1
	return startValue
}
let arr = [3,6,9,0,12]

let arr1 = arr.myShift()
// let arr2 = arr.shift()

console.log('arr1:',arr1)
// console.log('arr2:',arr2)
console.log('arr:',arr)