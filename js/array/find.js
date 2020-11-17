Array.prototype.myFind = function(fn) {
	for (let i=0;i<this.length;i++) {
		if(fn(this[i],i,this)) {
			return this[i]
		}
	}
	//return undefined
}
let arr = [3,6,9,0,12]

let arr1 = arr.myFind((item,i,arr) => {
	// console.log(item,i,arr)
	return item > 20
})
let arr2 = arr.find((item,i,arr) => {
	// console.log(item,i,arr)
	return item > 20
})

console.log(arr1)
console.log(arr2)