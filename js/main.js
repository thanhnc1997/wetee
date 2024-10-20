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
		},
		load() {
			this.intro();
			this.menu();
			this.navTab();
		}
	},
	pages: {
		home() {
			const homePage = template.querySelector('.home-page');
			if (!homePage) return false;
			let count = 1;

			// age slider
			let ageSlider = homePage.querySelector('.about .age-slider');
			let ageProgress = homePage.querySelector('.about .progress');
			let ageProgressBar = ageProgress.querySelector('.progress-bar');
			let prev = homePage.querySelector('.about .prev');
			let next = homePage.querySelector('.about .next');
			let width = 33.33;

			function changeAge(i) {
				ageProgressBar.style.cssText = `width: ${width * count}%`;
				if (i <= 1) ageProgressBar.style.cssText = `width: 33.33%`;
				if (i >= 3) ageProgressBar.style.cssText = `width: 100%`;
				ageSlider.querySelector('figure').style.cssText = `background-image: url(images/common/${i}_year.gif)`;
			}

			next.addEventListener('click', () => {
				if (count >= 3) return false;
				count ++;
				changeAge(count);
			});

			prev.addEventListener('click', () => {
				if (count <= 1) return false;
				count --;
				changeAge(count);
			});

			// stories slider
			let sliderOption = {
				type: 'carousel',
				gap: 20,
				perView: 1,
				peek: {
					before: 80,
					after: 80
				}
			}

			function updateWhenResize() {
				if (window.innerWidth >= 768) {
					sliderOption.perView = 2;
					sliderOption.peek = {
						before: 150,
						after: 150
					}
				}

				if (window.innerWidth >= 1280) {
					sliderOption.perView = 3;
					sliderOption.peek = {
						before: 150,
						after: 150
					}
				}

				if (window.innerWidth >= 1800) {
					sliderOption.perView = 5;
					sliderOption.peek = {
						before: 150,
						after: 150
					}
				}
			}
			updateWhenResize();

			let glide = new Glide('#stories', sliderOption);
			glide.mount();
			window.addEventListener('resize', () => {
				updateWhenResize();
				setTimeout(() => {
					glide.update(sliderOption);
				}, 400);
			});

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
		},
		allCategories() {
			const allCaegoriesPage = template.querySelector('.all-categories-page');
			if (!allCaegoriesPage) return false;

			let sliderOption = {
				type: 'carousel',
				gap: 20,
				perView: 1,
				peek: {
					before: 80,
					after: 80
				}
			}

			function updateWhenResize() {
				if (window.innerWidth >= 768) {
					sliderOption.perView = 3;
					sliderOption.peek = {
						before: 0,
						after: 0
					}
				}
			}
			updateWhenResize();
			let glide_1 = new Glide('#cate_1', sliderOption);
			let glide_2 = new Glide('#cate_2', sliderOption);
			let glide_3 = new Glide('#cate_3', sliderOption);
			glide_1.mount();
			glide_2.mount();
			glide_3.mount();

			window.addEventListener('resize', () => {
				updateWhenResize();
				setTimeout(() => {
					glide_1.update(sliderOption);
					glide_2.update(sliderOption);
					glide_3.update(sliderOption);
				}, 400);
			});
		},
		productDetail() {
			const productDetailPage = template.querySelector('.product-detail-page');
			if (!productDetailPage) return false;

			let sliderOption = {
				type: 'carousel',
				gap: 20,
				perView: 1,
				peek: {
					before: 80,
					after: 80
				}
			}

			function updateWhenResize() {
				if (window.innerWidth >= 768) {
					sliderOption.perView = 3;
					sliderOption.peek = {
						before: 0,
						after: 0
					}
				}
			}
			updateWhenResize();
			let glide = new Glide('#cate_1', sliderOption);
			glide.mount();

			window.addEventListener('resize', () => {
				updateWhenResize();
				setTimeout(() => {
					glide.update(sliderOption);
				}, 400);
			});
		},
		checkOutPage () {
			const checkOutPage = template.querySelector('.checkout-page');
			if (!checkOutPage) return false;
			let citySelection = checkOutPage.querySelector('select[name="city"]');
			let districtSelection = checkOutPage.querySelector('select[name="district"]');
			let wardSelection = checkOutPage.querySelector('select[name="ward"]');
		},
		load() {
			this.home();
			this.allCategories();
			this.productDetail();
			this.checkOutPage();
		}
	},
	init() {
		this.common.load();
		this.pages.load();
	}
}

app.init();