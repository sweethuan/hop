Array.prototype.myMap = function(fn) {
	let temp = []
	for (let i=0;i<this.length;i++) {
		temp.push(fn(this[i],i,this))
	}
	return temp
}
let arr = [3,6,9,0,12]

let arr1 = arr.myMap((item,i,arr) => {
	console.log(item,i,arr)
})
// let arr2 = arr.map((item,i,arr) => {
// 	console.log('2:',item,i,arr)
// })

console.log(arr1)
// console.log(arr2)