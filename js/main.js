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
		},
		menu() {
			let pageHeader = template.querySelector('.header');
			let navTrigger = pageHeader.querySelector('.nav-trigger');
			let mainNav = pageHeader.querySelector('nav');
			
			navTrigger.addEventListener('click', () => {
				navTrigger.classList.toggle('trigger');
				mainNav.classList.toggle('active');
				template.classList.toggle('overflow-hidden');
			});
		}
	},
	home() {
		const homePage = template.querySelector('.home-page');
		let count = 0;

		// age slider
		let ageSlider = homePage.querySelector('.about .age-slider');
		let ageProgress = homePage.querySelector('.about .progress');
		let ageProgressBar = ageProgress.querySelector('.progress-bar');
		let prev = homePage.querySelector('.about .prev');
		let next = homePage.querySelector('.about .next');
		let width = 33.33;

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
					perView: 2,
					gap: 16
				},
				480: {
					perView: 1,
					gap: 16,
					peek: {
						before: 50,
						after: 50
					},
				}
			}
		});
		
		glide.mount();
	}
}

app.home();
app.common.navTab();
app.common.menu();