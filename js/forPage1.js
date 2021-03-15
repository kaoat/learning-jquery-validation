jQuery.validator.setDefaults({
    debug: true
});
jQuery.validator.addMethod("email", (value) => {
    if (value.includes("@") && value.match(/@/g).length == 1) {
        splitTo = (value.split("@"));
        if (!splitTo[0].includes(" ") && splitTo[0] != "" && splitTo[0][0] != ".") {
            if (splitTo[1].endsWith(".com") && splitTo[1][0] != "." && !splitTo[1].includes(" ")) {
                return true;
            }
        } else {
            return false;
        }

    }
    else {
        return false;
    }
});
jQuery.validator.addMethod("phone", (value) => {
    if (value.length == 10 && /^\d+$/.test(value)) {
        if (/[689]/.test(value[1]) && value[0] == "0") {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
});
jQuery.validator.addMethod("checkName", (value) => {
    if (/[^a-z]/.test(value)) {
        return false;
    } else {
        return true;
    }
});
$("#form1").validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        fname: {
            required: true,
            checkName: true
        },
        lname: {
            required: true,
            checkName: true
        },
        nname: {
            required: true,
            checkName: true
        },
        phone: {
            required: true,
            phone: true
        }
    },
    messages: {
        fname: "<small style=\"color:red;\">Everyone must has the first name</small>",
        lname: "<small style=\"color:red;\">Wow don't you have the family name?</small>",
        nname: "<small style=\"color:red;\">ahh shit!! your parents had forgotten to set your nickname.</small>",
        email: "<small style=\"color:red;\">you know? even a kid can enter a valid email.</small>",
        phone: "<small style=\"color:red;\">ohh my god, Cellular is inaccessible to you.</small>"
    }
});
$("#exitButton").click(() => {

    $("#page1").hide();
    document.getElementById("form1").reset();
    document.getElementById("form2").reset();
    $("#indexButton").fadeIn(500);
});

$("#resetButton1").click(() => {
    $("#nextButton").removeClass("btn-primary");
    $("#nextButton").addClass("btn-secondary");
    document.getElementById("form1").reset();

});

$("#form1").change(() => {
    let nameInput1 = ["input[name=\"fname\"]", "input[name=\"lname\"]"];
    let nameInput2 = ["input[name=\"nname\"]", "input[name=\"email\"]"];
    let nameInput3 = "input[name=\"phone\"]";
    for (let i = 0; i < nameInput1.length; i++) {
        if ($(nameInput1[i]).val() == "" || $(nameInput2[i]).val() == "" || $(nameInput3).val() == "") {
            break;
        } else if (i == nameInput1.length - 1) {
            if ($("#form1").validate().form() == true) {
                $("#nextButton").prop("disabled", false);
                $("#nextButton").removeClass("btn-secondary");
                $("#nextButton").addClass("btn-primary");
            } else {
                $("#nextButton").removeClass("btn-primary");
                $("#nextButton").addClass("btn-secondary");
                $("#nextButton").prop("disabled", true);
            }
        }
    }
});
$("#nextButton").click(() => {
    $("#page1").hide();
    $("#page2").fadeIn(500);
});



