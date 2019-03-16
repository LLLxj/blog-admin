const dataMap = {
  data: {
    result: [
      {
        id: '1',
        title: 'ceshi',
        author: 'xxh',
        dateTime: '2018年10月12日'

      }
    ],
    status: {
      Code: 200,
      Msg: '成功'
    }
  },
  del: {
    status: {
      Code: 200,
      Msg: '成功'
    }
  }
}

export default {
  getProject: config => {
    // const { username } = JSON.parse(config.body)
    return dataMap.data
  },
  delProject: config => {
    // const { username } = JSON.parse(config.body)
    return dataMap.del
  }
}
