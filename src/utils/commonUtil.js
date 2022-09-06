/**
 * 将时间解析为字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return '空'
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time)
      } else {
        // support safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time *= 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 获取星期几
 * @param date 日期字符串
 * @return {String}
 */
export function dayFormat(date) {
  switch (new Date(date).getDay()) {
    case 0:
      return '星期日'
    case 1:
      return '星期一'
    case 2:
      return '星期二'
    case 3:
      return '星期三'
    case 4:
      return '星期四'
    case 5:
      return '星期五'
    case 6:
      return '星期六'
  }
}

/**
 * 计算两个时间差
 * @param {Data} startTime 开始时间（xxxx-xx-xx）
 * @param {Data} endTime   结束时间（xxxx-xx-xx）
 * return xx年xx天  || xx天xx小时 || xx小时xx分
 */
export function getDateDiff(startTime, endTime) {
  // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  startTime = startTime.replace(/\-/g, '/')
  endTime = endTime.replace(/\-/g, '/')
  const sTime = new Date(startTime) // 开始时间
  const eTime = new Date(endTime) // 结束时间
  const timeOff = eTime - sTime // 相差时间戳（毫秒数）
  const timeMinute = 1000 * 60
  const timeHour = 1000 * 3600
  const timeDay = 1000 * 3600 * 24
  const timeYear = 1000 * 3600 * 24 * 365
  if (timeOff / timeYear >= 1) {
    return `${parseInt(timeOff / timeYear)}年${parseInt((timeOff % timeYear) / timeDay)}天`
  }
  if (timeOff / timeDay >= 1) {
    return `${parseInt(timeOff / timeDay)}天${parseInt((timeOff % timeDay) / timeHour)}小时`
  }
  return `${parseInt(timeOff / timeHour)}小时${parseInt((timeOff % timeHour) / timeMinute)}分`
}

/* today 是今天的时间戳(new Date().getTime()) */
export function minStartDate(today, day) {
  const dayDiff = day * 24 * 60 * 60 * 1000 // day（多少天）的时间戳
  const minStartTime = today - dayDiff
  // dateTimeFormatter是第一个时间类的方法
  return this.dateTimeFormatter(minStartTime, 'yyyy-MM-dd')
}

/* 获取两个日期相差天数 */
export function dateDiff(sDate1, sDate2) {
  let arrDate = sDate1.split('-')
  const objDate1 = new Date(`${arrDate[1]}/${arrDate[2]}/${arrDate[0]}`)
  arrDate = sDate2.split('-')
  const objDate2 = new Date(`${arrDate[1]}/${arrDate[2]}/${arrDate[0]}`)
  const iDays = parseInt(Math.abs(objDate1 - objDate2) / 1000 / 60 / 60 / 24) // 相差毫秒数转成天数
  return iDays
}

/* 获得今天周几 */
export function getWeek() {
  return `星期${'日一二三四五六'.charAt(new Date().getDay())}`
}

/* 匹配手机 */
export function mobilePhone(str) {
  const reg = /^0?1[0-9]{10}$/
  return reg.test(str)
}

/* 传入一串num四个 一个空格 */
export function toSplitNumFor(num) {
  return num.replace(/(.{4})/g, '$1 ')
}

/* 匹配银行卡号 */
export function bankCardNo(str) {
  const reg = /^\d{15,20}$/
  return reg.test(str)
}

/* 邮箱 */
export function regEmail(str) {
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return reg.test(str)
}

/* 省份证 */
export function idCardNumber(str) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(str)
}

/**
 * 删除数组中的指定元素
 * arrItem 数组的index下标
 * return 删除后的数组
 */
export function deleteArrItem(arr, arrItem) {
  arr.splice(
    arr.findIndex(item => item === arrItem),
    1
  )
}

/**
 * 数组去重
 * arr：要去重的数组
 * return 去重后的数组
 */
export function arrToRepeat(arr) {
  return arr.filter((ele, index, thisArr) => {
    // 因为indexOf返回元素出现的第一个index位置,如果有重复的话那么他的位置永远是第一次出现的index,这就与他本身的index不相符,则删掉.
    return thisArr.indexOf(ele) === index
  })
}

/**
 * 数组去重
 * seriesArr: 数组
 * return 去重后的数组
 */
export function deRepeatArr(seriesArr) {
  return [...new Set(seriesArr)]
}

/**
 * 根据arrObj 删除arrObj2   根据arrObj objKey查找删除
 * arrObj: 数组对象
 * arrObj2: 要被删除的对象
 * objKey： arrObj中对象的某一个key名称
 * return: arrObj2删除过后的数组
 */
export function byArrObjDeleteArrObj2(arrObj, arrObj2, objKey) {
  arrObj
    .map(value => {
      return value[objKey]
    })
    .forEach(value2 => {
      arrObj2.splice(
        arrObj2.findIndex(item => item[objKey] === value2),
        1
      )
    })
  return arrObj2
}

/**
 * 删除arrObj某一项 根据objKey中的key的值等于value的值
 * arrObj: 数组对象
 * objKey：arrObj中对象的某一个key名称
 * return: arrObj删除过后的数组
 */
export function deleteArrObjByKey(arrObj, objKey, value) {
  // foreach splice
  // for substring  slice 不改变原数组
  arrObj.splice(
    arrObj.findIndex(item => item[objKey] === value),
    1
  )
  return arrObj
}

/**
 * 查找arrObj某一项 根据objKey中的值
 * arrObj: 数组对象
 * objKey：arrObj中对象的某一个key名称
 * return: return: arrObj查找 过后的数组
 */
export function findArrObjByKey(arrObj, objKey, value) {
  return arrObj[arrObj.findIndex(item => item[objKey] === value)]
}

/**
 * 根据arrObj 筛选arrObj2   根据arrObj objKey值查找
 * arrObj: 数组对象
 * arrObj2: 要被删除的对象
 * objKey： arrObj中对象的某一个key名称
 * return: arrObj2删除过后的数组
 */
export function byArrObjFindArrObj2(arrObj, arrObj2, objKey) {
  const arrObj3 = []
  arrObj
    .map(value => {
      return value[objKey]
    })
    .forEach(value2 => {
      const arrIndex = arrObj2.findIndex(item => item[objKey] === value2)
      if (arrIndex !== -1) {
        arrObj3.push(arrObj2[arrIndex])
      }
    })
  return arrObj3
}

/**
 * 防抖
 * @param fn
 * @param time
 * @returns {(function(): void)|*}
 */
export function debounce(fn, time) {
  const _arguments = arguments
  let timeout = null
  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fn.call(this, _arguments)
    }, time)
  }
}

/**
 * 节流
 * @param fn
 * @param time
 * @returns {(function(): void)|*}
 */
export function throttle(fn, time) {
  const _arguments = arguments
  let isRun = true
  return () => {
    if (!isRun) {
      return
    }

    isRun = false
    fn.call(this, _arguments)
    setTimeout(() => {
      isRun = true
    }, time)
  }
}

/**
 * 获取URL参数
 * @param {string} url
 * @returns {Object}
 */
export function getUrlObj(url) {
  const params = url.split('?').slice(1).join('&').split('&')
  const obj = {}
  params.forEach(item => {
    const itemArr = item.split('=')
    obj[itemArr[0]] = itemArr.slice(1).join('=')
  })
  return obj
}
