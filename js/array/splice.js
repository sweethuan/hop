Array.prototype.mySplice = function(start,deleteCount) {

	var max = Math.max,
		min = Math.min,
		delta,
		element,
		insertCount = max(arguments.length - 2, 0), //插入的元素的个数,最小为0
		k = 0,
		len = this.length,
		new_len,
		result = [], //返回的数组，包函了被删除的元素
		shift_count;

	start = start || 0; //如何start不存在，则从0开始
	if (start < 0) {
		start += len; //确保start为正数
	}
	start = max(min(start, len), 0); //确保start为正数
	deleteCount = max(min(typeof deleteCount === 'number' ? deleteCount : len, len - start), 0); //要删除元素的个数
	//  1.如果deleteCount存在则deleteCount,否则len
	//  2.用1的结果与len-start对比，取较小者（因为最大可删除的元素个数为len-start)
	//  3.用2的结果与0比对，取大者，防止为负数
	delta = insertCount - deleteCount;
	/*
	 * 1.如果delta大于0,说明数组长度会增加
	 * 2.如果delat小于0,说明数组长度会减少
	 */
	new_len = len + delta; //数组的新长度
	while (k < deleteCount) { //这个while循环的作用是保存要返回的result，即保存被删除的元素
		element = this[start + k];
		if (element != undefined) {
			result[k] = element;
		}
		k++;
	}
	shift_count = len - start - deleteCount;
	/*
	 * 1. len-start ,start前端的元素不用动
	 * 2. 用1的结果再减去deleteCount,是start后面要保留的元素的个数
	 * 3. 通过shift_count次的遍历,就可以把要保留的元素向前移动，达到删除的目的
	 */
	if (delta <= 0) { //在数组长度减少的情况下
		k = start + insertCount; //k的初始下标为要保留的元素新的开始下标
		while (shift_count) {
			this[k] = this[k - delta]; //后面的替换前面的要删除的元素
			k += 1;
			shift_count -= 1;
		}
		this.length = new_len;
	} else if (delta > 0) { //在数组长度增加的情况下
		k = 1;
		while (shift_count) {
			this[new_len - k] = this[len - k]; //从数组的最后一个元素开始，倒着进行替换
			k += 1;
			shift_count -= 1;
		}
		this.length = new_len;
	}
	for (k = 0; k < insertCount; k += 1) {
		this[start + k] = arguments[k + 2]; //插入替换元素
	}
	return result;
}
let arr = [3, 6, 8, 10, 15]

let arr1 = arr.mySplice()
console.log('arr1:', arr1)

//let arr2 = arr.splice(2, 1) // 空         0 || 0,10          0,1            2,1    
//console.log('arr2:', arr2) // []          [3,6,8,10,15]       [3]             [8]
console.log('arr:', arr) // [3,6,8,10,15]    []        [ 6, 8, 10, 15 ]  [3,6,10,15]
