<template>
  <el-select v-loading="dataListLoading" v-model="currentValue" :clearable="temp_clearable" placeholder="选择父级栏目"
             @change="selectChange">
    <el-option v-for="item in dataList" :key="item.cId"
               :label="item.cName"
               :value="item.cId">
    </el-option>
  </el-select>
</template>

<script>
  import Column from '@/api/column'

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
      }, // 接受外部v-model传入的值
      showHead: {
        type: [Boolean],
        default: true
      }
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
        Column.list().then(({ data }) => {
          let { code, msg, result } = data
          if (code && code == 200) {
            // let dataArr = result
            // const tempDate = []
            // if (this.showHead) {
            //   tempDate.push({ cId: 0, cName: '顶级栏目' })
            // }
            // if (dataArr) {
            //   for (var i in dataArr) {
            //     tempDate.push(dataArr[i])
            //   }
            // }
            this.dataList = result
          } else {
            this.dataList = []
          }
          this.dataListLoading = false
        })
      },
      selectChange(val) {
        this.$emit('changePayment', val)
      }
    }

  }
</script>
