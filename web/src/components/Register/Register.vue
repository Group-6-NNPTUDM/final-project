<!-- This place for HTML -->
<template>
  <div class="register-block">
    <div class="container">
      <div class="row">
        <div class="col-6  register-form register-form">
          <h3 class="text-center"><b>Đăng ký tài khoản</b></h3>
          <form>
            <div class="mb-3">  
              <label for="email" class="form-label">Tài khoản email</label>
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required="true">

            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Mật khẩu</label>
              <input type="password" class="form-control" id="password" required="true">
            </div>
            <div class="mb-3">
              <label for="confirmedPassword" class="form-label">Nhập lại mật khẩu</label>
              <input type="password" class="form-control" id="confirmedPassword" required="true">
            </div>
            <div class="mb-3">
            <button type="submit" class="btn btn-primary">Đăng ký</button>

            <button  class="btn btn-warning" style="margin-left:30px" @click="() => this.$router.push('/dang-nhap')">
              Đăng Nhập
            </button>
          </div>
          
          </form>
        </div>
        <div class="col-6 introduce-info">
          <h4 >Lợi ích của việc đăng ký tài khoản</h4>
          <ul>
            <li>Kiểm tra trạng thái đơn hàng</li>
            <li>Bỏ sẵn giỏ hàng để mua sau</li>
            <li>Theo dõi sản phẩm thường xuyên</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

 <!-- This place for js -->
<script>
export default {
  name: 'Register',
  components: {

  }
}
</script>

<!-- This place for css -->
<style scoped>

.register-block {
  margin: 50px 0px;
}
ul {
    list-style-type: none;
}
.register-form {
  height: auto;
  border: 1px solid;
}
</style>