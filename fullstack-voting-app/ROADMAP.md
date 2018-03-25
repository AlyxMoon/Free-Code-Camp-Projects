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
  - [ ] Persistent navbar
    - [x] link to create a poll
    - [x] link to login/signup page
  - [ ] View: Individual poll
    - [ ] options
    - [ ] results so far
    - [ ] sharing link
  - [ ] View: Listing of polls
    - [ ] polls
    - [ ] link to each poll
    - [ ] creator
    - [ ] finished
  - [ ] View: Login/Signup page
    -
- [ ] Set up backend
- [ ] Plan out data structures
  - [ ] polls
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

