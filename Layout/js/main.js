let studentList = [];

//Function 1: lấy danh sách sinh viên từ backend
const fetchStudents = () => {
  axios({
    url: "https://6512e3cbb8c6ce52b3966a85.mockapi.io/qlbh",
    method: "GET",
  })
    .then((res) => {
      studentList = res.data;
      renderStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

//function 2: hiển thị danh sách sinh viên ra màn hình
const renderStudents = () => {
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
  for (let student of studentList) {
    let toan1 = Number(student.toan);
    let ly1 = Number(student.ly);
    let hoa1 = Number(student.hoa);
    let dtb = (toan1 + ly1 + hoa1) / 3;
    htmlContent += `
    <tr>
         <td>${student.ma}</td>
         <td>${student.hoTen}</td>
         <td>${student.email}</td>
         <td>${student.diaChi}</td>
         <td>${student.toan}</td>
         <td>${student.ly}</td>
         <td>${student.hoa}</td>
          <td>${dtb}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteStudent('${student.id}')">Xóa</button>
            <button class="btn btn-info" onclick="getStudent('${student.id}')">Cập nhật</button>
          </td>
     </tr>`;
    
  }
  
  document.getElementById("tableDanhSach").innerHTML = htmlContent;
};


//function 3 : thêm sinh viên
const addStudent = () => {
  const studentMa = document.getElementById("mssv").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const diaChi = document.getElementById("diaChi").value;
  const math = document.getElementById("math").value;
  const physics = document.getElementById("physics").value;
  const chemistry = document.getElementById("chemistry").value;

  var valid = kiemTraRong(
    studentMa,
    "#tbmssv",
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
    "#tbdiachi",
    "địa chỉ không được để trống"
  );

  valid &= kiemTraRong(
    math,
    "#tbtoan",
    "toán không được để trống"
  );

  valid &= kiemTraRong(
    physics,
    "#tbly",
    "Lý không được để trống"
  );

  valid &= kiemTraRong(
    chemistry,
    "#tbhoa",
    "hoá không được để trống"
  );

  if (valid) {
    const newStudent = new Student(
      name,
      diaChi,
      studentMa,
      email,
      math,
      physics,
      chemistry
    );

    axios({
      url: "https://6512e3cbb8c6ce52b3966a85.mockapi.io/qlbh",
      method: "POST",
      data: newStudent,
    })
      .then((res) => {
        //fetch danh sách student mới
        fetchStudents();
        document.getElementById("btnClose").click();
      })
      .catch((err) => {
        console.log(err);
      });
  }


};

//function 4: Xóa sinh viên
const deleteStudent = (id) => {
  axios({
    url: `https://6512e3cbb8c6ce52b3966a85.mockapi.io/qlbh/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      fetchStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

//Them nguoi dung vao danh sach
document.getElementById("")

// function 5: lấy thông tin của sinh viên muốn cập nhật và show lên form
const getStudent = (id) => {
  axios({
    url: `https://6512e3cbb8c6ce52b3966a85.mockapi.io/qlbh/${id}`,
    method: "GET",
  })
    .then((res) => {
      


      document.getElementById("btnThem").click();

      document.getElementById("mssv").value = res.data.ma;
      document.getElementById("name").value = res.data.hoTen;
      document.getElementById("email").value = res.data.email;
      document.getElementById("diaChi").value = res.data.diaChi;
      document.getElementById("math").value = res.data.toan;
      document.getElementById("physics").value = res.data.ly;
      document.getElementById("chemistry").value = res.data.hoa;

      document.getElementById('btnUpdate').setAttribute('data-id', res.data.id)

    })
    .catch((err) => {
      
    });
};

//function 6: cập nhật thông tin sinh viên

const updateStudent = () => {
  const studentMa = document.getElementById("mssv").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const diaChi = document.getElementById("diaChi").value;
  const math = document.getElementById("math").value;
  const physics = document.getElementById("physics").value;
  const chemistry = document.getElementById("chemistry").value;

  var valid = kiemTraRong(
    studentMa,
    "#tbmssv",
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
    "#tbdiachi",
    "địa chỉ không được để trống"
  );

  valid &= kiemTraRong(
    math,
    "#tbtoan",
    "toán không được để trống"
  );

  valid &= kiemTraRong(
    physics,
    "#tbly",
    "Lý không được để trống"
  );

  valid &= kiemTraRong(
    chemistry,
    "#tbhoa",
    "hoá không được để trống"
  );

  if (valid) {
    const updatedStudent = new Student(
      name,
      diaChi,
      studentMa,
      email,
      math,
      physics,
      chemistry
    );

    const id = document.getElementById('btnUpdate').getAttribute('data-id')


    axios({
      url: `https://6512e3cbb8c6ce52b3966a85.mockapi.io/qlbh/${id}`,
      method: "PUT",
      data: updatedStudent,
    })
      .then((res) => {
        //clear form
        document.getElementById("btnReset").click();

        //ẩn popup
        document.getElementById("btnClose").click();

        //fetch danh sách student mới
        fetchStudents();
      })
      .catch((err) => {
        console.log(err);
      });
  }


};

document.getElementById('btnXep').onclick = function () {
  axios({
    url: "https://6512e3cbb8c6ce52b3966a85.mockapi.io/qlbh",
    method: "GET",
  })
    .then((res) => {
      studentList = res.data.sort(
        function (a, b) {
          if (a.hoTen < b.hoTen) { return -1; }
          if (a.hoTen > b.hoTen) { return 1; }
          return 0;
        }
      );

      renderStudents();
    })
    .catch((err) => {
      console.log(err);
    });
}

fetchStudents();
