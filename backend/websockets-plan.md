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


Plan for creating a room:
when someone clicks on a seller, a room is created with the user and the seller?
So that means ppl have access to a bunch of room?

So on the db we want to have a rooms table with the sellers and buyer,
and the messages need to have room ids.
(for later: avoid duplicate rooms?)


