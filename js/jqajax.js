$(document).ready(function () {
  //Ajax Request for retrieving Data
  function showdata() {
    output = "";
    $.ajax({
      url: "retrieve.php",
      method: "GET",
      dataType: "json",
      success: function (data2) {
        //console.log(data2);
        if (data2) {
          x = data2;
        } else {
          x = "";
        }
        for (i = 0; i < x.length; i++) {
          //console.log(x[i].name);
          output +=
            "<tr><td>" +
            x[i].id +
            "</td><td>" +
            x[i].name +
            "</td><td>" +
            x[i].email +
            "</td><td>" +
            x[i].password +
            "</td><td> <button class='btn btn-warning btn-sm btn-edit' data-sid=" +
            x[i].id +
            ">Edit</button> <button class='btn btn-danger btn-sm btn-del' data-sid=" +
            x[i].id +
            ">Delete</button> </td></tr>";
        }
        $("#tbody").html(output);
      },
    });
  }
  showdata();

  //Ajax request for insert data
  $("#btnadd").click(function (e) {
    e.preventDefault();
    let empid = $("#empid").val();
    let empname = $("#nameid").val();
    let empemail = $("#emailid").val();
    let emppassword = $("#passwordid").val();

    mydata = {
      id: empid,
      name: empname,
      email: empemail,
      password: emppassword,
    };
    //console.log(mydata);

    $.ajax({
      url: "insert.php",
      method: "POST",
      data: JSON.stringify(mydata),
      success: function (data) {
        //console.log(data);
        msg = "<div class='alert alert-dark mt-3'>" + data + "</div>";
        $("#msg").html(msg);
        $("#myform")[0].reset();
        showdata();
      },
    });
  });

  //Ajax request for Deleting Data
  $("tbody").on("click", ".btn-del", function () {
    //console.log("Delete button clicked");
    let id = $(this).attr("data-sid");
    //console.log(id);
    mydata = { eid: id };

    //Refreshing table after deleted
    mythis = this;

    $.ajax({
      url: "delete.php",
      method: "POST",
      data: JSON.stringify(mydata),
      success: function (data3) {
        //console.log(data3);
        if (data3 == 1) {
          delmsg =
            "<div class='alert alert-dark mt-3'>Employee Deleted Successfully</div>";
          $(mythis).closest("tr").fadeOut();
        } else if (data3 == 0) {
          delmsg = "<div class='alert alert-dark mt-3'>Unable to Deleted</div>";
        }
        $("#deletemsg").html(delmsg);
      },
    });
  });

  //Ajax Request for Updating Data
  $(tbody).on("click", ".btn-edit", function () {
    //console.log("edit clicked");
    let id = $(this).attr("data-sid");
    //console.log(id);

    editdata = { eid: id };

    $.ajax({
      url: "edit.php",
      method: "POST",
      dataType: "json",
      data: JSON.stringify(editdata),
      success: function (data4) {
        //console.log(data4);
        $("#empid").val(data4.id);
        $("#nameid").val(data4.name);
        $("#emailid").val(data4.email);
        $("#passwordid").val(data4.password);
      },
    });
  });
});
