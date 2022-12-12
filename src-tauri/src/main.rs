#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use std::process::{ Command, Stdio };
use std::io::{ BufRead, BufReader };
use serde_json::{ from_str };
use serde::Deserialize;
use tauri::Manager;

#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

#[derive(Deserialize, Debug)]
struct Config {
  id: String,
}

#[derive(Deserialize, Debug)]
struct CmdArgs {
  config: Config,
}

fn main() {
  tauri::Builder
    ::default()
    .setup(|app| {
      let handle = app.handle();
      let pipe_path = app.path_resolver().resolve_resource("bin/winemacappsPipe.sh").unwrap();
      let bin_path = app.path_resolver().resolve_resource("bin/winemacapps.sh").unwrap();

      std::thread::spawn(move || {
        let process = Command::new("/bin/bash")
          .stdout(Stdio::piped())
          .arg(pipe_path)
          .spawn()
          .expect("Failed to execute command");
        let output = process.stdout.expect("Failed to get stdout handle");
        let reader = BufReader::new(output);

        reader
          .lines()
          .filter_map(|line| line.ok())
          .for_each(move |line| {
            let args: Vec<&str> = line.split_whitespace().collect();
            let output = Command::new(bin_path.clone())
              .args(args)
              .output()
              .expect("Failed to execute process");
            let stdout = String::from_utf8(output.stdout).unwrap();
            let stderr = String::from_utf8(output.stderr).unwrap();
            let mut window_id: String = "".to_string();

            if stderr != "" {
              println!("{stderr}");
            } else {
              let json: CmdArgs = from_str(stdout.as_str()).unwrap();
              window_id = json.config.id;
            }

            let window = &handle.get_window(window_id.as_str());
            if let None = window {
              tauri::WindowBuilder
                ::new(&handle, window_id, tauri::WindowUrl::App("/".into()))
                .build()
                .unwrap();
            }
          });
      });
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("App failed");
}