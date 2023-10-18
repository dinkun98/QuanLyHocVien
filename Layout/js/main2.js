let studentList2 = [];

//Function 1: lấy danh sách sinh viên từ backend
const fetchStudents2 = () => {
  axios({
    url: "https://6512e3cbb8c6ce52b3966a85.mockapi.io/Products",
    method: "GET",
  })
    .then((res) => {
      studentList2 = res.data;
      renderStudents2();
    })
    .catch((err) => {
      console.log(err);
    });
};

//function 2: hiển thị danh sách sinh viên ra màn hình
const renderStudents2 = () => {
  //giao diện của một sinh viên
  // <tr>
  //   <td>123</td>
  //   <td>Đặng Trung Hiếu</td>
  //   <td>dangtrunghieu147@gmail.com</td>
  //   <td>0334643124</td>
  //   <td>1</td>
  //   <td>2</td>
  //   <td>3</td>
  //   <td></td>
  // </tr>;
  //Duyệt  studentList, có bao nhiêu SV => <tr>
  let htmlContent = "";
  for (let student2 of studentList2) {

    let luong = Number(student2.luongTheoNgay);
    let ngayLam = Number(student2.soNgayLam);
    let tongLuong = luong * ngayLam;
    tongLuong2 = tongLuong.toLocaleString();
    htmlContent += `
    <tr>
         <td>${student2.ma}</td>
         <td>${student2.hoTen}</td>
         <td>${student2.email}</td>
         <td>${student2.diaChi}</td>
         <td>${student2.soNgayLam}</td>
         <td>${student2.luongTheoNgay}</td>
         <td>${tongLuong2}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteStudent2('${student2.id}')">Xóa</button>
            <button class="btn btn-info" onclick="getStudent2('${student2.id}')">Cập nhật</button>
          </td>
     </tr>`;
    
  }
  
  document.getElementById("tableDanhSach").innerHTML = htmlContent;
};


//function 3 : thêm sinh viên
const addStudent2 = () => {
  const studentMa = document.getElementById("manv").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const diaChi = document.getElementById("diaChi").value;
  const soNgayLam = document.getElementById("ngayLam").value;
  const luongTheoNgay = document.getElementById("luong").value;
 
  var valid = kiemTraRong(
    studentMa,
    "#tbmanv",
    "Mã không được để trống!"
  );

  // kiểm 
  valid &=
    kiemTraRong(name, "#tbname", "Không được để trống name")

  valid &= kiemTraRong(
    email,
    "#tbemail",
    "email không được để trống"
  );


  valid &= kiemTraRong(
    diaChi,
    "#tbdiaChi",
    "địa chỉ không được để trống"
  );

  valid &= kiemTraRong(
    soNgayLam,
    "#tbsongaylam",
    "số ngày làm không được để trống"
  );

  valid &= kiemTraRong(
    luongTheoNgay,
    "#tbluongtheongay",
    "Lý không được để trống"
  );


  if (valid) {
    const newStudent = new Employee(
      name,
      diaChi,
      studentMa,
      email,
      soNgayLam,
      luongTheoNgay
    );

    axios({
      url: "https://6512e3cbb8c6ce52b3966a85.mockapi.io/Products",
      method: "POST",
      data: newStudent,
    })
      .then((res) => {
        //fetch danh sách student mới
        fetchStudents2();
        document.getElementById("btnClose").click();
      })
      .catch((err) => {
        console.log(err);
      });
  }


};

//function 4: Xóa sinh viên
const deleteStudent2 = (id) => {
  axios({
    url: `https://6512e3cbb8c6ce52b3966a85.mockapi.io/Products/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      fetchStudents2();
    })
    .catch((err) => {
      console.log(err);
    });
};

//Them nguoi dung vao danh sach
document.getElementById("")

// function 5: lấy thông tin của sinh viên muốn cập nhật và show lên form
const getStudent2 = (id) => {
  axios({
    url: `https://6512e3cbb8c6ce52b3966a85.mockapi.io/Products/${id}`,
    method: "GET",
  })
    .then((res) => {
      


      document.getElementById("btnThem").click();

      document.getElementById("manv").value = res.data.ma;
      document.getElementById("name").value = res.data.hoTen;
      document.getElementById("email").value = res.data.email;
      document.getElementById("diaChi").value = res.data.diaChi;
      document.getElementById("ngayLam").value = res.data.soNgayLam;
      document.getElementById("luong").value = res.data.luongTheoNgay;
      

      document.getElementById('btnUpdate').setAttribute('data-id', res.data.id)

    })
    .catch((err) => {
      console.log(err);
    });
};

//function 6: cập nhật thông tin sinh viên

const updateStudent2 = () => {
    const studentMa = document.getElementById("manv").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const diaChi = document.getElementById("diaChi").value;
  const soNgayLam = document.getElementById("ngayLam").value;
  const luongTheoNgay = document.getElementById("luong").value;
 
  var valid = kiemTraRong(
    studentMa,
    "#tbmanv",
    "Mã không được để trống!"
  );

  // kiểm 
  valid &=
    kiemTraRong(name, "#tbname", "Không được để trống name")

  valid &= kiemTraRong(
    email,
    "#tbemail",
    "email không được để trống"
  );


  valid &= kiemTraRong(
    diaChi,
    "#tbdiaChi",
    "địa chỉ không được để trống"
  );

  valid &= kiemTraRong(
    soNgayLam,
    "#tbsongaylam",
    "số ngày làm không được để trống"
  );

  valid &= kiemTraRong(
    luongTheoNgay,
    "#tbluongtheongay",
    "Lý không được để trống"
  );

 

  if (valid) {
    const updatedStudent = new Employee(
        name,
        diaChi,
        studentMa,
        email,
        soNgayLam,
        luongTheoNgay
    );

    const id = document.getElementById('btnUpdate').getAttribute('data-id')


    axios({
      url: `https://6512e3cbb8c6ce52b3966a85.mockapi.io/Products/${id}`,
      method: "PUT",
      data: updatedStudent,
    })
      .then((res) => {
        //clear form
        document.getElementById("btnReset").click();

        //ẩn popup
        document.getElementById("btnClose").click();

        //fetch danh sách student mới
        fetchStudents2();
      })
      .catch((err) => {
        console.log(err);
      });
  }


};

document.getElementById('btnXep2').onclick = function () {
  axios({
    url: "https://6512e3cbb8c6ce52b3966a85.mockapi.io/Products",
    method: "GET",
  })
    .then((res) => {
      studentList2 = res.data.sort(
        function (a, b) {
          if (a.hoTen < b.hoTen) { return -1; }
          if (a.hoTen > b.hoTen) { return 1; }
          return 0;
        }
      );

      renderStudents2();
    })
    .catch((err) => {
      console.log(err);
    });
}

fetchStudents2();
