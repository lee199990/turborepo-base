use clap::{Parser, Subcommand};

use crate::parser::app::ApplicationOption;
use crate::parser::lib::LibraryOption;
use crate::parser::util::UtilOption;

#[derive(Parser)]
#[command(
    author = "lee",
    version,
    about = "适用于单存储库的前端规范化生成工具"
)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Option<Commands>,
}

#[derive(Debug, Subcommand)]
pub enum Commands {
    /// 应用程序相关，包括新建程序/组件/路由等
    #[command(subcommand)]
    App(ApplicationOption),
    /// 程序包相关，包括新建库/更新等
    #[command(subcommand)]
    Lib(LibraryOption),
    /// 其他实用公共工具程序
    #[command(subcommand)]
    Util(UtilOption),
}
