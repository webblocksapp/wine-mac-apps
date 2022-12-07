#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use std::env;

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let _app = app.handle();            
            app.listen_global("app-mounted", move |_| {                                                
                for argument in env::args() {
                    println!("{argument}");
                }
                _app.emit_all("event-name", Payload { message: "Tauri is awesome!".into() }).unwrap();
            });          
            Ok(())
        })        
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
