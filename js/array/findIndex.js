Array.prototype.myFindIndex = function(fn) {
	for (let i=0;i<this.length;i++) {
		if(fn(this[i],i,this)) {
			return i
		}
	}
	return -1
}
let arr = [3,6,9,0,12]

let arr1 = arr.myFindIndex((item,i,arr) => {
	// console.log(item,i,arr)
	return item > 8
})
let arr2 = arr.findIndex((item,i,arr) => {
	// console.log(item,i,arr)
	return item > 8
})

console.log(arr1)
console.log(arr2)