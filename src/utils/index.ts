
import moment from 'moment'

/**
 * 
 * @param type 文件种类 image/script/
 * @param name 文件名
 */
export const getAssetsFile = (type: string, name: string): string => {
    return new URL(`../assets/${type}/${name}`, import.meta.url).href
}
/**
 * 
 * @param time 时间
 * @param exactType 精确到哪一位
 */
export const formatTime = (time: string | number, exactType: string = 'm'): string => {
    interface FormatType {
        [key: string]: string
    }
    const map: FormatType = {
        m: 'YY/MM/DD HH:mm',
        mh: 'YY/MM/DD hh:mm',
        H: 'YY/MM/DD HH',
        D: 'YY/MM/DD',
        M: 'YY/MM'
    }
    const formatType = map[exactType]
    return moment(time).format(formatType)
}
const dupByteReg = /[\u4e00-\u9fa5]/g // 中文
const singByteReg = /[\dA-Za-z_~@#$%^&*(:;/|]/g
/**
 * 计算字节个数
 * @param str 
 */
export const computeByteLen = (str: string):number => {
    const dupBytes:number = (str.match(dupByteReg)?.length ?? 0) * 2
    const singBytes: number = str.match(singByteReg)?.length ?? 0
    return dupBytes + singBytes
}

export const lessThenBytes = (str: string, limit: number):string => {
    if (str === '') return ''
    let newStr = ''
    let index = 0 // str索引
    let count = 0 // 当前字节数
    while (count < limit && index < str.length) {
        if (dupByteReg.test(str[index])) {
            count+=2
        }else {
            count++
        }
        newStr+=str[index]
        index++
    }
    return index < str.length ? newStr + '...' : newStr
}