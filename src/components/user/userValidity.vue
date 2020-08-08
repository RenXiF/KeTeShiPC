<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="13" class="">
            <h1 class="flex-center flex_jufy_center">人员有效期设置</h1>
            <el-form label-position="left" class="el-form" label-width="0" :model="formLabelAlign">
                <el-form-item label="ID" label-width="auto">
                    <el-input v-model="formLabelAlign.id" placeholder="请输入需要删除的人员ID"></el-input>
                </el-form-item>
                <el-form-item label="时间" label-width="auto">
                    <el-input v-model="formLabelAlign.time" placeholder="请输入需要有效期截止时间 (如:`2017-07-15 12:05:00`)"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="">立即修改</el-button>
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
                time: '',
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
<style lang='scss'>
@import url('userCommo.css'); /* 引入公共css类 */
</style>
