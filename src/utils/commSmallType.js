// import axios from 'axios'
let DICT_FIXED = (function () {
  const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }]
  console.log('return: ', options)
  return options


   /* let response = await  axios.get(`/api/v2/commType/queryAll`);
    console.log('suncess: ', response);
    let list=response.data;
    for (let i = 0; i < list.length; i++) {
      let city=response.data[i];
      /!*const matchProvince  = provinces.filter(province => province.code === city.parent_code)[0];
      if (matchProvince) {
        matchProvince.children = matchProvince.children || [];
        matchProvince.children.push({
          label: city.name,
          value: city.code,
          children: city.children,
        });
      }*!/
    }*/
})

module.exports = DICT_FIXED
