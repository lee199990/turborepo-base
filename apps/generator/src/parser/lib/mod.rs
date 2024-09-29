use clap::Subcommand;

use crate::config::Config;
use crate::parser::lib::new::LibraryParser;

pub mod new;

#[derive(Debug, Subcommand)]
pub enum LibraryOption {
    /// 创建新的本地库
    New(LibraryParser),
}

impl LibraryOption {
    pub fn setup(&mut self, config: &Config) {
        match self {
            LibraryOption::New(lib) => lib.setup(config),
        }
    }
}

// 查找lib包名称
// pub fn query_lib_names(base_path: &str) -> io::Result<Vec<String>> {
//     let mut names: Vec<String> = vec![];
//     let entries = read_dir(base_path)?;
//     for entry in entries {
//         let entry = entry?;
//         let json = read_dir(entry.path())?
//             .filter_map(Result::ok)
//             .filter(|item| item.file_type().is_ok_and(|f| f.is_file()))
//             .find(|item| {
//                 // 查找package.json
//                 item.file_name()
//                     .to_str()
//                     .map(|name| name.contains("package.json"))
//                     .unwrap_or(false) // 文件名包含 "package.json"
//             });
//
//         if let Some(json) = json {
//             let pkg: PackageJson = from_str(&read_to_string(json.path())?)?;
//             names.push(pkg.name)
//         }
//     }
//     Ok(names)
// }
