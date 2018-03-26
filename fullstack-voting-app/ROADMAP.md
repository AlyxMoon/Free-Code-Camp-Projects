### Roadmap

- [x] Plan out initial framework
- [ ] Get required libraries
  - [x] Node / Express / Vue
  - [x] MongoDB
  - [ ] Authentication stuff
  - [ ] data display thingy
- [x] Set up MongoDB
- [ ] Set up authentication
  - [ ] passport.js?
  - [ ] Twitter, Google, Github, Email
- [ ] Set up frontend
  - [x] Persistent navbar
    - [x] link to create a poll
    - [x] link to login/signup page
  - [x] View: Individual poll
    - [x] options
    - [x] results so far
    - [x] sharing link
  - [x] View: Listing of polls
    - [x] polls
    - [x] link to each poll
    - [x] creator
    - [x] finished
  - [ ] View: Login/Signup page
- [x] Set up backend
- [x] Plan out data structures
  - [x] polls
  - [ ] users


### Data

poll {
  name        STRING
  creator       STRING
  createdAt    DATE
  finishAt     DATE
  finished      BOOLEAN
  options       ARRAY
    [
      option1 {
          name    STRING
          votes   INT
      }
    ]
}

