Array.prototype.myLastIndexOf = function(value, i) {
	i = i || this.length - 1
	for (i;i>=0;i--) {
		if(this[i]===value) {
			return i
		}
	}
	return -1
}
let arr = [3,6,9,0,3,12]

let arr1 = arr.myLastIndexOf(3)
let arr2 = arr.lastIndexOf(3)

console.log('arr1:',arr1)
console.log('arr2:',arr2)