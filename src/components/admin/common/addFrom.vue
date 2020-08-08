<template>
	<!-- form表单组件 -->
	<div class="confirm-dialog ">
		<el-dialog title="添加学校" :visible.sync="showMsg" :show-close="false" width="40%" center>
			<el-form :model="nameform" :rules="rules" ref="ruleForm" label-position="left" class="demo-ruleForm">
				<el-form-item label="学校ID" :label-width="formLabelWidth" prop="schoolName">
					<el-input v-model="nameform.schoolId" autocomplete="on" placeholder="请输入学校名称"></el-input>
				</el-form-item>
				<el-form-item label="班级ID:" :label-width="formLabelWidth" prop="schoolProvince">
					<el-input v-model="nameform.classId" autocomplete="on" placeholder="请输入班级ID"></el-input>
				</el-form-item>
				<el-select v-model="schoolsid" clearable placeholder="请选择班级" @change="getAllDevice">
					<el-option v-for="item in Classlist" :key="item.schoolId" :label="item.schoolName" :value="item.schoolId">
					</el-option>
				</el-select>
				<el-form-item label="学生姓名:" :label-width="formLabelWidth" prop="schoolCity">
					<el-input v-model="nameform.userName" autocomplete="on" placeholder="请输入学生姓名"></el-input>
				</el-form-item>
				<el-form-item label="身份证号:" :label-width="formLabelWidth" prop="schoolDistrict">
					<el-input v-model="nameform.cardNo" autocomplete="on" placeholder="请输入身份证号"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="$emit('update:showMsg', false)">取 消</el-button>
				<el-button type="primary" @click="dialogConfirm()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'SubmitForm',
		props: {
			showMsg: Boolean,
			school: {
				type: Number,
				default () {
					return 5
				}
			},
			Classlist: {
				type: Array,
				default () {
					return []
				}
			}
			// fromname:{
			// 	type:Object,
			// 	default () {
			// 		return {
			// 			schoolId:'',
			// 			classId:'',
			// 			userName:'',
			// 			cardNo:''
			// 		}
			// 	}
			// }
		},
		components: {},
		data() {
			return {
				// 是否同步展示
				// visible: false,
				formLabelWidth: '100px',

				nameform: {
					schoolId: '',
					classId: '',
					userName: '',
					cardNo: ''
				},
				rules: {
					// schoolName: [{
					// 		required: true,
					// 		message: '请输入学校名称',
					// 		trigger: 'blur',
					// 	},
					// 	{
					// 		min: 3,
					// 		max: 20,
					// 		message: '长度在 3 到 5 个字符',
					// 		trigger: 'blur',
					// 	},
					// ],
					// schoolProvince: [{
					// 	required: true,
					// 	message: '请输入省份',
					// 	trigger: 'blur',
					// }],
					// schoolCity: [{
					// 	type: 'date',
					// 	required: true,
					// 	message: '请输入市份',
					// 	trigger: 'blur',
					// }],
					// schoolDistrict: [{
					// 	type: 'date',
					// 	required: true,
					// 	message: '请输入区/县',
					// 	trigger: 'blur',
					// }],
					// schoolAddress: [{
					// 	type: 'date',
					// 	required: true,
					// 	message: '请填写详细地址',
					// 	trigger: 'blur',
					// }],
				},
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		destroyed() {},
		methods: {
			/**
			 *@description: 确定执行的方法
			 *@param{}
			 *@return:
			 */
			dialogConfirm() {
				// console.log(this.form);
				// this.$emit('SubmitForm',this.form);
				// this.$emit('update:showMsg', false);
				if (this.nameform.schoolName == '') {
					this.$message({
						showClose: true,
						type: 'error',
						message: '请填写学校名称!',
					});
					return;
				}
				if (this.nameform.schoolProvince == '') {
					this.$message({
						showClose: true,
						type: 'error',
						message: '请填写省份!',
					});
					return;
				}
				if (this.nameform.schoolCity == '') {
					this.$message({
						showClose: true,
						type: 'error',
						message: '请填写市份!',
					});
					return;
				}
				if (this.nameform.schoolDistrict == '') {
					this.$message({
						showClose: true,
						type: 'error',
						message: '请填写区/县!',
					});
					return;
				}
				if (this.nameform.schoolAddress == '') {
					this.$message({
						showClose: true,
						type: 'error',
						message: '请填写详细地址!',
					});
					return;
				}
				this.schoolAdd();
			},
			schoolAdd() {
				this.$api.school.addSchools(this.nameform, (res) => {
					console.log(res);
					// this.tableData = res.data;
					if (res.status == 0) {
						this.$message({
							type: 'success',
							message: '添加成功!',
						});
						this.$emit('SubmitForm');
						this.$emit('update:showMsg', false);
					} else {
						this.$message({
							type: 'error',
							message: '添加失败！' + res.msg,
						});
					}

					// this.getTest1 = res;
				});
			},
		},
	};
</script>
<style lang='scss' scoped>
    /* //@import url(); 引入公共css类 */
</style>
