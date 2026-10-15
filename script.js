
const FORMSPREE_URL =
    "https://formspree.io/f/mjygpwvo";


/* =========================================
   VARIABLES
========================================= */

let noCount = 0;

let yesSize = 18;

let selectedDate = "";

let selectedPlace = "";


/* =========================================
   GET ELEMENTS
========================================= */

const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");

const noMessage =
    document.getElementById("noMessage");

const dateInput =
    document.getElementById("dateInput");

const dateBtn =
    document.getElementById("dateBtn");

const optionButtons =
    document.querySelectorAll(".option");

const confirmBtn =
    document.getElementById("confirmBtn");


/* =========================================
   DATE RESTRICTION
========================================= */

/*
   Only TOMORROW and future dates
   are allowed.

   Example:
   If today is 15 October,
   earliest selectable date = 16 October.
*/

const tomorrow =
    new Date();

tomorrow.setDate(
    tomorrow.getDate() + 1
);

const minimumDate =
    tomorrow
        .toISOString()
        .split("T")[0];

dateInput.min =
    minimumDate;


/* =========================================
   NO BUTTON MESSAGES
========================================= */

const messages = [

    "Are you sure? 🥺",

    "Really sure? 😭",

    "Think again 👉👈",

    "Pleaseee? 🥹",

    "I'll be sad... 💔",

    "You're breaking my heart 😭",

    "One small hangout? 🥺",

    "Okay this is getting personal now 😭",

    "Please reconsider 😔",

    "Last chance... 👀",

    "You really want to say no? 😭",

    "The YES button is looking pretty good though 👀"

];


/* =========================================
   YES BUTTON
========================================= */

yesBtn.addEventListener(
    "click",
    function () {

        createHeartExplosion();

        setTimeout(
            function () {

                showScreen("screen2");

            },
            400
        );

    }
);


/* =========================================
   NO BUTTON
========================================= */

noBtn.addEventListener(
    "click",
    function () {

        noCount++;


        /*
           Increase YES button size
        */

        yesSize += 3;


        yesBtn.style.fontSize =
            yesSize + "px";


        yesBtn.style.padding =
            (15 + noCount * 2) +
            "px " +
            (30 + noCount * 3) +
            "px";


        /*
           Make NO smaller
        */

        const noScale =
            Math.max(
                0.55,
                1 - noCount * 0.05
            );


        noBtn.style.transform =
            `scale(${noScale})`;


        /*
           Change message
        */

        noMessage.innerText =
            messages[
                Math.min(
                    noCount - 1,
                    messages.length - 1
                )
            ];


        /*
           After many NOs
        */

        if (noCount >= 12) {

            noBtn.style.opacity =
                "0.25";


            noMessage.innerText =
                "Okay okay... I think you know the correct answer now 😭❤️";

        }

    }
);


/* =========================================
   DATE BUTTON
========================================= */

dateBtn.addEventListener(
    "click",
    function () {

        /*
           No date selected
        */

        if (!dateInput.value) {

            alert(
                "You have to choose a date first 🥺"
            );

            return;

        }


        /*
           Extra protection against
           manually entering an old date
        */

        if (
            dateInput.value <
            minimumDate
        ) {

            alert(
                "Please choose a future date 🥺"
            );

            dateInput.value = "";

            return;

        }


        selectedDate =
            dateInput.value;


        showScreen("screen3");

    }
);


/* =========================================
   HANGOUT OPTIONS
========================================= */

optionButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                selectedPlace =
                    button.dataset.place;


                /*
                   Show selected date
                */

                document.getElementById(
                    "finalDate"
                ).innerText =
                    formatDate(
                        selectedDate
                    );


                /*
                   Show selected place
                */

                document.getElementById(
                    "finalPlace"
                ).innerText =
                    selectedPlace;


                createHeartExplosion();


                setTimeout(
                    function () {

                        showScreen("screen4");

                    },
                    400
                );

            }
        );

    }
);


/* =========================================
   FINAL CONFIRM BUTTON
========================================= */

confirmBtn.addEventListener(
    "click",
    async function () {

        const message =
            document.getElementById(
                "submitMessage"
            );


        /*
           Check Formspree URL
        */

        if (
            FORMSPREE_URL ===
            "YOUR_FORMSPREE_URL_HERE"
        ) {

            message.innerText =
                "It's officially fixed! 💗🥹";

            createHeartExplosion();

            return;

        }


        message.innerText =
            "Sending... 💌";


        /*
           Create form data
        */

        const formData =
            new FormData();


        formData.append(
            "date",
            formatDate(selectedDate)
        );


        formData.append(
            "hangout",
            selectedPlace
        );


        formData.append(
            "message",
            "She accepted the hangout invitation! 💗"
        );


        try {

            const response =
                await fetch(
                    FORMSPREE_URL,
                    {

                        method: "POST",

                        body: formData,

                        headers: {

                            "Accept":
                                "application/json"

                        }

                    }
                );


            if (response.ok) {

                message.innerText =
                    "It's officially fixed! 💗🥹";

                createHeartExplosion();

            }

            else {

                message.innerText =
                    "Something went wrong 😭 Please try again.";

            }


        }

        catch (error) {

            console.error(error);

            message.innerText =
                "Couldn't send the response 😭";

        }

    }
);


/* =========================================
   SCREEN SWITCH
========================================= */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(
            ".screen"
        );


    screens.forEach(
        function (screen) {

            screen.classList.remove(
                "active"
            );

        }
    );


    document
        .getElementById(screenId)
        .classList.add("active");

}


/* =========================================
   DATE FORMAT
========================================= */

function formatDate(date) {

    const d =
        new Date(
            date + "T00:00:00"
        );


    return d.toLocaleDateString(
        "en-IN",
        {

            weekday: "long",

            day: "numeric",

            month: "long",

            year: "numeric"

        }
    );

}


/* =========================================
   FLOATING HEART
========================================= */

function createHeart() {

    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "heart";


    const hearts = [

        "❤️",

        "💗",

        "💕",

        "💖",

        "💓",

        "💘"

    ];


    heart.innerText =
        hearts[
            Math.floor(
                Math.random() *
                hearts.length
            )
        ];


    heart.style.left =
        Math.random() * 100 +
        "vw";


    heart.style.fontSize =
        (15 + Math.random() * 20) +
        "px";


    heart.style.animationDuration =
        (5 + Math.random() * 5) +
        "s";


    document
        .getElementById(
            "hearts-container"
        )
        .appendChild(
            heart
        );


    setTimeout(
        function () {

            heart.remove();

        },
        10000
    );

}


/* =========================================
   CONTINUOUS HEARTS
========================================= */

setInterval(
    createHeart,
    700
);


/* =========================================
   HEART EXPLOSION
========================================= */

function createHeartExplosion() {

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        setTimeout(
            function () {

                const heart =
                    document.createElement(
                        "div"
                    );


                heart.className =
                    "heart";


                heart.innerText =
                    "❤️";


                heart.style.left =
                    (
                        40 +
                        Math.random() * 20
                    ) + "vw";


                heart.style.bottom =
                    "45%";


                heart.style.fontSize =
                    (
                        18 +
                        Math.random() * 25
                    ) + "px";


                heart.style.animationDuration =
                    (
                        2 +
                        Math.random() * 2
                    ) + "s";


                document
                    .getElementById(
                        "hearts-container"
                    )
                    .appendChild(
                        heart
                    );


                setTimeout(
                    function () {

                        heart.remove();

                    },
                    4000
                );


            },
            i * 40
        );

    }

}

