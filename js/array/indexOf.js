Array.prototype.myIndexOf = function(value, i=0) {
	for (i;i<this.length;i++) {
		if(this[i]===value) {
			return i
		}
	}
	return -1
}
let arr = [3,6,9,0,3,12]

let arr1 = arr.myIndexOf(3,2)
let arr2 = arr.indexOf(3,2)

console.log('arr1:',arr1)
console.log('arr2:',arr2)