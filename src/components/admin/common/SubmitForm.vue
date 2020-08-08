<template>
	<!-- 添加学校组件 -->
	<div class="confirm-dialog ">
		<el-dialog title="添加学校" :visible.sync="showMsg" :show-close="false" width="40%" center>
			<el-form :model="nameform" :rules="rules" ref="ruleForm" label-position="left" class="demo-ruleForm">
				<el-form-item label="学校名称" :label-width="formLabelWidth" prop="schoolName">
					<el-input v-model="nameform.schoolName" autocomplete="on" placeholder="请输入学校名称"></el-input>
				</el-form-item>
				<el-form-item label="所在省份:" :label-width="formLabelWidth" prop="schoolProvince">
					<el-input v-model="nameform.schoolProvince" autocomplete="on" placeholder="请输入所在省份"></el-input>
				</el-form-item>
				<el-form-item label="所在市:" :label-width="formLabelWidth" prop="schoolCity">
					<el-input v-model="nameform.schoolCity" autocomplete="on" placeholder="请输入所在市"></el-input>
				</el-form-item>
				<el-form-item label="所在区县:" :label-width="formLabelWidth" prop="schoolDistrict">
					<el-input v-model="nameform.schoolDistrict" autocomplete="on" placeholder="请输入所在区/县"></el-input>
				</el-form-item>
				<el-form-item label="详细地址:" :label-width="formLabelWidth" prop="schoolAddress">
					<el-input v-model="nameform.schoolAddress" autocomplete="on" placeholder="请输入详细地址"></el-input>
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
		},
		components: {},
		data() {
			return {
				// 是否同步展示
				// visible: false,
				formLabelWidth: '100px',

				nameform: {
					// schoolId:1,
					schoolName: '',
					schoolProvince: '', // 省
					schoolCity: '', // 市
					schoolDistrict: '', // 区县
					schoolAddress: '', // 详细地址
				},
				rules: {
					schoolName: [{
							required: true,
							message: '请输入学校名称',
							trigger: 'blur',
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur',
						},
					],
					schoolProvince: [{
						required: true,
						message: '请输入省份',
						trigger: 'blur',
					}],
					schoolCity: [{
						type: 'date',
						required: true,
						message: '请输入市份',
						trigger: 'blur',
					}],
					schoolDistrict: [{
						type: 'date',
						required: true,
						message: '请输入区/县',
						trigger: 'blur',
					}],
					schoolAddress: [{
						type: 'date',
						required: true,
						message: '请填写详细地址',
						trigger: 'blur',
					}],
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
							message: '添加失败！'+res.msg,
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
