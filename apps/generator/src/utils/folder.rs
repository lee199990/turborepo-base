use std::io::Write;
use std::path::{Path, PathBuf};
use std::{fs, io};

pub fn find_file_upward(file_name: &str, location: &PathBuf) -> Option<PathBuf> {
    let mut current_path = location.as_path();

    loop {
        let file_path = current_path.join(file_name);
        if file_path.exists() {
            return Some(current_path.to_owned());
        }

        if let Some(parent_path) = current_path.parent() {
            if parent_path == current_path {
                // 到达根目录，结束查找
                break;
            }
            current_path = parent_path;
        } else {
            // 无法获取父目录，结束查找
            break;
        }
    }

    None
}

// 根据模板文件夹写入目标目录
pub fn transcription_from_template<F>(source: &Path, target: &Path, handle: &F) -> io::Result<()>
where
    F: Fn(String) -> String,
{
    // 获取源文件夹中的所有项
    let entries = fs::read_dir(source)?;

    for entry in entries {
        let entry = entry?;
        let entry_path = entry.path();
        // 构建目标路径,移除模板文件名前方的_
        let destination_path =
            target.join(entry.file_name().to_str().unwrap().trim_start_matches("_"));
        // 判断当前项是文件还是文件夹
        if entry_path.is_file() {
            // 如果是文件，先创建上层目录，然后写入
            fs::create_dir_all(destination_path.parent().unwrap())?;
            fs::File::create(&destination_path)?
                .write_all(handle(fs::read_to_string(entry_path)?).as_bytes())?
        } else if entry_path.is_dir() {
            // 如果是文件夹，递归拷贝
            transcription_from_template(&entry_path, &destination_path, handle)?;
        }
    }

    Ok(())
}

pub fn check_duplicate_naming(path: &PathBuf) -> bool {
    path.is_dir() && path.exists()
}
