mkfifo "${TMPDIR}winemacapp"
while [[ $DATA != 'quit' ]]
do
DATA=$(cat "${TMPDIR}winemacapp")
echo $DATA
done
rm "${TMPDIR}winemacapp"