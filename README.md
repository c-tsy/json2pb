# JSON2PB，一个JSON内容转为protobuf格式文件的工具
安装方法： 

yarn add @ctsy/json2pb
或
npm i @ctsy/json2pb

## 支持网页引用，支持Nodejs使用，支持命令行调用
## 使用案例：

```typescript
import {json2pb} from '@ctsy/json2pb'

var pbcontent = json2pb({"abc":"abc",d:[1,2,3]},"包名","对象名称")

console.log(pbcontent)

```
### 输出内容
```
syntax = "proto3";
import "google/protobuf/timestamp.proto";
package test;
message method{
	string abc = 1;
	repeated int64 d = 2;
}
```

更多修改请参见bin.js文件