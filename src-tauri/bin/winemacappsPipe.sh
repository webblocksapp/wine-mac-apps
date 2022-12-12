TAURI_APP_PIPE="winemacappspipe"
rm "${TMPDIR}${TAURI_APP_PIPE}"
mkfifo "${TMPDIR}${TAURI_APP_PIPE}"
while [[ $DATA != 'quit' ]]
do
DATA=$(cat "${TMPDIR}${TAURI_APP_PIPE}")
echo $DATA
done