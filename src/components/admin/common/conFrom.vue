<template>
	<el-form ref="fromModel" :model="fromModel" v-if="fromModel" label-position="left" label-width="80px">
		<el-form-item v-for="(item ,index) in fromLabel" :key="index" :label="item.label">
			<el-input required v-model="fromModel[item.key]" v-if="item.type=== 'input'"></el-input>
			<el-select v-model="fromModel.region" placeholder="请选择活动区域" v-if="item.type==='select'">
				<el-option v-for="(subitem ,index) in item.options" :label="subitem.label" :value="subitem.value"></el-option>
			</el-select>
			<el-date-picker required v-if="item.type === 'date-picker'" v-model="fromModel[item.key]" type="date" placeholder="选择日期"
			 style="width: 100%;"></el-date-picker>
			<el-switch v-if="item.type === 'switch'" v-model="fromModel[item.key]"></el-switch>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button>取消</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		props: {
			fromModel: {
				type: Object,
				default () {
					return {}
				}
			},
			fromLabel: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				// form: {
				// 	name: '',
				// 	region: '',
				// 	date1: '',
				// 	date2: '',
				// 	delivery: false
				// },
				// tabeFrom: [{
				// 		label: '活动名称',
				// 		key: 'name',
				// 		type: 'input'
				// 	},
				// 	{
				// 		label: '活动区域',
				// 		key: 'region',
				// 		type: 'select',
				// 		options: [{
				// 				label: '区域一',
				// 				value: 'shanghai'
				// 			},
				// 			{
				// 				label: '区域二',
				// 				value: 'beijing'
				// 			}
				// 		]
				
				// 	},
				// 	{
				// 		label: '活动时间',
				// 		key: 'date1',
				// 		type: 'date-picker'
				// 	},
				// 	{
				// 		label: '配送时间',
				// 		key: 'date2',
				// 		type: 'date-picker'
				// 	},
				// 	{
				// 		label: '及时配送',
				// 		key: 'delivery',
				// 		type: 'switch'
				// 	},
				// ],
				// rules: {
				//           name: [
				//             { required: true, message: '请输入活动名称', trigger: 'blur' },
				//             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				//           ],
				//           region: [
				//             { required: true, message: '请选择活动区域', trigger: 'change' }
				//           ],
				//           date1: [
				//             { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				//           ],
				//           date2: [
				//             { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				//           ],
				//         }
			}
		},
		methods: {
			onSubmit() {
				console.log(this.fromModel);
			},
			// resetForm(formName) {
			// 	this.$refs[formName].resetFields();
			// }
		}
	}
</script>
