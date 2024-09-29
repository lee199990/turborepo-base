use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;

use colored::Colorize;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct Workspace {
    pub app: AppConfig,
    pub lib: LibConfig,
    pub template: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct AppConfig {
    pub path: String,
    pub eslintrc: String,
    pub tsconfig: String,
    pub component: ComponentConfig,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct LibConfig {
    pub path: String,
    pub version: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ComponentConfig {
    pub dir: String,
    pub file_name: String,
}

pub enum TemplateScope {
    App,
    Component,
    Lib,
    Store,
}

impl Workspace {
    pub fn new() -> Self {
        Workspace {
            template: "./template".to_string(),
            app: AppConfig {
                path: "/apps".to_string(),
                eslintrc: ".eslintrc.yaml".to_string(),
                tsconfig: "tsconfig.json".to_string(),
                component: ComponentConfig {
                    dir: "components".to_string(),
                    file_name: "index".to_string(),
                },
            },
            lib: LibConfig {
                path: "/packages".to_string(),
                version: "workspace:*".to_string(),
            },
        }
    }

    pub fn get_template(&self, scope: TemplateScope) -> String {
        match scope {
            TemplateScope::App => {
                format!(r"{}\{}", &self.template, "app")
            }
            TemplateScope::Component => {
                format!(r"{}\{}", &self.template, "component")
            }
            TemplateScope::Lib => {
                format!(r"{}\{}", &self.template, "lib")
            }
            TemplateScope::Store => {
                format!(r"{}\{}", &self.template, "store")
            }
        }
    }
}

fn create_work_toml(path: &str) -> Workspace {
    println!("{}", "正在生成配置文件".blink());
    let mut file = File::create(Path::new(&path)).expect("初始化文件失败，请手动添加");
    let default = Workspace::new();
    file.write_all(toml::to_string(&default).unwrap().as_bytes())
        .expect("写入新文件失败");
    default
}

// 获取工作空间配置，优先从配置文件读取，否则创建新的
pub fn get_workspace(path: &str) -> Workspace {
    File::open(path).map_or_else(
        |_| create_work_toml(path),
        |mut f| {
            let mut str = String::new();
            f.read_to_string(&mut str).expect("读取文件失败");
            toml::from_str(&str).expect("配置文件缺少字段！")
        },
    )
}
