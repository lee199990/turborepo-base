use crate::config::default::{AppConfig, TemplateScope};
use crate::config::Config;
use crate::utils::{folder, log, Transfer};
use clap::Args;
use colored::Colorize;
use std::fs::read_dir;
use std::path::{Path, PathBuf};

#[derive(Args, Debug)]
pub struct ComponentParser {
    #[arg(long, short, help = "组件的名称，如:Button")]
    pub name: String,
    #[arg(long, short, help = "组件的文件名，默认为配置项的file_name")]
    pub file: Option<String>,
    #[arg(
        long,
        short,
        help = "在指定APP下创建组件,默认为apps目录下第一个存在package.json的程序"
    )]
    pub app: Option<String>,
    #[arg(long, short, help = "是否导入样式表，默认导入")]
    pub style: bool,
    #[arg(long, short, help = "组件位置，默认为配置项的dir")]
    pub path: Option<String>,
}

impl ComponentParser {
    pub fn setup(&self, config: &Config) {
        let AppConfig {
            path, component, ..
        } = &config.workspace.app;

        let app = self
            .get_app(path)
            .expect("获取APP目录失败，请检查名称是否正确");

        // 创建目标文件夹, 默认src/components
        let target_path = self.path.as_deref().unwrap_or(&component.dir);
        let component_path = app.join(format!(r"src\{}\{}", target_path, &self.name));
        let file_name = if let Some(file) = &self.file {
            file
        } else {
            &component.dir
        };
        folder::transcription_from_template(
            Path::new(&config.workspace.get_template(TemplateScope::Component)),
            &component_path,
            &|content| {
                content
                    .translation("name", &self.name)
                    .translation("file", file_name)
            },
        )
        .unwrap_or_else(log::create_dir_fail);

        println!(
            "创建组件{}， 目标路径为：{:?}",
            "成功".green(),
            component_path
        )
    }

    fn get_app(&self, root: &str) -> Option<PathBuf> {
        self.app
            .as_ref()
            .map(|app| PathBuf::from(root).join(app))
            .and_then(|path| if path.is_dir() { Some(path) } else { None })
            .or_else(|| {
                read_dir(root).ok()?.find_map(|entry| {
                    let path = entry.ok()?.path();
                    if path.is_dir() {
                        Some(path)
                    } else {
                        None
                    }
                })
            })
    }
}
