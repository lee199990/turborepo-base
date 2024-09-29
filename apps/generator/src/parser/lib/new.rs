use std::fs::File;
use std::io;
use std::io::ErrorKind;
use std::path::{Path, PathBuf};

use clap::Args;
use crossterm::style::Stylize;
use heck::ToKebabCase;
use serde_json::{to_writer_pretty, Map, Value};

use crate::config::default::TemplateScope;
use crate::config::Config;
use crate::models::PackageJson;
use crate::utils::{folder, get_package_to_json, log, Transfer};

#[derive(Args, Debug)]
pub struct LibraryParser {
    #[arg(long, short, help = "库的名称")]
    pub name: String,
    #[arg(long, short, help = "添加到指定程序的依赖项")]
    pub app: Option<String>,
    #[arg(long, short, help = "是否可发布的库")]
    pub publish: bool,
    #[arg(long, short, help = "初始化时库版本号", default_value = "0.0.0")]
    version: String,
}

impl LibraryParser {
    pub fn setup(&mut self, config: &Config) {
        self.name = self.name.to_kebab_case();
        let lib = PathBuf::from(&config.workspace.lib.path).join(&self.name);

        if folder::check_duplicate_naming(&lib) {
            log::duplicate_name();
            return;
        }
        folder::transcription_from_template(
            Path::new(&config.workspace.get_template(TemplateScope::Lib)),
            &lib,
            &|content| content.translation("name", &self.name),
        )
        .expect("转录模板文件出错");
        let json = lib.join("package.json");
        if self.publish {
            self.publisher(&json).expect("更新为发布库时出现错误");
        }
        if let Some(app) = &self.app {
            self.add_to(PathBuf::from(&config.workspace.app.path).join(app))
                .expect("添加依赖失败，请手动添加");
        }

        println!("{}：{:?}", "创建成功, 目录为".green(), &lib)
    }

    fn publisher(&self, path: &PathBuf) -> io::Result<()> {
        let mut json: PackageJson = get_package_to_json(path)?;
        json.private = Some(false);
        json.main = Some(String::from("dist/index.js"));
        json.files = Some(vec![String::from("dist/*")]);
        json.version = self.version.clone();
        to_writer_pretty(File::create(path)?, &json)?;
        Ok(())
    }

    fn add_to(&self, path: PathBuf) -> io::Result<()> {
        let app_json = path.join("package.json");
        if !app_json.exists() {
            return Err(io::Error::new(
                ErrorKind::NotFound,
                "找不到目标的package.json",
            ));
        }
        let mut pkg = get_package_to_json(&app_json)?;
        let mut dependencies = if let Some(depend) = pkg.dependencies {
            depend
        } else {
            Map::new()
        };
        dependencies.insert(
            self.name.clone(),
            Value::String(if self.publish {
                self.version.clone()
            } else {
                String::from("workspace:*")
            }),
        );
        pkg.dependencies = Some(dependencies);
        to_writer_pretty(File::create(app_json)?, &pkg)?;
        Ok(())
    }
}
