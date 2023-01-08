<!-- This place for HTML -->
<template>
  <div class="register-block">
    <div class="container">
      <div class="row">
        <div class="col-6  register-form register-form">
          <h3 class="text-center"><b>Đăng ký tài khoản</b></h3>
          <form ref="form" @submit.prevent="sendRegister">
            <div class="mb-3">  
              <label for="email" class="form-label">Tài khoản email</label>
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required="true" v-model="this.email">

            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Mật khẩu</label>
              <input type="password" class="form-control" id="password" required="true" v-model="this.password">
            </div>
            <div class="mb-3">
              <label for="confirmedPassword" class="form-label">Nhập lại mật khẩu</label>
              <input type="password" class="form-control" id="confirmedPassword" required="true" v-model="this.Repassword">
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
import { uuid } from 'vue-uuid'; 
import axios from 'axios';
export default {
  data() {
return{

    email:"",
    password:"",
    Repassword:"",
}
},
  methods:{
    sendRegister(){
      if(this.email == '' || this.password == ''||this.Repassword == '') 
      {
            alert("Điền đầy đủ thông tin");
            return;
      }
      if(this.password.length<5) 
      {
            alert("Mật khẩu phải lớn hơn 6 ký tự");
            return;
      }
      if(this.password.search(/[a-zA-Z]/) == -1) {
        alert("Phải chứa ký tự chữ");
        return;
      }
      if(this.password.search(/\d/) == -1) {
        alert("Phải chứa ký tự số");
        return;
      }
      if(this.password != this.Repassword) 
      {
            alert("Mật khẩu lặp lại không đúng");
            return;
      }
      const newID = uuid.v4();
      try{
            axios.post(`http://localhost:8000/api/users/`,
            {
                id: newID,
                email: this.email,
                password:this.password,
                isDeleted:false,
                loginCount:0
            });
           }catch(error){
                console.log(error)
           }

      alert("Đăng ký thành công");
      this.$router.push('/');

  }
    

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