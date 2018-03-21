### Roadmap

- Plan out initial framework
- Get required libraries
  - Node / Express / Vue
  - MongoDB
  - Authentication stuff
  - data display thingy
- Set up MongoDB
- Set up authentication
  - Twitter, Google, Github, Email
- Set up frontend
  - Persistent navbar
    - link to create a poll
    - link to login/signup page
  - View: Individual poll
    - options
    - results so far
    - sharing link
  - View: Listing of polls
    - polls
    - link to each poll
  - View: Login/Signup page
    -
- Set up backend
- Plan out data structures
  - polls
  - users


### Data

poll {
  creator       STRING
  created-at    DATE
  finish-at     DATE
  finished      BOOLEAN
  options       ARRAY
    [
      option1 {
          name    STRING
          votes   INT
      }
    ]
}

