use crate::cli::{Cli, Commands};
use crate::config::{Config, SETTING};
use clap::Parser;
use colored::Colorize;
use dotenv;
use std::env;

mod ast;
mod cli;
mod config;
mod models;
mod parser;
mod ui;
mod utils;

fn main() {
    dotenv::dotenv().ok();
    let config = SETTING.get_or_init(|| Config::new());
    if env::args().len() < 2 {
        println!("{}\n", "正在使用UI模式...".green());
        println!("{}\n", "开发中！暂不可用".red());
        return;
    }
    let cli = Cli::parse();

    if let Some(command) = cli.command {
        match command {
            Commands::App(mut app) => app.setup(config),
            Commands::Lib(mut lib) => lib.setup(config),
            Commands::Util(mut util) => util.setup(config),
        }
    }
}
