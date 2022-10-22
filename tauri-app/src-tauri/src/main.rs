#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn roman_to_int(s: String) -> i32 {
    let mut sum: i32 = 0;
    let mut last: i32 = 0;
    for c in s.chars().rev() {
        let current: i32 = roman_char_to_int(c);
        if current >= last {
            sum += current;
        } else {
            sum -= current;
        }
        last = current;
    }
    sum
}

fn roman_char_to_int(c: char) -> i32 {
    match c {
        'I' => 1,
        'V' => 5,
        'X' => 10,
        'L' => 50,
        'C' => 100,
        'D' => 500,
        'M' => 1000,
        _ => 0,
    }
}

#[tauri::command]
fn append_vec(a: Vec<i32>, b: Vec<i32>) -> Vec<i32> {
    println!("{:#?}", a);
    a.into_iter().chain(b.into_iter()).collect()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, roman_to_int,append_vec])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
