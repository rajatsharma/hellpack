use serde_json::{from_str, Value};
use std::env::args;
use std::fs::read_to_string;
use std::io::{self, Write};
use std::process::{Command, Output};

fn main() {
  let _react_eslint_deps = vec![
    "eslint-config-airbnb",
    "eslint-plugin-import",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
  ];

  let _eslint_deps = vec!["eslint-config-airbnb-base", "eslint-config-import"];
  let pattern = args()
    .nth(1)
    .expect("No option given, try again with hellpack eslint");

  if pattern != "eslint" {
    panic!("No config found: {}", pattern)
  }

  let data = read_to_string("package.json").expect("Unable to read package.json");
  let parsed: Value = from_str(&data).expect("Invalid package.json");

  let react_in_dependencies = match parsed["dependencies"].as_object() {
    Some(dependencies) => dependencies.contains_key("react"),
    _ => false,
  };

  let react_in_dev_dependencies = match parsed["devDependencies"].as_object() {
    Some(dependencies) => dependencies.contains_key("react"),
    _ => false,
  };

  let react_in_peer_dependencies = match parsed["devDependencies"].as_object() {
    Some(dependencies) => dependencies.contains_key("react"),
    _ => false,
  };

  let is_react_project =
    react_in_dependencies || react_in_dev_dependencies || react_in_peer_dependencies;

  let eslint_deps = if is_react_project {
    _react_eslint_deps
  } else {
    _eslint_deps
  };

  let handle = eslint_deps
    .iter()
    .fold(Command::new("yrn").arg("add"), |cmd, dep| cmd.arg(dep))
    .arg("-D")
    .spawn();

  match handle {
    Ok(executed) => "Installed eslint successfully",
    Error(err) => panic!("Eslint installation failed"),
  }

  println!("{}", is_react_project);
}
