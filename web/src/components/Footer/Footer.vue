<template>
  <div class="container-fluid footer-container">
    <div class="row">
      <div class="col-2 footer-info">
        <div class="col">
          <div class="footer-menu_item">
            <p class="fs-5 fw-bold text-white text-center">Giới thiệu về Chúng tôi</p>
            <a href="#" class="link-dark text-white footer-link text-center">Giới thiệu</a>
            <a href="#" class="link-dark text-white footer-link text-center">Tuyển dụng</a>
            <a href="#" class="link-dark text-white footer-link text-center">Liên hệ - Bảo hành</a>
            <a href="#" class="link-dark text-white footer-link text-center">Blog Công Nghệ</a>
            <a href="#" class="link-dark text-white footer-link text-center">Site map</a>
            <a href="#" class="link-dark text-white footer-link text-center">Xem phiên bản di động</a>
          </div>
        </div>
      </div>
      <div class="col-2 footer-info">
        <div class="col">
          <div class="footer-menu_item">
            <p class="fs-5 fw-bold text-white text-center">Hỗ trợ khách hàng</p>
            <a href="#" class="link-dark text-white footer-link text-center">Mua hàng từ xa</a>
            <a href="#" class="link-dark text-white footer-link text-center">Quy định đổi trả hàng hóa</a>
            <a href="#" class="link-dark text-white footer-link text-center">Quy định bảo hành hàng mới</a>
            <a href="#" class="link-dark text-white footer-link text-center">Quy định bảo hành hàng cũ</a>
          </div>
        </div>
      </div>
      <div class="col-2 footer-info">
        <div class="col">
          <div class="footer-menu_item">
            <p class="fs-5 fw-bold text-white text-center">Sản phẩm - dịch vụ</p>
            <a href="#" class="link-dark text-white footer-link text-center">Dịch vụ sửa chữa</a>
            <a href="#" class="link-dark text-white footer-link text-center">Nâng cấp phần cứng</a>
            <a href="#" class="link-dark text-white footer-link text-center">Cài đặt phần mềm</a>
          </div>
        </div>
      </div>
      <div class="col-3 footer-info">
        <div class="col">
          <div class="footer-menu_item">
            <p class="fs-5 fw-bold text-center text-white">Thanh toán an toàn</p>
          </div>
        </div>
      </div>
      <div class="col-3 footer-info">
        <p class="fs-5 fw-bold text-center text-white">Kết nối với chúng tôi</p>
      </div>
    </div>
    <div class="container footer-address" style="height 20px">
      <div class="col-12">
        <p class="text-sm-start text-white">Copyright @ 2014 Mac24h.vn</p>
        <p class="text-sm-start text-white">HCM - 306/39 Nguyễn Thị Minh Khai, P. 5, Q. 3, TP HCM - Hotline: 0919.011.011 - 0911.100.900 -(028)66.607.607</p>
        <p class="text-sm-start text-white">HN: Số 2 Ngách 39 , Ngõ 178 Thái Hà , P. Trung Liệt, Q. Đống Đa, TP Hà Nội - Hotline: 0964.600.600 0888.760.770</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Footer"
    }   
</script>

<style>
.footer-container {
  background: #444444;
  height: auto;
}

.footer-info {
  margin-top: 20px;
}

.footer-link {
  cursor: pointer;
  list-style: none;
  text-decoration: none;
  display: block;
}

.footer-address {
  height: 100px;
  margin-top: 20px;
}
</style>