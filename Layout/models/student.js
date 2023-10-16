class Person {
  constructor(hoTen, diaChi, ma, email){
    this.hoTen = hoTen;
    this.diaChi = diaChi;
    this.ma = ma;
    this.email = email;
  }
}

class Student extends Person {
  constructor(hoTen, diaChi, ma, email, toan, ly, hoa){
    super(hoTen, diaChi, ma, email)
    this.toan = toan;
    this.ly = ly;
    this.hoa = hoa;
  }
}

class Employee extends Person {
  constructor(hoTen, diaChi, ma, email, soNgayLam, luongTheoNgay){
    super(hoTen, diaChi, ma, email)
      this.soNgayLam = soNgayLam;
      this.luongTheoNgay = luongTheoNgay;
  }
}

class Customer extends Person {
  constructor(hoTen, diaChi, ma, email, tenCongTy, triGiaHoaDon, danhGia){
    super(hoTen, diaChi, ma, email)
    this.tenCongTy = tenCongTy;
    this.triGiaHoaDon = triGiaHoaDon;
    this.danhGia = danhGia
  }
}