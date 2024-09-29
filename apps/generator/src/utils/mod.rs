use crate::models::PackageJson;
use crossterm::style::Stylize;
use heck::{ToKebabCase, ToLowerCamelCase, ToSnakeCase, ToUpperCamelCase};
use serde_json::from_str;
use std::fs::read_to_string;
use std::io::{BufRead, ErrorKind};
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};
use std::{env, io};

pub mod folder;
pub mod log;
pub mod path;
pub mod string;

/// 提供字符串替换的相关方法
pub trait Transfer {
    fn translation(self, key: &str, value: &str) -> String;
}

impl Transfer for &str {
    fn translation(self, key: &str, value: &str) -> String {
        let replacements = [
            (format!("${}$s", key), value.to_snake_case()),
            (format!("${}$k", key), value.to_kebab_case()),
            (format!("${}", key), value.to_lower_camel_case()),
            (format!("${}", key.to_uppercase()), value.to_uppercase()),
            (
                format!("${}", string::uppercase_first_letter(key)),
                value.to_upper_camel_case(),
            ),
        ];

        replacements
            .iter()
            .fold(self.to_owned(), |acc, (pattern, replacement)| {
                acc.replace(pattern, replacement)
            })
    }
}

pub fn get_package_to_json(base: &PathBuf) -> io::Result<PackageJson> {
    let pkg_content = read_to_string(base)?;
    Ok(from_str(&pkg_content)?)
}

pub fn use_powershell<P: AsRef<Path>>(execute_dir: P, command: &str) -> anyhow::Result<bool> {
    // 切换工作目录到跟目录
    env::set_current_dir(execute_dir)?;
    let mut command = Command::new("powershell")
        .arg("-Command")
        .arg(command)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()?;

    let stdout = command
        .stdout
        .take()
        .ok_or(io::Error::new(ErrorKind::Other, "Failed to get stdout"))?;
    let stderr = command
        .stderr
        .take()
        .ok_or(io::Error::new(ErrorKind::Other, "Failed to get stdout"))?;

    let stdout_reader = io::BufReader::new(stdout);
    let stderr_reader = io::BufReader::new(stderr);
    let prefix = "-->".green();
    // 读取 stdout
    for line in stdout_reader.lines() {
        if let Ok(line) = line {
            println!("{} {}", &prefix, line);
        }
    }

    // 读取 stderr
    for line in stderr_reader.lines() {
        if let Ok(line) = line {
            println!(">>> {}", line.red());
        }
    }

    let status = command.wait()?;
    Ok(status.success())
}
