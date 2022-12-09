#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use std::process::{ Command, Stdio };
use std::io::{ BufRead, BufReader };

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

fn main() {
  let app = tauri::Builder
    ::default()
    .build(tauri::generate_context!())
    .expect("error while building tauri application");

  tauri::WindowBuilder::new(&app, "local", tauri::WindowUrl::App("/test".into())).build().unwrap();

  let process = Command::new("/bin/bash")
    .stdout(Stdio::piped())
    .arg("bash/handleApp.sh")
    .spawn()
    .expect("Failed to execute command");

  let output = process.stdout.expect("Failed to get stdout handle");
  let reader = BufReader::new(output);

  reader
    .lines()
    .filter_map(|line| line.ok())
    .for_each(|line| println!("====> {line}"));

  app.run(|_, event| {
    match event {
      tauri::RunEvent::ExitRequested { .. } => {
        Command::new("/bin/bash")
          .arg("echo 'quit' > $TMPDIR/winemacapp")
          .output()
          .expect("Failed to execute command");
      }
      _ => {}
    }
  });
}