var currentView = "wifiidLogin";
$(document).ready(function () {
    if ($("body").hasClass("login-page")) loginPage();
    promoCarousel()
});

function loadingStateEvent() {
    $("a").click(function (e) {
        if (($(this).attr("href") && $(this).attr("href") !== "#") || $(this).data("target")) {
            $("body").addClass("loading")
        }
    })
}

function loginPage() {
    var target = location.hash.replace("#", "");
    if (target != "") navigation(target);
    loginNavigationEvent()
}

function loginNavigationEvent() {
    $(".login-options").find("a").click(function (e) {
        e.preventDefault();
        var target = $(this).data("target");
        navigation(target)
    });
    $(".back-btn").click(function (e) {
        e.preventDefault();
        var target = $(this).data("target");
        navigation(target)
    })
}

function navigation(target) {
    if (currentView != target) {
        $("#" + currentView).addClass("hidden");
        $("#" + target).removeClass("hidden");
        if (target == "wifiidLogin") {
            $(".back-btn").addClass("hidden")
        } else {
            $(".back-btn").removeClass("hidden")
        }
        currentView = target;
        $("body").removeClass("loading")
    }
}

function promoCarousel() {
    var currentItem = $(".promo-item:not(:hidden)").data("promo-item");
    var totalPromo = $(".promo-item").length;
    toggleCarouselItem(currentItem);
    $(".promo-navigation").on("click", function (e) {
        e.preventDefault();
        var target = $(this).data("promo-target");
        var targetItem = currentItem + target;
        if (targetItem > 0 && targetItem <= totalPromo) {
            $(".promo-item[data-promo-item=" + currentItem + "]").addClass("hidden");
            $(".promo-item[data-promo-item=" + targetItem + "]").removeClass("hidden");
            currentItem = targetItem;
            toggleCarouselItem(currentItem)
        }
    })
}

function toggleCarouselItem(currentItem) {
    var totalPromo = $(".promo-item").length;
    if (currentItem == 1) {
        $(".promo-navigation:first-of-type").addClass("hidden");
        $(".promo-navigation:last-of-type").removeClass("hidden")
    } else if (currentItem == totalPromo) {
        $(".promo-navigation:first-of-type").removeClass("hidden");
        $(".promo-navigation:last-of-type").addClass("hidden")
    } else {
        $(".promo-navigation").removeClass("hidden")
    }
}

