var msg = "";
function createReCAPTCHA() {
    document.getElementById("reCAPTCHA").getContext("2d").clearRect(0, 0, 1000, 1000);
    msg = (Math.random().toString(30).substring(4)).substring(0, 4);
    let cap = document.getElementById("reCAPTCHA").getContext("2d");
    cap.font = "100px Bungee Outline";
    cap.strokeText(msg, 0, 100);
    document.getElementById("reCAPTCHA").innerHTML = cap;
}
createReCAPTCHA();
jQuery.validator.addMethod("checkPassword", (value) => {
    let policy1 = (value.length >= 8) ? true : false;
    let policy2 = /[A-Z]/g.test(value) && /[a-z]/g.test(value);
    let policy3 = /[a-z]/ig.test(value) && /\d/g.test(value);
    let policy4 = /[!@#?]/g.test(value);
    (policy1) ? $("#policy1").css("color", "black") : $("#policy1").css("color", "orange");
    (policy2) ? $("#policy2").css("color", "black") : $("#policy2").css("color", "orange");
    (policy3) ? $("#policy3").css("color", "black") : $("#policy3").css("color", "orange");
    (policy4) ? $("#policy4").css("color", "black") : $("#policy4").css("color", "orange");
    if (policy1 && policy2 && policy3 && policy4) {
        return true;
    } else {
        return false;
    }

});
$("#form2").validate({
    rules: {
        uname: {
            required: true,
            checkName: true
        },
        p1: {
            required: true,
            checkPassword: true
        },
        p2: {
            equalTo: "input[name=\"p1\"]"
        },
        reCAPTCHA: {
            required: true
        }
    },
    messages: {
        uname: "<small style=\"color:red;\">you're not an alien. username must contains only A-Z or a-z!!</small>",
        p1: "<small style=\"color:red;\">your password must follow on the policy</small>",
        p2: "<small style=\"color:red;\">How you can login if you had forgotten password<br>This must be same as the left</small>",
        reCAPTCHA: "<small style=\"color:red;\">you're not human, good bye</small>"
    }
});

$("#previousButton").click(() => {
    $("#page2").hide();
    $("#page1").fadeIn(500);
    createReCAPTCHA();
});
$("#resetButton2").click(() => {
    $("#submitButton").prop("disabled", true);
    document.getElementById("form2").reset();
});
$("#form2").change(() => {
    let input1 = ["input[name=\"uname\"]", "input[name=\"p1\"]"];
    let input2 = ["input[name=\"rc\"]", "input[name=\"p2\"]"];
    for (let i = 0; i < input1.length; i++) {
        if ($(input1[i]).val() == "" || $(input2[i]).val() == "") {
            break;
        } else if (i == input1.length - 1) {
            if ($("#form2").validate().form() == true) {
                $("#submitButton").prop("disabled", false);
                $("#submitButton").removeClass("btn-secondary");
                $("#submitButton").addClass("btn-success");
            } else {
                $("#submitButton").removeClass("btn-success");
                $("#submitButton").addClass("btn-secondary");
                $("#submitButton").prop("disabled", true);
            }
        }
    }

});
$("#visibility").click(() => {
    if ($("input[name=\"p1\"]").attr("type") == "password") {
        $("#visibility").toggleClass("fa-eye-slash");
        $("input[name=\"p1\"]").attr("type", "text");
    } else {
        $("#visibility").toggleClass("fa-eye-slash");
        $("input[name=\"p1\"]").attr("type", "password");
    }

});
$("#submitButton").click(() => {
    $("#page1").hide();
    $("#page2").hide();
    $("#indexButton").fadeIn(500);

});