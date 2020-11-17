Array.prototype.myPush = function() {
	for (let i =0;i<arguments.length;i++) {
		this[this.length] = arguments[i]
	}
	return this.length
}
let arr = [3,6,9,0,12]

// let arr1 = arr.myPush(undefined,[110,220])
let arr2 = arr.push('')

// console.log('arr1:',arr1)
console.log('arr2:',arr2)
console.log('arr:',arr)