use serde::{Deserialize, Serialize};
use serde_json::{Map, Value};

#[derive(Deserialize, Serialize, Debug)]
pub struct PackageJson {
    pub name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub private: Option<bool>,
    pub version: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub main: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub module: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub types: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub files: Option<Vec<String>>,
    pub dependencies: Option<Map<String, Value>>,
    #[serde(rename = "devDependencies")]
    pub dev_dependencies: Option<Map<String, Value>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub scripts: Option<Map<String, Value>>,
    #[serde(flatten)]
    pub other: Value,
}
