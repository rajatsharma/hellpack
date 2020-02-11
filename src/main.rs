use serde_json::{from_str, json, to_string_pretty, Value};
use std::env::args;
use std::fs::{read_to_string, write};
use std::io::Error;
use std::process::Command;

fn write_eslint_rc(eslint_deps: Vec<&str>) -> Result<(), Error> {
  let (config, plugins) = eslint_deps.split_at(1);
  let contents = json!({ "extends": config, "plugins": plugins });
  write(".eslintrc", to_string_pretty(&contents).unwrap())?;
  Ok(())
}

fn main() -> Result<(), Error> {
  let _react_eslint_deps = vec![
    "eslint-config-airbnb",
    "eslint-plugin-import",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
  ];

  println!("Hellpack working...🛠");

  let _eslint_deps = vec!["eslint-config-airbnb-base", "eslint-plugin-import"];
  let pattern = args()
    .nth(1)
    .expect("No option given, try again with hellpack eslint 🤷🏻‍♂️");

  if pattern != "eslint" {
    panic!("No config found: {} ☹️", pattern)
  }

  let data = read_to_string("package.json").expect("Unable to read package.json 😵");
  let parsed: Value = from_str(&data).expect("Invalid package.json ❌");

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
    .fold(Command::new("yarn").arg("add"), |cmd, dep| cmd.arg(dep))
    .arg("-D")
    .spawn();

  match handle {
    Ok(mut c) => {
      c.wait()?;
      println!("Installed eslint successfully 🚀");
      write_eslint_rc(eslint_deps)?;
    }
    Err(err) => {
      println!("Eslint installation failed: {} 🤷🏻‍♂️", err);
      write_eslint_rc(eslint_deps)?;
    }
  }

  Ok(())
}
