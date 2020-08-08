<template>
	<!-- 表单修改提交 -->
	<el-dialog :title="tit" :visible.sync="showMsg" width="50%" :show-close="false" center>
	  <el-form ref="fromModel" :model="fromModel" v-if="fromModel" label-position="left" label-width="180px" >
	  	<el-form-item v-for="(item ,index) in fromLabel" :key="index" :label="item.label" :rules="item.rules" :prop="item.key">
	  		<el-input required v-model="fromModel[item.key]" v-if="item.type=== 'input'" :placeholder="item.placeholder"></el-input>
			<el-input required v-model="fromModel[item.key]" v-if="item.type=== 'textarea'" :placeholder="item.placeholder" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" maxlength="300" show-word-limit></el-input>
	  		<el-select v-model="fromModel[item.key]"  :placeholder="item.placeholder" v-if="item.type==='select'">
	  			<el-option v-for="(subitem ,index) in item.options" :label="subitem.label" :value="subitem.value"></el-option>
	  		</el-select>
	  		<el-date-picker required v-if="item.type === 'date-picker'" v-model="fromModel[item.key]" type="date"  :placeholder="item.placeholder"
	  		 style="width: 100%;"></el-date-picker>
	  		<el-switch v-if="item.type === 'switch'" v-model="fromModel[item.key]"></el-switch>
			<div class="imgupload flex-center" v-if="item.type === 'uploadImg'">
				<div class="test">
					{{item.placeholder}}
					<input type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png"
					 @change="changeCoverImg($event,item)">
				</div>
				<img :src="fromModel[item.key]" style="max-width: 70%; max-height: 80%; border-radius: 5px; margin: 2px 20px;">
			</div>
			
	  	</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="$emit('update:showMsg', false)">取 消</el-button>
	    <el-button :type="type" @click="dialogConfirm('fromModel')">确 定</el-button>
	  </div>
	</el-dialog>
</template>
<script>
	export default {
		props: {
			showMsg: Boolean,
			tit: {
				type: String,
				default: '系统消息'
			},
			type: {
				type: String,
				default: 'primary'
			},
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
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false
				},
				tabeFrom: [
					{
						label: '活动名称',
						key: 'name',
						type: 'input'
					},
					{
						label: '活动区域',
						key: 'region',
						type: 'select',
						options: [{
								label: '区域一',
								value: 'shanghai'
							},
							{
								label: '区域二',
								value: 'beijing'
							}
						]
				
					},
					{
						label: '活动时间',
						key: 'date1',
						type: 'date-picker'
					},
					{
						label: '配送时间',
						key: 'date2',
						type: 'date-picker'
					},
					{
						label: '及时配送',
						key: 'delivery',
						type: 'switch'
					},
				],
				rules: {
				          classRole: [
				            { required: true, message: '请输入活动名称' }
				          ],
				          reserveOne: [
				            { required: true, message: '请选择活动区域' }
				          ],
				        }
			}
		},
		methods: {
			// 图片上传转base64位
			changeCoverImg: function(e,item) {
				var file = e.target.files[0]
				var reader = new FileReader()
				var that = this
				reader.readAsDataURL(file)
				reader.onload = function(e) {
					that.fromModel[item.key] = this.result
					item.placeholder = '已选择'
					console.log(that.fromModel)
					that.$message.success('选择图片成功！')
				}
			},
			onSubmit() {
				console.log(this.fromModel);
			},
			dialogConfirm(formName) {
				this.$refs[formName].validate((valid) => {
					console.log(valid);
					console.log(this.fromModel)
				          if (valid) {
				            // alert('submit!');
							this.$emit('conModify');
							this.$emit('update:showMsg', false);
				          } else {
				            console.log('error submit!!');
				            return false;
				          }
				        });
				// console.log(this.form);
			    // this.$emit('conModify');
			    // this.$emit('update:showMsg', false);
			},
		}
	}
</script>
<style lang="scss">
    .imgupload {
        width: 100%;
        min-height: 120px;
    }

    .test {
        position: relative;
        display: inline-block;
        height: 30px;
        padding: 5px 20px;

        /* border: 1px solid #99d3f5; */
        border-radius: 5px;
        margin: 0 10px;

        /* color: #1e88c7; */
        color: #fff;
        background: #409eff;
        overflow: hidden;
        font-size: 13px;
        line-height: 30px;
        text-indent: 0;

        /* text-decoration: none; */
    }

    .test input {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.3;
        font-size: 50px;
    }

    .test:hover {
        /* border-color: #78c3f3; */

        /* color: #004974; */
        color: #fff;
        background: #66b1ff;
    }
</style>
