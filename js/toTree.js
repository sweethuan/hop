const arr5 = [
	{
		id: 1,
		name: '系统管理',
		path: "/main/system",
	},
	{
		id: 101,
		name: '菜单管理',
		path: '/main/system/menu',
		pid: 1
	},
	{
		id: 102,
		name: '用户管理',
		path: '/main/system/user',
		pid: 1
	},
	{
		id: 103,
		name: '角色管理',
		path: '/main/system/role',
		pid: 1
	},
	{
		id: 1031,
		name: '主角色',
		path: '/mian/system/role/admin',
		pid: 103
	},
	{
		id: 10311,
		name: '小明',
		path: '/mian/system/role/admin/xiaoming',
		pid: 1031
	},
	{
		id: 1032,
		name: '次角色',
		path: '/main/system/role/noadmin',
		pid: 103
	},
	{
		id: 2,
		name: '商品管理',
		path: '/main/goods',
	},
	{
		id: 201,
		name: '商品分类',
		path: '/main/goods/cate',
		pid: 2
	},
	{
		id: 202,
		name: '商品规格',
		path: '/main/goods/guide',
		pid: 2
	},
	{
		id: 3,
		name: '订单管理',
		path: '/main/order',
	},
]

function toTree(data) {
	let result = []
	let map = {}
	data.forEach(item => {
		map[item.id] = item
	})
	// console.log('map::', map)
	// return
	data.forEach(item => {
		let parent = map[item.pid]
		// console.log('parent-----', parent)
		// return
		if (parent) {
			(parent.children || (parent.children = [])).push(item);
		} else {
			result.push(item)
		}
	})
	return result
}
 // toTree(arr5)
console.log('------', toTree(arr5))
