Array.prototype.myFilter = function(fn) {
	let temp = []
	for (let i=0;i<this.length;i++) {
		if(fn(this[i],i,this)){
			temp.push(this[i])
		}
	}
	return temp
}
let arr = [3,6,8,10,12]

let arr1 = arr.myFilter((item,i,arr) => {
	// console.log(item,i,arr)
	return item%3==0
})
let arr2 = arr.filter((item,i,arr) => {
	//console.log(item,i,arr)
	// return item%13==0 
})

console.log(arr1)
 // console.log(arr2)