use crate::ast::parser::AstParser;
use crate::ast::store::AstStoreSlice;
use crate::config::default::TemplateScope;
use crate::config::Config;
use crate::utils::{folder, log, use_powershell, Transfer};
use clap::Args;
use colored::Colorize;
use heck::{ToKebabCase, ToUpperCamelCase};
use oxc::ast::VisitMut;
use oxc::codegen::{Codegen, CodegenOptions};
use std::fs;
use std::path::PathBuf;

const STORE_NAME_HELP: &str = "Store切片名称, 影响所有导出的命名";
const STORE_APP_HELP: &str = "添加到指定程序, 默认添加到全局";
const STORE_MODULE_HELP: &str = "指定添加的路由模块, 尚不支持嵌套. 仅在app下支持此参数";

#[derive(Args, Debug)]
pub struct StoreParser {
    #[arg(long, short, help = STORE_NAME_HELP)]
    pub name: String,
    #[arg(long, short, help = STORE_APP_HELP)]
    pub app: Option<String>,
    #[arg(long, short, requires = "app", help = STORE_MODULE_HELP, default_value = "main")]
    pub module: Option<String>,
}

impl StoreParser {
    pub fn setup(&mut self, config: &Config) {
        self.name = self.name.to_kebab_case();

        if let Some(_) = &self.app {
            println!("{}", "开发中，暂不可用".red());
            return;
        }

        let target = if let Some(app) = &self.app {
            PathBuf::from(&config.workspace.app.path)
                .join(app)
                .join("src\\store")
        } else {
            PathBuf::from(&config.workspace.lib.path).join("store\\lib")
        };

        let folder = target.join(&self.name);
        if folder::check_duplicate_naming(&folder) {
            log::duplicate_name();
            return;
        }
        let temp = config.workspace.get_template(TemplateScope::Store);

        folder::transcription_from_template(&PathBuf::from(&temp), &folder, &|content| {
            content.translation("name", &self.name)
        })
        .unwrap_or_else(log::create_dir_fail);
        // println!("temp:{}", temp);
        println!("target:{:?}", target);
        match self.insert(&target) {
            Ok(file) => {
                use_powershell(
                    config.get_root(),
                    &format!("eslint {:?} --fix", file.into_os_string()),
                )
                .unwrap();
            }
            Err(e) => println!("自动添加失败，因为：{:?}。 请尝试手动添加", e),
        }
        println!("{}", "创建成功".green())
    }

    fn insert(&self, target: &PathBuf) -> anyhow::Result<PathBuf> {
        let file = target.join("store.ts");
        let parser = AstParser::new(file.as_path());
        let mut ret = parser.get_ret();
        let key = format!("NAMESPACE_{}", &self.name.to_uppercase());
        let value = format!("persistReducerOf{}", &self.name.to_upper_camel_case());
        let mut ast = AstStoreSlice::new(&parser.allocator, format!("[{}]", key), value.to_owned());
        ast.visit_program(&mut ret.program);
        let options = CodegenOptions {
            enable_source_map: false,
            enable_typescript: true,
        };

        let mut printed = Codegen::<false>::new("", &parser.source, options.clone())
            .build(&ret.program)
            .source_text;

        printed.insert_str(
            0,
            format!(
                "import {{ {}, {} }} from './{}'\n",
                &key, &value, &self.name
            )
            .as_str(),
        );

        fs::write(&file, printed)?;
        Ok(file)
    }
}
