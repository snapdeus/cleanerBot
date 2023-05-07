# cleanerBot
bulkdelete discord messages


This is a bot that will bulkdelete your own messages from a discord channel.  

There were 2 problems to solve with this bot.  The bulkDelete API only allows you to delete messages newer than 14 days.  Therefore, this bot deletes messages indvidually.
The 2nd problem is that discord rate limits.  Therefore, this bot has a 600ms delay between each message deletion.

It works like this:

After you set the bot up, create a config folder and within the config folder, create a file called config.json that looks like this:
```  
  {
    "token": "your bot's token,
    
    "clientId": "your bot's client ID",
    
    "guildId": "your server ID"
  }
```

Then, use the deploy-commands.js to register the slash command.
Then your cleanerBot is ready to use.  The default amount of messages it deletes is 1.  Optionally you put in an amount greater than that.  It only pulls the previous 100 messages (from everyone, not just you) so you will have to run it multiple times if you need to delete more than however many messages you sent within the previous 100 messages in the channel. 

Also, this was designed for my personal use, not public consumption, so don't come to me if you need it to work differently! ;]
