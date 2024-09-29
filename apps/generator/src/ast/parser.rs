use oxc::allocator::Allocator;
use oxc::parser::{Parser, ParserReturn};
use oxc::span::SourceType;
use std::fs;
use std::path::Path;

pub struct AstParser {
    pub allocator: Allocator,
    pub source: String,
    pub source_type: SourceType,
}

impl AstParser {
    pub fn new(path: &Path) -> AstParser {
        let source_text = fs::read_to_string(path).expect("无法读取源文件");
        let allocator = Allocator::default();
        AstParser {
            source: source_text,
            source_type: SourceType::from_path(path).unwrap(),
            allocator,
        }
    }

    pub fn get_ret(&self) -> ParserReturn {
        Parser::new(&self.allocator, &self.source, self.source_type.clone()).parse()
    }
}
