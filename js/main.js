const template = document.body;

const app = {
	common: {
		navTab() {
			let navItemList = template.querySelectorAll('.tab-item');
			navItemList.forEach(item => {
				item.addEventListener('click', () => {
					let tabParent = item.parentElement.parentElement;
					let tabContentId = item.getAttribute('data-tab');
					tabParent.querySelector('.tab-item.active').classList.remove('active');
					tabParent.querySelector('.tab-pane.active').classList.remove('active');
					template.querySelector(tabContentId).classList.add('active');
					item.classList.add('active');
				});
			});
		}
	},
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
			ageProgressBar.style.cssText = `width: ${width * count}%`;
			if (i <= 0) ageProgressBar.style.cssText = `width: 18%`;
			if (i >= 3) ageProgressBar.style.cssText = `width: 100%`;
			ageSlider.querySelector('figure').style.cssText = `background-image: url(images/common/${i}_year.png)`;
		}
		
		next.addEventListener('click', () => {
			if (count >= 3) return false;
			count ++;
			changeAge(count);
		});
		
		prev.addEventListener('click', () => {
			if (count <= 0) return false;
			count --;
			changeAge(count);
		});
		
		// stories slider
		let glide = new Glide('#stories', {
			type: 'carousel',
			perView: 4,
			focusAt: 'center',
			gap: 20,
			breakpoints: {
				1024: {
					perView: 4
				},
				667: {
					perView: 2
				},
				480: {
					perView: 2
				}
			}
		});
		
		glide.mount();
	}
}

app.home();
app.common.navTab();