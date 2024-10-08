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
		},
		intro() {
			let intro = template.querySelector('.intro');
			if (!intro) return false;
			let width = 20;
			let count = 1;
			
			function loading() {
				count ++;
				intro.querySelector('.bar').style.cssText = `width: ${width * count}%`;
				if (width * count >= 100) {
					clearInterval(loadingInterval);
					setTimeout(() => {intro.remove()}, 250);
				}
			}
			
			let loadingInterval = setInterval(() => {loading()}, 500);
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
			gap: 20,
			breakpoints: {
				4000: {
					perView: 5,
					before: 150,
					after: 150
				},
				1440: {
					perView: 3,
					peek: {
						before: 150,
						after: 150
					},
				},
				1366: {
					perView: 3,
					peek: {
						before: 100,
						after: 100
					},
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
		
		// product detail
		let products = homePage.querySelectorAll('.products .product');
		products.forEach(product => {
			product.addEventListener('click', (e) => {
				let productDetail = product.querySelector('.product-detail');
				if (productDetail.classList.contains('active')) {
					productDetail.classList.remove('active');
				}
				else {
					if (homePage.querySelector('.products .product .product-detail.active')) {
						homePage.querySelector('.products .product .product-detail.active').classList.remove('active');
					}
					productDetail.classList.add('active');
				}
			});
		}); 
	}
}

app.home();
app.common.navTab();
app.common.menu();
app.common.intro();