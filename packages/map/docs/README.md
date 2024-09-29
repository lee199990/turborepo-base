@jmrepo/gismap / [Exports](modules.md)

# 基于Turborepo单项目存储库

    - apps          用于存储各项目
    - packages      公共依赖库
    - bin           脚本文件
    - custom_build  自定义vite config
    - generation_template   生成服务的默认模板

## Using this example

    如需创建新文件，请使用` bin\controller.exe`或使用`pnpm run manager` 参数与上个命令一致
    Commands:
        app        创建新的应用程序
        lib        创建新的lib
        component  创建新的UI组件
        help       Print this message or the help of the given subcommand(s)
    程序会根据generation-template文件夹内的模板来创建对应功能
    如需更改请查看文件夹内的说明.md

    例如：
        新建组件 `pnpm run manager component --name NAME --app APP_NAME`
        会在指定app的src/components下新增组件
