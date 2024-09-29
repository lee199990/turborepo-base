use std::io::Error;

use colored::Colorize;

pub fn duplicate_name() {
    println!("{}", "存在重复命名".yellow())
}

pub fn create_dir_fail(err: Error) {
    println!("{}. 因为：{:?}", "创建目录失败".red(), err)
}
