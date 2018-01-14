var counter = (function(divID) {
	const ONE_SECOND = 1000;
	const ELEMENT = document.getElementById(divID);

	var time = {"interval": null,"hrs": 0,"min": 0,"sec": 0,"day": 0,"year": 0,"started": false};

	function handleClick() {
		(time.started) ? stop() : start()
	}

	function start() {
		if (time.started === false) {
			time.started = true
			time.interval = setInterval(tick, ONE_SECOND)
		}
	}

	function stop() {
		if (time.started === true) {
			time.started = false
			clearInterval(time.interval)
		}
	}

	function tick() {
		incSeconds()
		displayTime()
	}

	function incSeconds() {
		if (++time.sec > 59) {
			time.sec = 0
			incMinutes()
		}
	}

	function incMinutes() {
		if (++time.min > 59) {
			time.min = 0
			incHours()
		}
	}

	function incHours() {
		if (++time.hrs > 59) {
			time.hrs = 0
			incDays()
		}
	}

	function incDays() {
		if (++time.day > 365) {
			time.day = 0
			incYears()
		}
	}

	function incYears() {
		time.year++
	}

	function getPrettyTime() {
		const sec = time.sec;
		const min = time.min;
		const hrs = time.hrs;
		var tmpSec, tmpMin, tmpHrs, result;

		if (time.day > 0) {
			tmpSec = (sec < 10) ? `0${sec}` : sec
			tmpMin = (min < 10) ? `0${min}` : min
			tmpHrs = (hrs < 10) ? `0${hrs}` : hrs
			result = `${time.day} : ${tmpHrs} : ${tmpMin} : ${tmpSec}`
		} else if (hrs > 0) {
			tmpSec = (sec < 10) ? `0${sec}` : sec
			tmpMin = (min < 10) ? `0${min}` : min
			result = `${tmpHrs} : ${tmpMin} : ${tmpSec}`
		} else if (min > 0) {
			tmpSec = (sec < 10) ? `0${sec}` : sec
			result = `${min} : ${tmpSec}`
		} else {
			result = sec
		}

		return result;
	}

	function displayTime() {
		if (!ELEMENT) { 
			console.error("missing DOM hook")
			stop()
			counter = null
			return;
		}

		ELEMENT.innerHTML = getPrettyTime()
	}

	return {
		handleClick: handleClick
	}
})('timer');
