#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use std::process::{ Command, Stdio };
use std::io::{ BufRead, BufReader };

// The payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

//Constants.
const TAURI_APP_PIPE: &str = "winemacappsPipe";

fn main() {
  tauri::Builder
    ::default()
    .setup(|app| {
      let handle = app.handle();
      std::thread::spawn(move || {
        let process = Command::new("/bin/bash")
          .stdout(Stdio::piped())
          .arg(format!("{}/{}.sh", "bin", TAURI_APP_PIPE))
          .spawn()
          .expect("Failed to execute command");
        let output = process.stdout.expect("Failed to get stdout handle");
        let reader = BufReader::new(output);

        reader
          .lines()
          .filter_map(|line| line.ok())
          .for_each(|line| {
            println!("{line}");
            tauri::WindowBuilder
              ::new(&handle, line.to_string(), tauri::WindowUrl::App("/".into()))
              .build()
              .unwrap();
          });
      });
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("App failed");
}