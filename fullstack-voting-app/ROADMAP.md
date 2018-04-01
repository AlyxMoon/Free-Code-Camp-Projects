### Roadmap

- [x] Plan out initial framework
- [ ] Get required libraries
  - [x] Node / Express / Vue
  - [x] MongoDB
- [x] Set up MongoDB
- [x] Set up authentication
  - [x] passport.js?
  - [x] Twitter
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
- [x] Set up backend
- [x] Plan out data structures
  - [x] polls
  - [x] users

- [ ] Add authentication stuff to polls
  - [ ] When creating poll, add in authenticated user to poll
  - [ ] Tie voting to authenticated users
  - [ ] Only allow creating a new option if authenticated user

- [ ] Set up a user view for polls they have created
- [ ] Allow user to delete their polls
- [ ] Have some way of tracking votes for unauthenticated users (track IP)

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

