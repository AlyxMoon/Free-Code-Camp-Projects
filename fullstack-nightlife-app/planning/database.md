DATABASE fullstack-nightlife-app

COLLECTION users
  - twitterID       : STRING  (twitter id)
  - twitterName     : STRING  (twitter displayName)
  - twitterUsername : STRING  (twitter username)
  - twitterAvatar   : STRING  (twitter avatar.io url - based off twitter username)
  - friends         : OBJECT  (collection of users friends)
    - friend_id       : STRING (twitter id of friend)
    - accepted        : BOOL (whether the desired friend has accepted the request)
  - schedule        : OBJECT  (quick reference of bars user plans on going to)
    - "DATE": OBJECT
      - "bar_id": OBJECT
        - intoxication_level: NUMBER (planned intoxication level at the bar)

COLLECTION bars
  - barID           : STRING  (id the of the bar)
  - schedule        : OBJECT (people that plan on going per day)
      - "DATE" :
        - count: NUMBER (convenience count of planned users going)
        - users:
          - "user_id":
            - going               : BOOL (whether or not user plans on going)
            - intoxication_level  : NUMBER (planned intoxication level at the bar)


COLLECTION friends
  - list  : ARRAY (array of objects representing friends and requests)
    - friend_id     : STRING  (twitter id of desired friend)
    - accepted      : BOOL    (whether they have accepted the request)