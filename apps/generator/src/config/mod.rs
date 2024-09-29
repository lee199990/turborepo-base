use crate::config::default::{get_workspace, Workspace};
use crate::utils::folder;
use crate::utils::path::combined_path;
use colored::Colorize;
use serde::Deserialize;
use std::fmt::Debug;
use std::fs::read_dir;
use std::path::PathBuf;
use std::process::exit;
use std::sync::OnceLock;
use std::{env, fs};

pub mod default;

pub static SETTING: OnceLock<Config> = OnceLock::new();

#[derive(Debug, Deserialize)]
pub struct Config {
    pub path: Paths,
    pub workspace: Workspace,
}

#[derive(Debug, Deserialize)]
pub struct Paths {
    // 程序根目录
    pub root: PathBuf,
    // 程序所在目录
    pub current: PathBuf,
}

impl Config {
    pub fn new() -> Self {
        // 读取配置文件位置，优先使用env变量
        let path = env::var("CONFIG_PATH").map_or(String::from("application.toml"), |v| v);
        // 获取程序目录
        let exe = env::current_exe().expect("读取程序目录失败");
        let execute = env::current_dir().unwrap();
        let current = exe.parent().unwrap();
        // 获取软件包根目录
        let root = folder::find_file_upward("turbo.json", &execute).expect("读取根目录失败");
        // 默认得配置文件信息
        let workspace = get_workspace(&path);
        // 创建配置信息
        let mut config = Config {
            path: Paths {
                root,
                current: current.to_owned(),
            },
            workspace,
        };
        let Paths { root, current } = &config.path;
        config.workspace.app.path =
            combined_path(root, current, &config.workspace.app.path).unwrap();
        config.workspace.lib.path =
            combined_path(root, current, &config.workspace.lib.path).unwrap();
        // 如果是开发环境 读取运行目录的template目录
        config.workspace.template = combined_path(
            root,
            if cfg!(debug_assertions) {
                &execute
            } else {
                &current
            },
            &config.workspace.template,
        )
        .unwrap();

        if !config.check_temp() {
            exit(0)
        }

        config
    }

    pub fn get_root(&self) -> &PathBuf {
        &self.path.root
    }

    fn check_temp(&self) -> bool {
        let temp_dir = match read_dir(&self.workspace.template) {
            Ok(dir) => dir,
            Err(_) => {
                println!("{}", "模板目录不存在，请补充内容。 程序即将停止".red());
                fs::create_dir(&self.workspace.template).expect("自动生成失败，请手动创建");
                return false;
            }
        };

        if temp_dir.into_iter().next().is_none() {
            println!("{}", "模板目录为空！程序即将停止".red());
            return false;
        }
        true
    }
}
