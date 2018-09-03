## League Matches

Scaffolding and boilerplate provided by: https://github.com/Arieg419/ElectronReactBoilerplate


This will be an electron application that lives in the status bar / tray of your desktop
that brings up League of Legends match schedules and results for the week.

Match data provided by the PandaScore API.



TODO:
- Get the official Riot colors / design to use in React
- Create API
- Make static components

NOTE: 
- Might have to create a simple webapp that I would use to manage the API requests to PandaScore to 
keep my secret key... secret :D
- Solution?: https://github.com/openid/AppAuth-JS
- Will probably make a simple web server that I manage, which updates its databse every hour / every day, that the 
clients can connecto to via the electron app


### Design 

[TITLE]

[         _league icon_      ]
[(Icon1) Name vs Name (Icon2)]
[ _record_  *DATE*   _record_]
... (sorted by date)


### API 
- '/api/week/<league_id>'
- 289 = NALCS
- Returns JSON in the form of 
```
{
  'date/time':
  {
    'teams': 
    [
      {'name': name, 
       'icon': iconcdnpath, 
      }
      ...
    ]
  }, 
  'date/time2':
  ...
}
```
*Not sure what happens when we have the same league playing 2 matches at once..


