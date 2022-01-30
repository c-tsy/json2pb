import { readFileSync, writeFileSync } from 'fs'
import { basename, extname, dirname, join } from 'path'
import { json2pb } from '.'
let file = basename(process.argv[2])
if ('.json' != extname(file)) {
    console.warn('文件格式错误')
}
let dir = dirname(process.argv[2])
let name = file.replace('.json', '')
writeFileSync(
    join(dir, name + '.pb'),
    json2pb(
        JSON.parse(readFileSync(process.argv[2], { encoding: 'utf8' })),
        process.argv[3] || name,
        process.argv[4] || name
    )
)