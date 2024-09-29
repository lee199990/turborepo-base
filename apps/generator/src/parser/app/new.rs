use clap::value_parser;
use clap::Args;
use crossterm::style::Stylize;
use heck::ToKebabCase;
use std::path::{Path, PathBuf};

use crate::config::default::TemplateScope;
use crate::config::Config;
use crate::utils::log::create_dir_fail;
use crate::utils::{folder, log, use_powershell, Transfer};

#[derive(Args, Debug)]
pub struct ApplicationParser {
    #[arg(long, short, help = "App程序名称，仅支持创建React程序")]
    pub name: String,
    #[arg(long, short, help = "应用默认端口", default_value_t = 8000, value_parser = value_parser ! (u16).range(1..))]
    pub port: u16,
}

impl ApplicationParser {
    pub fn setup(&mut self, config: &Config) {
        self.name = self.name.to_kebab_case();
        let app = PathBuf::from(&config.workspace.app.path).join(&self.name);
        if folder::check_duplicate_naming(&app) {
            log::duplicate_name();
            return;
        }
        folder::transcription_from_template(
            Path::new(&config.workspace.get_template(TemplateScope::App)),
            &app,
            &|content| {
                content
                    .translation("name", &self.name)
                    .translation("port", &self.port.to_string())
            },
        )
        .unwrap_or_else(create_dir_fail);

        use_powershell(config.get_root(), "pnpm install").expect("自动更新依赖失败，请手动更新");
        println!("{}，目标路径为: {:?}", "创建成功".green(), app)
    }
}
