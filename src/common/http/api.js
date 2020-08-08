/**
 *@author: wanggang
 *@date: 2020-04-27 14:31:18
 *@description: api接口请求文件
 */
import {
	get,
	post,
	// postJson,
	postForm,
} from './http';
import httpli from '../../config/index.js';
var api = {
	// 测试模块
	test: {
		// 测试普通get请求路径拼接
		testGet1(id, callback) {
			get(httpli.apili, '/getTest1/${id}').then((res) => {
				callback(res);
			});
		},
		// 测试post请求
		testPost1(params, callback) {
			post('/postTest1', params).then((res) => {
				callback(res);
			});
		},
	},
	// 学校相关接口
	school: {
		// 查询所有学校
		QueryAllSchools(callback) {
			get(httpli.apili, 'school/getall').then((res) => {
				callback(res);
			});
		},
		// 查询单个学校
		getschool(params, callback) {
			get(httpli.apili, 'school/getschool', params).then((res) => {
				callback(res);
			});
		},
		// 添加学校
		addSchools(params, callback) {
			post(httpli.apili, 'school/addSchool', params).then((res) => {
				callback(res);
			});
		},
		// 删除学校
		delateschool(params, callback) {
			get(httpli.apili, 'school/delateschool', params).then((res) => {
				callback(res);
			});
		},
		// 修改学校
		updateschool(params, callback) {
			post(httpli.apili, 'school/updateschool', params).then((res) => {
				callback(res);
			});
		},
		// 查询所有班级
		getAllClass(params, callback) {
			get(httpli.apili, 'class/getAllClass', params).then((res) => {
				callback(res);
			});
		},
		// 添加班级
		addClass(params, callback) {
			post(httpli.apili, 'class/addClass', params).then((res) => {
				callback(res);
			});
		},
		// 删除班级
		deleteClass(params, callback) {
			get(httpli.apili, 'class/deleteClass', params).then((res) => {
				callback(res);
			});
		},
		// 修改班级
		updateClass(params, callback) {
			post(httpli.apili, 'class/updateClass', params).then((res) => {
				callback(res);
			});
		},
	},
	// 设备管理相关接口
	device: {
		// 查询所有设备
		getAll(params, callback) {
			get(httpli.apili, 'device/getAll', params).then((res) => {
				callback(res);
			});
		},
		// 根据学校ID查询所有设备
		getDevice(params, callback) {
			get(httpli.apili, 'device/getDevice', params).then((res) => {
				callback(res);
			});
		},
		// 添加设备
		Addevice(params, callback) {
			post(httpli.apili, 'device/Addevice', params).then((res) => {
				callback(res);
			});
		},
		// 删除设备
		DelDevice(params, callback) {
			get(httpli.apili, 'device/DelDevice', params).then((res) => {
				callback(res);
			});
		},
		// 修改设备
		updateDevice(params, callback) {
			post(httpli.apili, 'device/updateDevice', params).then((res) => {
				callback(res);
			});
		},
	},
	// 学生相关接口
	student: {
		// 创建学生
		register(params, callback) {
			post(httpli.apili, 'student/register', params).then((res) => {
				callback(res);
			});
		},
		// 根据学校id 与班级查询学生信息
		getStudentByclass(params, callback) {
			get(httpli.apili, 'student/getStudentByclass', params).then((res) => {
				callback(res);
			});
		},
		// 修改学生信息
		updateStudent(params, callback) {
			post(httpli.apili, 'student/updateStudent', params).then((res) => {
				callback(res);
			});
		},
		// 删除学生信息
		deleteStudent(params, callback) {
			get(httpli.apili, 'student/deleteStudent', params).then((res) => {
				callback(res);
			});
		},
		// 删除整个班级的学生信息
		deleteClassStudent(params, callback) {
			post(httpli.apili, 'student/deleteClassStudent', params).then((res) => {
				callback(res);
			});
		},
	},
	question:{
		// 添加题库内容
		questionAdd(params, callback) {
			post(httpli.apili, 'Question/Add', params).then((res) => {
				callback(res);
			});
		},
		// 查看题库内容
		getQuestion(params, callback) {
			get(httpli.apili, 'Question/getQuestion', params).then((res) => {
				callback(res);
			});
		},
		// 查看题库内容
		Questiondelete(params, callback) {
			get(httpli.apili, 'Question/delete', params).then((res) => {
				callback(res);
			});
		},
	},
	// 云端设备学生相关接口
	yun: {
		// 设备创建添加学生
		personAdd(params, callback) {
			postForm(httpli.apilT, 'api/person/add', params).then((res) => {
				callback(res);
			});
		},
		// 设备照片注册
		faceAdd(params, callback) {
			postForm(httpli.apilT, 'api/face/add', params).then((res) => {
				callback(res);
			});
		},
		// 删除设备人员
		persondel(params, callback) {
			postForm(httpli.apilT, 'api/person/del', params).then((res) => {
				callback(res);
			});
		},
		// 配置设备
		deviceConfig(params, callback) {
			postForm(httpli.apilT, 'api/device/config', params).then((res) => {
				callback(res);
			});
		},
		// 验证设备开门
		openDoo(params, callback) {
			postForm(httpli.apilT, 'api/device/openDoor', params).then((res) => {
				callback(res);
			});
		},
	},
	// 主页管理相关接口
	home: {
		// 查询注册总人数
		getAllVo(callback) {
			get(httpli.apili, 'user/getAllVo').then((res) => {
				callback(res);
			});
		},
	},

};
export default api;
