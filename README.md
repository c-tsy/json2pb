# JSON2PB，一个JSON内容转为protobuf格式文件的工具
安装方法： 

yarn add @ctsy/json2pb

或

npm i @ctsy/json2pb

## 支持网页引用，支持Nodejs使用，支持命令行调用
## 使用案例：

支持cdn引入：
```html
<script src="https://cdn.jsdelivr.net/npm/@ctsy/json2pb/prod.min.js"></script>
<!-- 全局对象为 JSON2PB -->
<!-- 若使用webpack进行CDN打包配置则配置为 -->
<!-- "@ctsy/json2pb":"JSON2PB" -->
```

```typescript
import {json2pb} from '@ctsy/json2pb'

var pbcontent = json2pb({"abc":"abc",d:[1,2,3]},"包名","对象名称")

console.log(pbcontent)

```
### 输出内容
```proto
syntax = "proto3";
import "google/protobuf/timestamp.proto";
package test;
message method{
	string abc = 1;
	repeated int64 d = 2;
}
```

## 命令行使用或全局使用
```shell
yarn global add @ctsy/json2pb

# json2pb json文件路径 包名 根对象名称
json2pb dist/test.json test method
# 该命令将在dist目录下读取test.json文件并在该目录下生成test.proto文件
```

更多修改请参见bin.js文件

## 技术支持

可以提供付费级别的protobuf编码技术支持，系统性能优化方案及实施落地支持。
通过Git联系或微信yanpengquan联系
