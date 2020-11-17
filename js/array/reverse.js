Array.prototype.myReverse = function() {
	
	for (let i =0,len=parseInt(this.length/2); i<len; i++) {
		let temp=this[this.length-1-i]
		this[this.length-1-i]=this[i];
		this[i]=temp
	}
	return this
}
let arr = [3,6,9,0,12,7,9]

let arr1 = arr.myReverse()
// let arr2 = arr.reverse()

console.log('arr1:',arr1)
// console.log('arr2:',arr2)
console.log('arr:',arr)