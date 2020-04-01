<template>
  <el-select v-loading="dataListLoading" v-model="currentValue" :clearable="temp_clearable" placeholder="选择分类" @change="selectChange">
    <el-option v-for="item in dataList" :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
  import Category from '@/api/category'

  export default {
    props: {
      value: {
        type: [Number, String]
      }, // 接受外部v-model传入的值
      label: {
        type: [Number, String]
      },
      clearable: {
        type: [Boolean]
      }// 接受外部v-model传入的值
    },
    mounted() {
      this.getDataList()
    },
    computed: {
      currentValue: {
        get: function() {
          return this.value // 将props中的value赋值给currentValue
        },
        set: function(val) {
          this.$emit('input', val) // 通过$emit触发父组件
        }
      }
    },
    data() {
      return {
        temp_clearable: this.clearable || false,
        dataListLoading: false,
        dataList: null,
        temp_value: this.value
      }
    },
    methods: {
      init() {
        this.getDataList()
      },
      getDataList() {
        this.dataListLoading = true
        Category.list().then(({ data }) => {
          const { code, msg, result } = data
          if (code === 200) {
            this.dataList = result
          } else {
            this.dataList = []
            this.$message.error(msg)
          }
          this.dataListLoading = false
        })
      },
      selectChange(val) {
        // console.log(val)
        this.$emit('changePayment', val)
      }
    }

  }
</script>
