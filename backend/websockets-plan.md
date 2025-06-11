buyers sellers communicate real time.
basic text chatroom, max 2 people
ascending order
limiting to 300 chars
new messages once the socket opens(no previous messages)
db: message_id, sender_id, reciever_id, text, time(utc)


make sure that:
the connection can be opened
can be closed

on open display something to both users
recognize users(that they are different people)
when a message is sent, the sender knows that the message was sent
as reciever you need to be told that a message was sent to you

optional/strech: "ngrok" (for two team memebers to use the same backend for communicating)

Frontend:
message bubble showing up
sort in order
component for chat bubble
comp for input
comp for message page
make custom hook
enter, leave, send etc icons


