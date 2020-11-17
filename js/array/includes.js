Array.prototype.myIncludes = function(value, i=0) {
	for (i;i<this.length;i++) {
		if(this[i]===value) {
			return true
		}
	}
	return false
}
let arr = [3,6,9,0,3,12]

let arr1 = arr.myIncludes(3)
let arr2 = arr.includes(3,1)

console.log('arr1:',arr1)
console.log('arr2:',arr2)
