const timeHtml = document.querySelector("#time");

const dateFinish = "2023-03-16T23:00:00";

function parseDate(str) {
    const parseStr = new Date(str);
    const op = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };

    return parseStr.toLocaleDateString("es-co", op);
}

function parseTime(time) {
    return time.toString().padStart(2, "0");
}

const getTime = (deadline) => {
    const selectDate = new Date(deadline).getTime();
    const now = new Date().getTime();
    const distance = selectDate - now;

    const days = parseTime(Math.floor(distance / (1000 * 60 * 60 * 24)));
    const hours = parseTime(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const minutes = parseTime(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    );
    const seconds = parseTime(Math.floor((distance % (1000 * 60)) / 1000));

    return {
        distance,
        days,
        hours,
        minutes,
        seconds,
    };
};

const crono = setInterval(() => {
    const { days, distance, hours, minutes, seconds } = getTime(dateFinish);

    timeHtml.innerHTML = `
        <h5>${parseDate(dateFinish)}</h5>
        <div class="box_time">
            <div class="time">
                <span class="label_number">${days}</span>
                <span class="label_title">D</span>
            </div>
            <div class="time">
                <span class="label_number">${hours}</span>
                <span class="label_title">H</span>
            </div>
            <div class="time">
                <span class="label_number">${minutes} </span>
                <span class="label_title">M</span>
            </div>
            <div class="time">
                <span class="label_number">${seconds}</span>
                <span class="label_title">S</span>
            </div>
        </div>
        <p>Tiempo restante para entregar los proyectos</p>
    `;

    if (distance < 0) {
        clearInterval(crono);

        timeHtml.innerHTML = `
            <div>
                <h2>Se acabo el tiempo... a llorar xd JAJJAJA</h2>
                <h2 class="hover">Mentiras, si viste esto, tomale SS y escribeme al interno</h2>
                <div class="box_img">
                    <img src="./images/23.jpg" alt="llorando">
                </div>
            </div>
        `;
    }
}, 1000);
