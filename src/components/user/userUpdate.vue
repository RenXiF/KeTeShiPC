<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="13" class="">
            <h1 class="flex-center flex_jufy_center">人员更新</h1>
            <el-form label-position="left" class="el-form" label-width="0" :model="formLabelAlign">
                <el-form-item label="ID" label-width="auto">
                    <el-input v-model="formLabelAlign.id" required="true" placeholder="请输入ID"></el-input>
                </el-form-item>
                <el-form-item label="姓名" required="true" label-width="auto">
                    <el-input v-model="formLabelAlign.name" placeholder="请输入新的姓名"></el-input>
                </el-form-item>
                <el-form-item label="卡号" label-width="auto">
                    <el-input v-model="formLabelAlign.region" placeholder="请输入卡号(为空则会返回原信息)"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="">立即更改</el-button>
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
