result=`osascript -e 'display dialog "Should I beep?" buttons {"Yes", "No"}'`
if [[ "$result" = "button returned:Yes" ]]; then
    osascript -e 'beep'
fi