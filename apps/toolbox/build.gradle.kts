plugins {
    id("java")
    id("org.jetbrains.kotlin.jvm") version "1.9.21"
    id("org.jetbrains.intellij") version "1.16.1"
}

group = "crescent"
version = "1.1.0"

repositories {
//    mavenCentral()
    maven { url = uri("https://maven.aliyun.com/repository/central") }
    maven { url = uri("https://maven.aliyun.com/repository/public") }
    maven { url = uri("https://maven.aliyun.com/repository/public/") }
    maven { url = uri("https://maven.aliyun.com/repository/google/") }
    maven { url = uri("https://maven.aliyun.com/repository/jcenter/") }
    maven { url = uri("https://maven.aliyun.com/repository/gradle-plugin") }
}

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

// Configure Gradle IntelliJ Plugin
// Read more: https://plugins.jetbrains.com/docs/intellij/tools-gradle-intellij-plugin.html
intellij {
    // 运行构建的编辑器版本
    version.set("2023.1.5")
//    type.set("IU") // 默认会下载社区版IC，如需更多语言支持请更改为IU
//    localPath.set("E:\\Applcation\\IntelliJ IDEA 2023.3.2")
//    plugins.set(listOf(/* Plugin Dependencies */)) //插件依赖 例如TS语法开发 增加JavaScript
}

tasks {
    buildSearchableOptions {
        enabled = false
    }

    patchPluginXml {
        version.set("${project.version}")
        sinceBuild.set("231")
        untilBuild.set("233.*")
    }

    compileKotlin {
        kotlinOptions.jvmTarget = "17"
    }

    compileTestKotlin {
        kotlinOptions.jvmTarget = "17"
    }
}
