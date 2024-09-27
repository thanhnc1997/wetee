const template = document.body;

const app = {
	common() {},
	home() {
		const homePage = template.querySelector('.home-page');
		let count = 0;

		// age slider
		const ageSlider = homePage.querySelector('.about .age-slider');
		const ageProgress = homePage.querySelector('.about .progress');
		const ageProgressBar = ageProgress.querySelector('.progress-bar');
		const prev = homePage.querySelector('.about .prev');
		const next = homePage.querySelector('.about .next');
		const width = 33.33;

		function changeAge(i) {
			ageSlider.querySelector('figure').style.cssText = `background-image: url(images/common/${i}_year.png)`;
			ageProgressBar.style.cssText = `width: ${width * count}%`;
		}
		
		next.addEventListener('click', () => {
			if (count >= 3) return false;
			count ++;
			changeAge(count);
		});
		
		prev.addEventListener('click', () => {
			if (count <= 0) {
				ageProgressBar.style.cssText = `width: 18%`;
				return false;
			}
			count --;
			changeAge(count);
		});
	}
}

app.home();