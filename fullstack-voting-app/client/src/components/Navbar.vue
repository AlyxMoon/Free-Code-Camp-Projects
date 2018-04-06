<template>
  <div id="navbar">
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-item">
          <a class="nav-link" href="/poll/add">Add Poll</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/polls">See Polls</a>
        </li>
        <li class="nav-item" v-if="username">
          <a class="nav-link" href="/mypolls">My Polls</a>
        </li>
        <li class="nav-item">
          <div class="nav-dropdown" v-if="username">
            <a class="nav-link" href="#" v-on:click.prevent="toggleLogout">
              {{ username }}
              <i class="fas fa-caret-down"></i>
            </a>
            <div class="nav-dropdown-menu" v-if="showLogout">
              <a href="auth/logout">Logout</a>
            </div>
          </div>

          <a class="nav-link" href="/auth/twitter" v-else>
            <i class="fab fa-twitter"></i>
            Login/Register
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Navbar',
  data () {
    return {
      username: '',
      showLogout: false
    }
  },
  methods: {
    toggleLogout: function () {
      this.showLogout = !this.showLogout
    }
  },
  created: function () {
    axios.get('http://localhost:50031/api/user').then(response => {
      console.log(response)
      if (response.data.user) {
        this.username = response.data.user
      }
    })
  }
}
</script>

<style scoped lang="scss">
#navbar {
  height: 50px;
  width: 100%;
}

.nav {
  background-color: black;
  height: 30px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
}

.nav-list {
  list-style: none;
  text-align: right;
  padding-right: 1%;
  font-size: 0;
  vertical-align: middle;
}

.nav-item {
  display: inline-block;
  position: relative;
  border-right: 1px solid white;
  padding: 0 5px;

  &:last-child {
    border-right: none;
  }
}

.nav-dropdown-menu {
  background-color: white;
  border: 1px solid grey;
  border-radius: 5px;

  min-width: 80px;
  padding: 5px;
  position: absolute;
  right: 0;
  text-align: right;
  top: 30px;

  a {
    color: black;
  }
}

a {
  font-size: 20px;
  color: white;
  text-decoration: none;
  text-align: center;

  &:hover {
    color: #3FB0AC;
    transition-duration: 0.2s;
  }
}

</style>
