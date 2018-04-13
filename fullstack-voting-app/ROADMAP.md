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

- [x] Add authentication stuff to polls
  - [x] When creating poll, add in authenticated user to poll
  - [x] Tie voting to authenticated users
  - [x] Only allow creating a new option if authenticated user

- [x] Set up a user view for polls they have created
- [x] Allow user to delete their polls
- [x] Have some way of tracking votes for unauthenticated users (track IP)
- [x] When logging in, redirect to current page

- [x] Improve look of polls list page
- [x] Let user see what option they've voted on in a poll
- [x] Improve look of the voting results chart
- [x] Show number of votes on the polls list page
- [ ] Perhaps tidy up api routes
- [x] Improve look of the actual voting section
- [ ] Move away from native alerts and use better popup boxes
- [ ] Close poll when you hit the finished date

### Data

poll {
  name          STRING
  creator       STRING
  creatorName   STRING
  createdAt     DATE
  finishAt      DATE
  finished      BOOLEAN
  options       ARRAY
  [
    option1 {
      name    STRING
      votes   INT
    }
  ]
  userVotes   ARRAY
  [
    userId {
      vote: optionId
    }
  ]
}

