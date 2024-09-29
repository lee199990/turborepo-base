# 基于Turborepo单项目存储库

    - apps          用于存储各项目
    - packages      公共依赖库
    - bin           脚本文件
    - config        存储库的配置文件
    - custom_build  自定义vite config
---

## 如何使用？
推荐使用base库中已经发布的版本 可以使用tags命令查询  
以下说明使用main分支本体 如需使用tag，直接切换名称为tag name即可

1. 新建仓库 同时在本地拉取
2. 新建dev分支并切换
3. git增加新的远程分支，地址填写为base库。![img.png](docs/assets/img.png)
4. 提取分支信息
5. 使用`git pull base main  --allow-unrelated-histories` 强制拉取main分支代码

> 此时代码已经同步，但会存在base库的提交记录，在开发过程中可能会对git操作造成困扰。以下操作用于清除提交记录（推荐）

1. 切换到新的分支
`git checkout --orphan latest_branch`
说明：git checkout --orphan 的核心用途是 以类似git init的状态创建新的非父分支，也就是创建一个无提交记录的分支。

2. 缓存所有文件（除了.gitignore中声明排除的）
`git add -A`

3. 提交跟踪过的文件（Commit the changes）
`git commit -am “reset init”`

4. 删除master分支（Delete the branch）
`git branch -D dev`

5. 重命名当前分支为dev（Rename the current branch to master）
`git branch -m dev`

6. 提交到远程dev分支 （Finally, force update your repository）
`git push -f origin dev`

> 此分支目前历史提交记录已经干净，如果需要同步base库的最新代码  请直接拉取对应提交记录
---

## 脚本
[generator程序](./bin/gen/README.md) 

---

## TODO List
[generator待办](./docs/gen.todo.md)

---

## 其他
- 如果需要对其他库提出修改意见 请在doc目录下查找对应的todo 如果没有请新增 name.todo.md 并通知对方
- 如过对此版本库进行了破坏性更新，增加changelog。

---
