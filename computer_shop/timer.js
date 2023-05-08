document.addEventListener('DOMContentLoaded', () => {
	//конечная дата
	const deadline = new Date(2022, 09, 30)
	//id таймера 
	let timerId = null

	//функция отвечающая за склонение числительных
	function getWords(num, words){
		return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
	}

	function countDownTimer(){
		const diff = deadline - new Date()
		if(diff <= 0) clearInterval(timerId)

		const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0
		const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0
		const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0
		const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0

		$days.innerText = days + " " + getWords(days, ['день', 'дня', 'дней']);
		$hours.innerText = hours + " " + getWords(hours, ['час', 'часа', 'часов']);
		$minutes.innerText = minutes + " " + getWords(minutes, ['минута', 'минуты', 'минут']);
		$seconds.innerText = seconds + " " + getWords(seconds, ['секунда', 'секунды', 'секунд']);
	}

	const $days = document.querySelector("#timer-days");
	const $hours = document.querySelector("#timer-hours");
	const $minutes = document.querySelector("#timer-minutes");
	const $seconds = document.querySelector("#timer-seconds");

	countDownTimer()
	timerId = setInterval(countDownTimer, 1000);

	let moveWinTimer = document.querySelector(".moveWinTimer");
	let btnCloseTimer = document.getElementById("btnCloseTimer");
	let timerIdTimer = setTimeout(() => {
		moveWinTimer.classList.toggle("invs");
		clearTimeout(timerIdTimer);
	}, 2500);

	btnCloseTimer.addEventListener("click", () => {
		moveWinTimer.classList.toggle('invs');
	})
})
