## 使用手册
适用于单存储库的前端规范化生成工具  
### 使用方法

项目跟目录运行 `pnpm gen [option]` 或者指定完整路径 `./bin/gen/generator [option]` 运行程序  
如创建公共库可以使用 `pnpm gen lib new --name test-lib`  

使用 help / -h 查看详细用法

### 参数说明
pnpm gen 【COMMAND】 【COMMAND2】 --options

不带参数时 默认会启用UI模式（开发中， 暂不可用）

```text
    help / -h       显示帮助, 每个子命令下都可以运行此选项
    -v              显示版本
```

#### COMMAND:  
##### app         应用程序相关，包括新建程序/组件/路由等
```text
new     创建新的应用程序  
        Usage: generator app new [OPTIONS] --name <NAME>
        Options:  
          -n, --name <NAME>  App程序名称，仅支持创建React程序  
          -p, --port <PORT>  应用默认端口 [default: 8000]  
          -h, --help         Print help  
  
comp    创建新的程序组件
        Usage: generator app comp [OPTIONS] --name <NAME>
        Options:
          -n, --name <NAME>  组件的名称，如:Button
          -f, --file <FILE>  组件的文件名，默认为配置项的file_name
          -a, --app <APP>    在指定APP下创建组件,默认为apps目录下第一个程序
          -s, --style        是否导入样式表，默认导入
          -p, --path <PATH>  组件位置，默认为配置项的dir
  
help    Print this message or the help of the given subcommand(s)`
```

---

##### lib         程序包相关，包括新建库/更新等
```text
new     创建新的本地库
        Usage: generator lib new [OPTIONS] --name <NAME>
        
        Options:
          -n, --name <NAME>        库的名称
          -a, --app <APP>          添加到指定程序的依赖项
          -p, --publish            是否可发布的库
          -v, --version <VERSION>  初始化时库版本号 [default: 0.0.0]
          -h, --help               Print help
```

---

##### lib         其他实用公共工具程序
```text
store   创建新的本地库
        Usage: generator util store [OPTIONS] --name <NAME>
        
        Options:
          -n, --name <NAME>      Store切片名称, 影响所有导出的命名
          -a, --app <APP>        添加到指定程序, 默认添加到全局
          -m, --module <MODULE>  指定添加的路由模块, 尚不支持嵌套. 仅在app下支持此参数 [default: main]
          -h, --help             Print help
```
