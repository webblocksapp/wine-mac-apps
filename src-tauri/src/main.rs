#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use std::process::{ Command, Stdio };
use std::io::{ BufRead, BufReader };
use std::thread;
use tauri::App;

struct WindowOptions {
  label: String,
}

// The payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

//Constants.
const TAURI_APP_PIPE: &str = "winemacappsPipe";

// A window is builded with the given options.
fn build_window(app: &App, options: WindowOptions) {
  tauri::WindowBuilder::new(app, options.label, tauri::WindowUrl::App("/".into())).build().unwrap();
}

// Initializes a pipe to pass arguments to the running
// program through console, for example:
// echo "Now I can send info as expected" > $TMPDIR/winemacappspipe
fn init_app_pipe() {
  thread::spawn(|| {
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
      .for_each(|line| { println!("====> {line}") });
  });
}

fn main() {
  let app = tauri::Builder
    ::default()
    .build(tauri::generate_context!())
    .expect("error while building tauri application");

  let main_window_opts = WindowOptions {
    label: "main".to_string(),
  };

  build_window(&app, main_window_opts);
  init_app_pipe();

  app.run(|_, event| {
    match event {
      tauri::RunEvent::ExitRequested { .. } => {
        Command::new("/bin/bash")
          .arg("echo 'quit' > $TMPDIR/winemacappspipe")
          .output()
          .expect("Failed to execute command");
      }
      _ => {}
    }
  });
}