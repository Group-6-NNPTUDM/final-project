
<script>
export default {
  name: "Header",
  components: {},
};
</script>

<style>
.menu-container {
  margin-top: 20px;
}

.menu_block {
  background-color: #444444;
}
</style>

<template>
  <div class="container menu-container">
    <div class="row menu_block">
      <div class="col-2 top-logo">
        <div class="logo-container">
          <a href="http://localhost:8080/">
            <img src="https://mac24h.vn/images/logos/42/logo-mac24h_zwyz-ad.png?t=1629384503" width="145px" height="46" alt="logo" />
          </a>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <ul class="
              nav
              col-12 col-lg-auto
              me-lg-auto
              mb-2
              justify-content-center
              mb-md-0
            ">
            <li class="nav-item active">
              <a href="http://localhost:8080/danh-muc-san-pham/apple" class="nav-link px-2 text-white">APPLE</a>
            </li>
            <li class="nav-item dropdown">
              <a href="http://localhost:8080/danh-muc-san-pham/lenovo" class="nav-link text-white">LENOVO - THINKPAD</a>
            </li>
            <li class="nav-item active">
              <a href="http://localhost:8080/danh-muc-san-pham/dell" class="nav-link text-white">DELL - XPS</a>
            </li>
            <li>
              <a href="#" class="nav-link text-white">Hỗ Trợ</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-4">
        <form class="
            form-inline
            d-flex
            justify-content-center
            md-form
            form-sm
            active-cyan-2
            mt-2
          ">
          <input class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search" aria-label="Search" />
          <i class="fas fa-search" aria-hidden="true"></i>
        </form>
      </div>
    </div>
  </div>
</template>
