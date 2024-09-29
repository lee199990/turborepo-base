## 用于生成的代码模板文件夹

### 说明

文件名最前方的下划线将会被移除，此方式是因为跳过某些自动检测配置文件的行为导致代码不受控制。如eslint.config

### 模板内变量说明

```
以下格式表示此为模板变量, 将在生成时动态替换：
--------------------------------------------------------------
    $var    表示为name的变量值， 为camelCase
    $VAR    表示为name的变量值， 为SNAKE_CASE
    $Var    表示为name的变量值， 为PascalCase
    $var$s  表示为name的变量值， 为snake_case
    $var$k  表示为name的变量值， 为kebab-case
```

### 模块内变量

#### 通用

- $name --name cli中输入的name信息

#### app

- $port --port 端口信息

#### app component

- $file --file 端口信息

