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
        <li class="nav-item">
          <a class="nav-link" href="/auth/twitter">Login/Register</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped lang="scss">
#navbar {
  height: 50px;
  width: 100%;
}

.nav {
  background-color: black;
  height: 50px;
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
  border-right: 1px solid white;
  padding: 0 5px;

  &:last-child {
    border-right: none;
  }
}

.nav-link {
  font-size: 20px;
  color: white;
  text-decoration: none;
  text-align: center;
}

</style>
