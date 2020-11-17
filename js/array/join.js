Array.prototype.myJoin = function(separator=',') {
	let tempStr = ''
	for (let i=0,l=this.length;i<l;i++) {
		if(i===l - 1) {
			tempStr += this[i]
		}else {
			tempStr += this[i] + separator
		}
		
	}
	return tempStr
}
let arr = [3,6,9,0,3,12]

let arr1 = arr.myJoin('/')
let arr2 = arr.join('/')

console.log('arr1:',arr1)
console.log('arr2:',arr2)
// console.log('arr:',arr)