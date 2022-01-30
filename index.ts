

export function parse(json: { [index: string]: any }, name: string) {
    let rows: string[] = [`message ${name}{`]
    if ('object' == typeof json) {
        let i = 1
        for (let k in json) {
            let v = json[k]
            if (v instanceof Array) {
                if (v.length == 0) {
                    console.error('无法识别的数据结构：', k, '未知的数组内容')
                }
                let t = typeof v[0]
                if (t == 'string') {
                    //由字符串构成的数组
                    rows.push(`\trepeated string ${k} = ${i};`)
                } else if ('number' == t) {
                    rows.push(
                        `\trepeated ${k.includes('ID') ? 'uint64' : 'int64'} ${k} = ${i};`
                    )
                } else if ('object' == typeof v[0]) {
                    let tr = parse(v[0], k)
                    rows.unshift(...tr)
                    rows.push(`\t${k} ${k} = ${i};`)
                } else {
                }
            } else if ('object' == typeof v) {
                let tr = parse(v, k)
                rows.unshift(...tr)
                rows.push(`\t${k} ${k} = ${i};`)
            } else if ('string' == typeof v) {
                if (k.match(/\wTime$/)) {
                    rows.push(`\tgoogle.protobuf.Timestamp ${k} = ${i};`)
                } else rows.push(`\tstring ${k} = ${i};`)
            } else if ('number' == typeof v) {
                let t = 'int64'
                if (k.match(/\w+(Status|Type)/)) {
                    t = 'int32'
                }
                rows.push(`\t${k.includes('ID') ? 'uint64' : t} ${k} = ${i};`)
            }
            i++
        }
    }
    rows.push('}')
    return rows
}

export function json2pb(json: any, pack: string, name: string) {
    let rows = [
        `syntax = "proto3";
import "google/protobuf/timestamp.proto";
package ${pack};`
    ]
    if (json instanceof Array) {
        json = json[0]
    }
    let n = parse(json, name)
    rows.push(...n)
    return rows.join('\r\n')
}
// export default 
if (globalThis.window) {
    //@ts-ignore
    globalThis.window.JSON2PB = { json2pb, parse }
}