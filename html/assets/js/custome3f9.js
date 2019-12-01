function reset_pass_star() {
    var a = !0;
    if (document.getElementById("new_pass_star_reset").value != document.getElementById("conf_pass_star_reset").value && (document.getElementById("new_pass_star_reset").style.borderColor = "#E34234", document.getElementById("conf_pass_star_reset").style.borderColor = "#E34234", a = !1, swal({
            title: "Failed",
            text: "Confirm Password is not same",
            type: "error",
            confirmButtonColor: "#ff0000",
            allowOutsideClick: !1,
            showConfirmButton: !0
        })), a) {
        var o = $("#user_star_reset").val(),
            e = $("#conf_pass_star_reset").val(),
            t = $("#old_pass_star_reset").val();
        return $.ajax({
            type: "POST",
            url: "Wp/reset_starwifi",
            dataType: "json",
            data: "username=" + o + "&password=" + e + "&oldpassword=" + t,
            success: function (a) {
                1 == a.code ? (back_starwifi(), swal({
                    title: "Success",
                    text: a.message,
                    type: "success",
                    confirmButtonColor: "#ff0000",
                    allowOutsideClick: !1,
                    showConfirmButton: !0
                })) : swal({
                    title: "Failed",
                    text: a.message,
                    type: "warning",
                    confirmButtonColor: "#ff0000",
                    allowOutsideClick: !1,
                    showConfirmButton: !0
                })
            },
            statusCode: {
                500: function () {
                    $("#loading-overlay").css("display", "none");
                    swal({
                        title: "Failed",
                        text: "Login Gagal [500], Silahkan coba login atau koneksi kembali",
                        type: "error",
                        confirmButtonColor: "#ff0000",
                        allowOutsideClick: !1,
                        showConfirmButton: !0
                    })
                },
                404: function () {
                    $("#loading-overlay").css("display", "none");
                    swal({
                        title: "Failed",
                        text: "Login Gagal [404], Silahkan coba login atau koneksi kembali",
                        type: "error",
                        confirmButtonColor: "#ff0000",
                        allowOutsideClick: !1,
                        showConfirmButton: !0
                    })
                }
            },
            error: function () {
                swal({
                    title: "Failed",
                    text: "Silahkan coba login atau koneksi kembali",
                    type: "error",
                    confirmButtonColor: "#ff0000",
                    allowOutsideClick: !1,
                    showConfirmButton: !0
                })
            }
        }), !1
    }
    return a
}

function back_starwifi() {
    return $("#user_star_reset").val(""), $("#old_pass_star_reset").val(""), $("#new_pass_star_reset").val(""), $("#conf_pass_star_reset").val(""), $("#kom_pane_1").css("display", "block"), $("#kom_pane_2").css("display", "none"), !1
}

function makeid() {
    for (var a = "", o = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789", e = 0; e < 4; e++) a += o.charAt(Math.floor(Math.random() * o.length));
    return a
}

function login_komunitas() {
    makeid();
    var a = $("#username_komunitas").val(),
        o = $("#password_komunitas").val(),
        e = $("#list_kom").val();
    if ("41" == e) {
        var t = a + ".starwifi@event";
        landURL = ""
    } else if ("42" == e) {
        switch (a.split("@")[1]) {
            case "gift":
                t = (a = a.replace("@gift", "")) + "@gift";
                break;
            default:
                t = a + "@gift"
        }
        landURL = ""
    } else if ("43" == e) {
        t = a + "@komunitas.grosirbersama";
        landURL = ""
    } else if ("44" == e) {
        t = a + "@komunitas.smartbisnis";
        landURL = ""
    } else if ("45" == e) {
        switch (a.split("@")[1]) {
            case "unej":
                t = (a = a.replace("@unej", "")) + "@komunitas.unej";
                landURL = url_unej;
                break;
            case "umaha":
                t = (a = a.replace("@umaha", "")) + "@komunitas.umaha";
                landURL = "";
                break;
            case "trisakti":
                t = (a = a.replace("@trisakti", "")) + "@komunitas.trisakti";
                landURL = "http://www.stmt-trisakti.ac.id/main.php";
                break;
            case "itdel":
                t = (a = a.replace("@itdel", "")) + "@komunitas.itdel";
                landURL = "";
                break;
            case "polije":
                t = (a = a.replace("@polije", "")) + "@komunitas.polije";
                landURL = "";
                break;
            case "ut.ac.id":
                t = a + "@komunitas.ut";
                landURL = "";
                break;
            case "unsiq":
                t = (a = a.replace("@unsiq", "")) + "@komunitas.unsiq";
                landURL = "";
                break;
            default:
                t = a + "@freeMS.vmgmt";
                landURL = ""
        }
    } else if ("46" == e) {
        t = a + "@freeMS.vmgmt";
        landURL = ""
    } else if ("47" == e) {
        t = a + "@komunitas.internetku";
        landURL = ""
    } else if ("49" == e) {
        if ("violet" == a.split("@")[1]) t = a;
        else t = a + "@freeMS.vmgmt";
        landURL = ""
    }
    return null != e && "" != a && "" != o ? ($("#loading-overlay").css("display", "block"), $.ajax({
        url: urlx,
        dataType: "json",
        data: "username=" + t + "&password=" + o + "&landURL=" + landURL,
        success: function (a) {
            $("#loading-overlay").css("display", "none"), 0 == a.result ? swal({
                title: "Failed",
                text: a.message,
                type: "warning",
                confirmButtonColor: "#ff0000",
                allowOutsideClick: !1,
                showConfirmButton: !0
            }) : ($("#loading-success").css("display", "block"), setTimeout(window.location = lnd, 2500))
        },
        statusCode: {
            500: function () {
                $("#loading-overlay").css("display", "none");
                swal({
                    title: "Failed",
                    text: "Login Gagal [500], Silahkan coba login atau koneksi kembali",
                    type: "error",
                    confirmButtonColor: "#ff0000",
                    allowOutsideClick: !1,
                    showConfirmButton: !0
                })
            },
            404: function () {
                $("#loading-overlay").css("display", "none");
                swal({
                    title: "Failed",
                    text: "Login Gagal [404], Silahkan coba login atau koneksi kembali",
                    type: "error",
                    confirmButtonColor: "#ff0000",
                    allowOutsideClick: !1,
                    showConfirmButton: !0
                })
            }
        },
        error: function () {
            $("#loading-overlay").css("display", "none"), swal({
                title: "Failed",
                text: "Silahkan coba login atau koneksi kembali",
                type: "error",
                confirmButtonColor: "#ff0000",
                allowOutsideClick: !1,
                showConfirmButton: !0
            })
        }
    }), !1) : (swal({
        title: "Failed",
        text: "Silahkan Pilih Komunitas terlebih dahulu atau Username Password Kosong",
        type: "error",
        confirmButtonColor: "#ff0000",
        allowOutsideClick: !1,
        showConfirmButton: !0
    }), !1)
}

function Direct_roaming() {
    return "51" === $("#roaming").val() ? (window.location = "/wifi.id-new/ipass/" + uri, !1) : "52" === $("#roaming").val() ? (window.location = "https://c01.client.boingo.com/uam/tln/" + uri + "&login_url=" + urlx, !1) : "53" == $("#roaming").val() ? (window.location = "/wifi.id-new/nusanet/" + uri, !1) : "54" === $("#roaming").val() ? (window.location = "/wifi.id-new/hts/" + uri, !1) : "55" === $("#roaming").val() ? (window.location = "/wifi.id-new/sponsorwifi/" + uri, !1) : (swal({
        title: "Failed",
        text: "Silahkan Pilih ISP atau Roaming terlebih dahulu",
        type: "error",
        confirmButtonColor: "#ff0000",
        allowOutsideClick: !1,
        showConfirmButton: !0
    }), !1)
}

function fun_komunitas(a) {
    "41" == a.value ? ($("#start_wifi").css("display", "block"), $("#kom_all_kom").css("display", "block"), $("#spasi_kosong").css("display", "none"), $("#kom_itravel_guard").css("display", "none")) : "48" == a.value ? ($("#kom_itravel_guard").css("display", "block"), $("#kom_all_kom").css("display", "none"), $("#start_wifi").css("display", "none")) : ($("#start_wifi").css("display", "none"), $("#spasi_kosong").css("display", "block"), $("#kom_all_kom").css("display", "block"), $("#kom_itravel_guard").css("display", "none"))
}

function kom_start_change() {
    swal({
        title: "Change Password Star Wifi",
        html: '<input required placeholder="username" id="swal-username" class="swal2-input"><input required placeholder="old password" id="swal-oldpassword" class="swal2-input"><input required placeholder="new password" id="swal-newpass" class="swal2-input"><input required placeholder="confirm new password" id="swal-newpass2" class="swal2-input">',
        preConfirm: function () {
            return new Promise(function (a) {
                a([$("#swal-username").val(), $("#swal-oldpassword").val(), $("#swal-newpass").val(), $("#swal-newpass2").val()])
            })
        }
    }).then(function (a) {
        if (a[3] != a[2]) swal({
            title: "Failed",
            text: "Confirm password is not same",
            type: "error",
            confirmButtonColor: "#ff0000",
            allowOutsideClick: !1,
            showConfirmButton: !0
        });
        else {
            var o = a[0],
                e = a[1],
                t = a[2];
            $("#loading-overlay").css("display", "block"), $.ajax({
                type: "POST",
                url: "Wp/reset_starwifi",
                dataType: "json",
                data: "username=" + o + "&password=" + t + "&oldpassword=" + e,
                success: function (a) {
                    $("#loading-overlay").css("display", "none"), 1 == a.code ? (back_starwifi(), swal({
                        title: "Success",
                        text: a.message,
                        type: "success",
                        confirmButtonColor: "#ff0000",
                        allowOutsideClick: !1,
                        showConfirmButton: !0
                    })) : swal({
                        title: "Failed",
                        text: a.message,
                        type: "warning",
                        confirmButtonColor: "#ff0000",
                        allowOutsideClick: !1,
                        showConfirmButton: !0
                    })
                },
                statusCode: {
                    500: function () {
                        $("#loading-overlay").css("display", "none");
                        swal({
                            title: "Failed",
                            text: "Login Gagal [500], Silahkan coba login atau koneksi kembali",
                            type: "error",
                            confirmButtonColor: "#ff0000",
                            allowOutsideClick: !1,
                            showConfirmButton: !0
                        })
                    },
                    404: function () {
                        $("#loading-overlay").css("display", "none");
                        swal({
                            title: "Failed",
                            text: "Login Gagal [404], Silahkan coba login atau koneksi kembali",
                            type: "error",
                            confirmButtonColor: "#ff0000",
                            allowOutsideClick: !1,
                            showConfirmButton: !0
                        })
                    }
                },
                error: function () {
                    $("#loading-overlay").css("display", "none"), swal({
                        title: "Failed",
                        text: "Silahkan coba login atau koneksi kembali",
                        type: "error",
                        confirmButtonColor: "#ff0000",
                        allowOutsideClick: !1,
                        showConfirmButton: !0
                    })
                }
            })
        }
    }).catch(swal.noop)
}

function seam_reg_change() {
    $("#seam_pane_1").css("display", "none"), $("#seam_pane_2").css("display", "block")
}

function Direct_itravel() {
    return window.location = "/wifi.id-new/itravelguard/" + uri, !1
}

function beli_voucher(a, o) {
    if ("" === o || void 0 === o) swal({
        title: "Failed",
        text: "Silahkan coba login atau koneksi kembali",
        type: "error",
        confirmButtonColor: "#ff0000",
        allowOutsideClick: !1,
        showConfirmButton: !0
    });
    else if ("" === a || null === a) swal({
        title: "Failed",
        text: "Mohon Pilih Paket terlebih dahulu",
        type: "error",
        confirmButtonColor: "#ff0000",
        allowOutsideClick: !1,
        showConfirmButton: !0
    });
    else {
        $("#loading-overlay").css("display", "block");
        var e = makeid(),
            t = (cookFf, {
                a: e,
                b: o,
                c: randomtoken
            });
        $.ajax({
            type: "POST",
            cache: !1,
            url: sce,
            dataType: "json",
            data: t,
            error: function () {
                $("#loading-overlay").css("display", "none"), swal({
                    title: "Failed",
                    text: "Silahkan coba login atau koneksi kembali",
                    type: "error",
                    confirmButtonColor: "#ff0000",
                    allowOutsideClick: !1,
                    showConfirmButton: !0
                })
            },
            success: function (o) {
                $("#loading-overlay").css("display", "none");
                var e = location.href.replace(/package/, "package-details").replace(/#/, "");
                "" === o.error_info || void 0 === o.error_info ? window.location = e + "&harga_voucher=" + a + "&token=" + o.token : swal({
                    title: "Failed",
                    text: o.error_info,
                    type: "error",
                    confirmButtonColor: "#ff0000",
                    allowOutsideClick: !1,
                    showConfirmButton: !0
                })
            },
            timeout: 25e3
        })
    }
}

function login_token(a) {
    $("#loading-overlay").css("display", "block"), $.ajax({
        type: "POST",
        cache: !1,
        url: cbd,
        dataType: "json",
        data: "uax=" + uax + "&a=" + a,
        error: function () {
            $("#loading-overlay").css("display", "none"), swal({
                title: "Failed",
                text: "Please Verify Network",
                type: "error",
                confirmButtonColor: "#ff0000",
                allowOutsideClick: !1,
                showConfirmButton: !0
            })
        },
        statusCode: {
            500: function () {
                $("#loading-overlay").css("display", "none");
                swal({
                    title: "Failed",
                    text: "Login Gagal [500], Silahkan coba login atau koneksi kembali",
                    type: "error",
                    confirmButtonColor: "#ff0000",
                    allowOutsideClick: !1,
                    showConfirmButton: !0
                })
            },
            404: function () {
                $("#loading-overlay").css("display", "none");
                swal({
                    title: "Failed",
                    text: "Login Gagal [404], Silahkan coba login atau koneksi kembali",
                    type: "error",
                    confirmButtonColor: "#ff0000",
                    allowOutsideClick: !1,
                    showConfirmButton: !0
                })
            }
        },
        success: function (a) {
            1 == a.code ? $.ajax({
                type: "POST",
                cache: !1,
                url: urlx,
                dataType: "json",
                data: "username=" + a.username + "@spin2&password=" + a.password,
                error: function () {
                    $("#loading-overlay").css("display", "none"), swal({
                        title: "Failed",
                        text: "Please Verify Network",
                        type: "error",
                        confirmButtonColor: "#ff0000",
                        allowOutsideClick: !1,
                        showConfirmButton: !0
                    })
                },
                success: function (a) {
                    $("#loading-success").css("display", "block"), 1 == a.result ? setTimeout(function () {
                        location.href = lnd
                    }, 2500) : swal({
                        title: "Failed",
                        text: a.message,
                        type: "warning",
                        confirmButtonColor: "#ff0000",
                        allowOutsideClick: !1,
                        showConfirmButton: !0
                    })
                },
                timeout: 5e3
            }) : ($("#loading-overlay").css("display", "none"), swal({
                title: "Failed",
                text: a.msg,
                type: "warning",
                confirmButtonColor: "#ff0000",
                allowOutsideClick: !1,
                showConfirmButton: !0
            }))
        },
        timeout: 15e3
    })
}

function changeLanguage(a) {
    $("#loading-overlay").css("display", "block"), $.ajax({
        type: "POST",
        url: cldx,
        data: {
            bahasa: a
        },
        success: function (a) {
            setTimeout(function () {
                $("#loading-overlay").css("display", "none"), location.reload()
            }, 1e3)
        }
    })
}
$(document).ready(function (a) {
    $("#loginForm").submit(function (a) {
        $("#loading-overlay").css("display", "block");
        var o = $("#username_member").val(),
            e = $("#password_member").val();
        if ("" == o || "" == e || void 0 == o || void 0 == e) $("#loading-overlay").css("display", "none"), swal({
            title: "Failed",
            text: "Mohon isi username password terlebih dahulu",
            type: "error",
            confirmButtonColor: "#ff0000",
            allowOutsideClick: !1,
            showConfirmButton: !0
        });
        else {
            if ("violet" == o.split("@")[1] || "violet.unp" == o.split("@")[1]) return $.ajax({
                type: "POST",
                cache: !1,
                url: urlx,
                dataType: "json",
                data: "username=" + o + "&password=" + e,
                error: function () {
                    $("#loading-overlay").css("display", "none"), swal({
                        title: "Failed",
                        text: "Silahkan coba login atau koneksi kembali",
                        type: "error",
                        confirmButtonColor: "#ff0000",
                        allowOutsideClick: !1,
                        showConfirmButton: !0
                    })
                },
                statusCode: {
                    500: function () {
                        $("#loading-overlay").css("display", "none");
                        swal({
                            title: "Failed",
                            text: "Login Gagal [500], Silahkan coba login atau koneksi kembali",
                            type: "error",
                            confirmButtonColor: "#ff0000",
                            allowOutsideClick: !1,
                            showConfirmButton: !0
                        })
                    },
                    404: function () {
                        $("#loading-overlay").css("display", "none");
                        swal({
                            title: "Failed",
                            text: "Login Gagal [404], Silahkan coba login atau koneksi kembali",
                            type: "error",
                            confirmButtonColor: "#ff0000",
                            allowOutsideClick: !1,
                            showConfirmButton: !0
                        })
                    }
                },
                success: function (a) {
                    if (a.result == 1)
                    {
                        $("#loading-success").css("display", "block");
                        setTimeout(function () {
                            location.href = lnd
                        }, 2500);
                    }else
                    {
                        $("#loading-overlay").css("display", "none");
                        swal({
                            title: "Failed",
                            text: a.message,
                            type: "warning",
                            confirmButtonColor: "#ff0000",
                            allowOutsideClick: !1,
                            showConfirmButton: !0
                        })
                    }
                },
                timeout: 50e3
            }), !1;
            if ("gift" == o.split("@")[1] || "homewifi" == o.split("@")[1]) return $.ajax({
                type: "POST",
                cache: !1,
                url: urlx,
                dataType: "json",
                data: "username=" + o + "&password=" + e,
                error: function () {
                    $("#loading-overlay").css("display", "none"), swal({
                        title: "Failed",
                        text: "Silahkan coba login atau koneksi kembali",
                        type: "error",
                        confirmButtonColor: "#ff0000",
                        allowOutsideClick: !1,
                        showConfirmButton: !0
                    })
                },
                statusCode: {
                    500: function () {
                        $("#loading-overlay").css("display", "none");
                        swal({
                            title: "Failed",
                            text: "Login Gagal [500], Silahkan coba login atau koneksi kembali",
                            type: "error",
                            confirmButtonColor: "#ff0000",
                            allowOutsideClick: !1,
                            showConfirmButton: !0
                        })
                    },
                    404: function () {
                        $("#loading-overlay").css("display", "none");
                        swal({
                            title: "Failed",
                            text: "Login Gagal [404], Silahkan coba login atau koneksi kembali",
                            type: "error",
                            confirmButtonColor: "#ff0000",
                            allowOutsideClick: !1,
                            showConfirmButton: !0
                        })
                    }
                },
                success: function (a) {
                    if (a.result == 1)
                    {
                        $("#loading-success").css("display", "block");
                        setTimeout(function () {
                            location.href = lnd
                        }, 2500);
                    }else
                    {
                        $("#loading-overlay").css("display", "none");
                        swal({
                            title: "Failed",
                            text: a.message,
                            type: "warning",
                            confirmButtonColor: "#ff0000",
                            allowOutsideClick: !1,
                            showConfirmButton: !0
                        })
                    }
                },
                timeout: 50e3
            }), !1;
            $.ajax({
                type: "POST",
                url: scd,
                cache: !1,
                dataType: "json",
                error: function () {
                    $("#loading-overlay").css("display", "none"), swal({
                        title: "Failed",
                        text: "Silahkan coba login atau koneksi kembali",
                        type: "error",
                        confirmButtonColor: "#ff0000",
                        allowOutsideClick: !1,
                        showConfirmButton: !0
                    })
                },
                statusCode: {
                    500: function () {
                        $("#loading-overlay").css("display", "none");
                        swal({
                            title: "Failed",
                            text: "Login Gagal [500], Silahkan coba login atau koneksi kembali",
                            type: "error",
                            confirmButtonColor: "#ff0000",
                            allowOutsideClick: !1,
                            showConfirmButton: !0
                        })
                    },
                    404: function () {
                        $("#loading-overlay").css("display", "none");
                        swal({
                            title: "Failed",
                            text: "Login Gagal [404], Silahkan coba login atau koneksi kembali",
                            type: "error",
                            confirmButtonColor: "#ff0000",
                            allowOutsideClick: !1,
                            showConfirmButton: !0
                        })
                    }
                },
                data: $(this).serialize(),
                success: function (a) {
                    if (1 == a.code) {
                        if ("violet" == o.split("@")[1]) var t = o;
                        else t = o + a.realm;
                        var i = e;
                        $.ajax({
                            type: "POST",
                            cache: !1,
                            url: urlx,
                            dataType: "json",
                            data: "username=" + t + "&password=" + i,
                            error: function () {
                                $("#loading-overlay").css("display", "none"), swal({
                                    title: "Failed",
                                    text: "Silahkan coba login atau koneksi kembali",
                                    type: "error",
                                    confirmButtonColor: "#ff0000",
                                    allowOutsideClick: !1,
                                    showConfirmButton: !0
                                })
                            },
                            statusCode: {
                                500: function () {
                                    $("#loading-overlay").css("display", "none");
                                    swal({
                                        title: "Failed",
                                        text: "Login Gagal [500], Silahkan coba login atau koneksi kembali",
                                        type: "error",
                                        confirmButtonColor: "#ff0000",
                                        allowOutsideClick: !1,
                                        showConfirmButton: !0
                                    })
                                },
                                404: function () {
                                    $("#loading-overlay").css("display", "none");
                                    swal({
                                        title: "Failed",
                                        text: "Login Gagal [404], Silahkan coba login atau koneksi kembali",
                                        type: "error",
                                        confirmButtonColor: "#ff0000",
                                        allowOutsideClick: !1,
                                        showConfirmButton: !0
                                    })
                                }
                            },
                            success: function (a) {
                                if (a.result == 1) {
                                    $("#loading-success").css("display", "block");
                                    setTimeout(function () {
                                        location.href = lnd
                                    }, 2500);
                                } else {
                                    $("#loading-overlay").css("display", "none");
                                    swal({
                                        title: "Failed",
                                        text: a.message,
                                        type: "warning",
                                        confirmButtonColor: "#ff0000",
                                        allowOutsideClick: !1,
                                        showConfirmButton: !0
                                    })
                                }
                            },
                            timeout: 50e3
                        })
                    } else $("#loading-overlay").css("display", "none"), swal({
                        title: "Failed",
                        text: a.msg,
                        type: "warning",
                        confirmButtonColor: "#ff0000",
                        allowOutsideClick: !1,
                        showConfirmButton: !0
                    })
                },
                timeout: 50e3
            })
        }
        return !1
    })
}), $(function () {
    $("#chat-container-show").click(function (a) {
        a.preventDefault(), $(this).css("display", "none"), $("#chat-container").animate({
            bottom: 0
        }, 500, function () {})
    }), $("#chat-container-hide").click(function (a) {
        a.preventDefault(), $("#chat-container").animate({
            bottom: -580
        }, 500, function () {
            $("#chat-container-show").css("display", "block")
        })
    })
}), $(document).ready(function (a) {
    $("#ReloginSeamless").submit(function (a) {
        return $("#loading-overlay").css("display", "block"), $.ajax({
            type: "POST",
            url: "aktivasi-seamless",
            dataType: "json",
            data: $(this).serialize(),
            success: function (a) {
                if (3 == a.status) {
                    var o = $("#username").val(),
                        e = $("#password").val(),
                        t = $("#mac_client").val();
                    $.ajax({
                        type: "POST",
                        cache: !1,
                        url: urlx,
                        dataType: "json",
                        data: "username=" + o + "," + t + "@telkom.net&password=" + e,
                        error: function () {
                            $("#loading-overlay").css("display", "none"), swal({
                                title: "Failed",
                                text: "Silahkan coba login atau koneksi kembali",
                                type: "error",
                                confirmButtonColor: "#ff0000",
                                allowOutsideClick: !1,
                                showConfirmButton: !0
                            })
                        },
                        statusCode: {
                            500: function () {
                                $("#loading-overlay").css("display", "none");
                                swal({
                                    title: "Failed",
                                    text: "Login Gagal [500], Silahkan coba login atau koneksi kembali",
                                    type: "error",
                                    confirmButtonColor: "#ff0000",
                                    allowOutsideClick: !1,
                                    showConfirmButton: !0
                                })
                            },
                            404: function () {
                                $("#loading-overlay").css("display", "none");
                                swal({
                                    title: "Failed",
                                    text: "Login Gagal [404], Silahkan coba login atau koneksi kembali",
                                    type: "error",
                                    confirmButtonColor: "#ff0000",
                                    allowOutsideClick: !1,
                                    showConfirmButton: !0
                                })
                            }
                        },
                        success: function (a) {
                            $("#loading-overlay").css("display", "none"), 1 == a.result ? window.location = lnd : swal({
                                title: "Failed",
                                text: a.message,
                                type: "warning",
                                confirmButtonColor: "#ff0000",
                                allowOutsideClick: !1,
                                showConfirmButton: !0
                            })
                        },
                        timeout: 5e3
                    })
                } else $("#loading-overlay").css("display", "none"), swal({
                    title: "Failed",
                    text: a.message,
                    type: "warning",
                    confirmButtonColor: "#ff0000",
                    allowOutsideClick: !1,
                    showConfirmButton: !0
                })
            }
        }), !1
    })
});
