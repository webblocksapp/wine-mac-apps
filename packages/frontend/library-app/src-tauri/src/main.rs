#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use std::process::{ Command, Stdio };
use std::io::{ BufRead, BufReader };
use serde_json;
use serde::Deserialize;
use tauri::{ Manager, WindowEvent };

#[derive(Clone, serde::Serialize)]
struct Payload {
  data: String,
}

#[derive(Deserialize, Debug)]
struct Config {
  id: String,
}

#[derive(Deserialize, Debug)]
struct CmdArgs {
  config: Config,
  url: String,
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
            let mut window_url: String = "".to_string();
            let mut cmd_args: String = "".to_string();

            if stderr != "" {
              println!("{stderr}");
            } else {
              let stodout_str = stdout.as_str();
              let json: CmdArgs = serde_json::from_str(stodout_str).unwrap();
              window_id = json.config.id;
              window_url = json.url;
              cmd_args = stodout_str.to_string();
            }

            let window = handle.get_window(window_id.as_str());
            if let None = window {
              tauri::WindowBuilder
                ::new(&handle, &window_id, tauri::WindowUrl::App(window_url.into()))
                .build()
                .unwrap();
            }

            let window = handle.get_window(window_id.as_str()).unwrap();
            let mut window_ = window.clone();
            let window_id = window.listen("mounted", move |_| {
              println!("App Mounted");
              window_.emit("cmd-args", Payload { data: cmd_args.to_string().into() }).unwrap();
            });

            window_ = window.clone();
            window.on_window_event(move |event| {
              if let WindowEvent::Destroyed = event {
                println!("Window destroyed");
                window_.unlisten(window_id);
              }
            })
          });
      });
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("App failed");
}