<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="13" class="">
            <h1 class="flex-center flex_jufy_center">人员删除</h1>
            <el-form label-position="left" class="el-form" label-width="0" :model="formLabelAlign">
                <el-form-item label="ID" label-width="auto">
                    <el-input v-model="formLabelAlign.id" placeholder="请输入需要删除的人员ID(删除多个请用逗号隔开,输入-1,则删除设备全部)"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="">立即删除</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            formLabelAlign: {
                id: '',
                name: '',
                region: '',
            },
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {},
};
</script>
<style lang='scss' scoped>
@import url('userCommo.css'); /* 引入公共css类 */
</style>
