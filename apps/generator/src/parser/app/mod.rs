use clap::Subcommand;

use component::ComponentParser;
use new::ApplicationParser;

use crate::config::Config;

pub mod component;
pub mod new;

#[derive(Debug, Subcommand)]
pub enum ApplicationOption {
    /// 创建新的应用程序
    New(ApplicationParser),
    /// 创建新的程序组件
    Comp(ComponentParser),
}

impl ApplicationOption {
    pub fn setup(&mut self, config: &Config) {
        match self {
            ApplicationOption::New(app) => app.setup(config),
            ApplicationOption::Comp(component) => component.setup(config),
        }
    }
}
