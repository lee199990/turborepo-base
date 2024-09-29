use std::io;
use std::path::{Component, Path, PathBuf};

// 标准化路径的替代函数
pub fn normalize_path<P: AsRef<Path>>(path: P) -> PathBuf {
    let ends_with_slash = path.as_ref().to_str().map_or(false, |s| s.ends_with('/'));
    let mut normalized = PathBuf::new();
    for component in path.as_ref().components() {
        match &component {
            Component::ParentDir => {
                if !normalized.pop() {
                    normalized.push(component);
                }
            }
            _ => {
                normalized.push(component);
            }
        }
    }
    if ends_with_slash {
        normalized.push("");
    }
    normalized
}

// 将路径合并为绝对路径
pub fn combined_path(root: &PathBuf, current: &PathBuf, path_str: &str) -> io::Result<String> {
    let path = Path::new(path_str);

    let next_path = if path.is_absolute() {
        // 带有盘符的绝对路径，原样返回
        path.to_path_buf()
    } else if path.has_root() {
        // 传入的为/开头的，应该为root开始
        root.join(path.strip_prefix("/").unwrap())
    } else {
        // 传入相对路径，则为程序执行目录
        normalize_path(current.join(path))
    };

    Ok(next_path.to_string_lossy().into_owned())
}
