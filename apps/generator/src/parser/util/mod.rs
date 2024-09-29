use clap::Subcommand;

use crate::config::Config;
use crate::parser::util::store::StoreParser;

pub mod store;

#[derive(Debug, Subcommand)]
pub enum UtilOption {
    /// 创建新的本地库
    Store(StoreParser),
}

impl UtilOption {
    pub fn setup(&mut self, config: &Config) {
        match self {
            UtilOption::Store(store) => store.setup(config),
        }
    }
}
